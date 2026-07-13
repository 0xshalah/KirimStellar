#![cfg(test)]
use super::*;
use soroban_sdk::{
    testutils::{Address as _, Ledger as _},
    token, Address, Env,
};

const DAY: u64 = 86_400;
const START: u64 = 1_000_000;

struct Fixture<'a> {
    env: Env,
    client: KirimStellarContractClient<'a>,
    token: token::Client<'a>,
    asset: Address,
    sender: Address,
    recipient: Address,
}

fn setup<'a>() -> Fixture<'a> {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().set_timestamp(START);

    let admin = Address::generate(&env);
    let sender = Address::generate(&env);
    let recipient = Address::generate(&env);

    let sac = env.register_stellar_asset_contract_v2(admin.clone());
    let asset = sac.address();
    let asset_admin = token::StellarAssetClient::new(&env, &asset);
    let token = token::Client::new(&env, &asset);
    asset_admin.mint(&sender, &1_000);

    let contract_id = env.register(KirimStellarContract, ());
    let client = KirimStellarContractClient::new(&env, &contract_id);

    Fixture { env, client, token, asset, sender, recipient }
}

#[test]
fn create_locks_funds_in_escrow() {
    let f = setup();
    let id = f.client.create_intent(
        &f.sender,
        &f.recipient,
        &f.asset,
        &200,
        &(START + 7 * DAY),
    );

    assert_eq!(id, 1);
    assert_eq!(f.token.balance(&f.sender), 800);
    assert_eq!(f.token.balance(&f.client.address), 200);

    let intent = f.client.get_intent(&id);
    assert_eq!(intent.status, IntentStatus::Pending);
    assert_eq!(intent.amount, 200);
    assert_eq!(intent.recipient, f.recipient);
}

#[test]
fn recipient_can_claim_before_expiry() {
    let f = setup();
    let id = f.client.create_intent(&f.sender, &f.recipient, &f.asset, &200, &(START + 7 * DAY));

    f.client.execute_intent(&id);

    assert_eq!(f.token.balance(&f.recipient), 200);
    assert_eq!(f.token.balance(&f.client.address), 0);
    assert_eq!(f.client.get_intent(&id).status, IntentStatus::Executed);
}

#[test]
fn sender_can_refund_after_expiry() {
    let f = setup();
    let exp = START + 100;
    let id = f.client.create_intent(&f.sender, &f.recipient, &f.asset, &200, &exp);

    f.env.ledger().set_timestamp(exp + 1);
    f.client.refund_intent(&id);

    assert_eq!(f.token.balance(&f.sender), 1_000);
    assert_eq!(f.token.balance(&f.client.address), 0);
    assert_eq!(f.client.get_intent(&id).status, IntentStatus::Refunded);
}

#[test]
fn claim_after_expiry_fails() {
    let f = setup();
    let exp = START + 100;
    let id = f.client.create_intent(&f.sender, &f.recipient, &f.asset, &200, &exp);

    f.env.ledger().set_timestamp(exp + 1);
    let res = f.client.try_execute_intent(&id);
    assert_eq!(res, Err(Ok(Error::IntentExpired)));
}

#[test]
fn refund_before_expiry_fails() {
    let f = setup();
    let id = f.client.create_intent(&f.sender, &f.recipient, &f.asset, &200, &(START + 7 * DAY));

    let res = f.client.try_refund_intent(&id);
    assert_eq!(res, Err(Ok(Error::IntentNotExpired)));
}

#[test]
fn double_claim_fails() {
    let f = setup();
    let id = f.client.create_intent(&f.sender, &f.recipient, &f.asset, &200, &(START + 7 * DAY));

    f.client.execute_intent(&id);
    let res = f.client.try_execute_intent(&id);
    assert_eq!(res, Err(Ok(Error::IntentNotPending)));
}

#[test]
fn zero_amount_rejected() {
    let f = setup();
    let res = f.client.try_create_intent(&f.sender, &f.recipient, &f.asset, &0, &(START + 7 * DAY));
    assert_eq!(res, Err(Ok(Error::InvalidAmount)));
}

#[test]
fn past_expiration_rejected() {
    let f = setup();
    let res = f.client.try_create_intent(&f.sender, &f.recipient, &f.asset, &200, &(START - 1));
    assert_eq!(res, Err(Ok(Error::InvalidExpiration)));
}

#[test]
fn missing_intent_fails() {
    let f = setup();
    let res = f.client.try_get_intent(&999);
    assert_eq!(res, Err(Ok(Error::IntentNotFound)));
}
