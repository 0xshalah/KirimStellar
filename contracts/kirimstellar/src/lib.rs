#![no_std]
//! KirimStellar — remittance escrow for Soroban.
//!
//! Flow: a sender locks a token amount for a recipient with a timelock.
//! - `create_intent`  — sender locks funds into the contract.
//! - `execute_intent` — recipient claims the funds (before expiry).
//! - `refund_intent`  — funds return to the sender (after expiry).
//!
//! Non-custodial: the contract only ever moves funds to the recipient (on claim)
//! or back to the sender (on refund). No admin can touch locked funds.

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env,
};

// Persistent-entry TTL: ~30 days of ledgers (5s close time => 17280/day).
const INTENT_BUMP_AMOUNT: u32 = 518_400;
const INTENT_LIFETIME_THRESHOLD: u32 = 500_000;

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    IntentCounter,
    Intent(u64),
}

#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum IntentStatus {
    Pending = 0,
    Executed = 1,
    Refunded = 2,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Intent {
    pub id: u64,
    pub sender: Address,
    pub recipient: Address,
    pub asset: Address,
    pub amount: i128,
    pub expiration: u64,
    pub status: IntentStatus,
}

#[contracterror]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    IntentNotFound = 1,
    IntentNotPending = 2,
    IntentExpired = 3,
    IntentNotExpired = 4,
    InvalidAmount = 5,
    InvalidExpiration = 6,
}

#[contract]
pub struct KirimStellarContract;

#[contractimpl]
impl KirimStellarContract {
    /// Lock `amount` of `asset` from `sender` into escrow for `recipient`,
    /// claimable until `expiration` (unix seconds). Returns the intent id.
    pub fn create_intent(
        env: Env,
        sender: Address,
        recipient: Address,
        asset: Address,
        amount: i128,
        expiration: u64,
    ) -> Result<u64, Error> {
        sender.require_auth();

        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }
        if expiration <= env.ledger().timestamp() {
            return Err(Error::InvalidExpiration);
        }

        // Move funds from the sender into the contract's custody.
        let token_client = token::Client::new(&env, &asset);
        token_client.transfer(&sender, &env.current_contract_address(), &amount);

        let mut counter: u64 = env
            .storage()
            .instance()
            .get(&DataKey::IntentCounter)
            .unwrap_or(0);
        counter += 1;

        let intent = Intent {
            id: counter,
            sender: sender.clone(),
            recipient: recipient.clone(),
            asset,
            amount,
            expiration,
            status: IntentStatus::Pending,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Intent(counter), &intent);
        env.storage().persistent().extend_ttl(
            &DataKey::Intent(counter),
            INTENT_LIFETIME_THRESHOLD,
            INTENT_BUMP_AMOUNT,
        );
        env.storage()
            .instance()
            .set(&DataKey::IntentCounter, &counter);

        env.events()
            .publish((symbol_short!("create"), sender, recipient), (counter, amount));

        Ok(counter)
    }

    /// Read an intent by id.
    pub fn get_intent(env: Env, intent_id: u64) -> Result<Intent, Error> {
        env.storage()
            .persistent()
            .get(&DataKey::Intent(intent_id))
            .ok_or(Error::IntentNotFound)
    }

    /// Recipient claims a pending intent (before expiry), receiving the funds.
    pub fn execute_intent(env: Env, intent_id: u64) -> Result<(), Error> {
        let mut intent: Intent = env
            .storage()
            .persistent()
            .get(&DataKey::Intent(intent_id))
            .ok_or(Error::IntentNotFound)?;

        if intent.status != IntentStatus::Pending {
            return Err(Error::IntentNotPending);
        }
        if env.ledger().timestamp() > intent.expiration {
            return Err(Error::IntentExpired);
        }

        // Only the recipient can claim.
        intent.recipient.require_auth();

        let token_client = token::Client::new(&env, &intent.asset);
        token_client.transfer(
            &env.current_contract_address(),
            &intent.recipient,
            &intent.amount,
        );

        intent.status = IntentStatus::Executed;
        env.storage()
            .persistent()
            .set(&DataKey::Intent(intent_id), &intent);

        env.events()
            .publish((symbol_short!("execute"), intent.recipient.clone()), intent_id);

        Ok(())
    }

    /// Sender reclaims funds from an expired, unclaimed intent.
    pub fn refund_intent(env: Env, intent_id: u64) -> Result<(), Error> {
        let mut intent: Intent = env
            .storage()
            .persistent()
            .get(&DataKey::Intent(intent_id))
            .ok_or(Error::IntentNotFound)?;

        if intent.status != IntentStatus::Pending {
            return Err(Error::IntentNotPending);
        }
        if env.ledger().timestamp() <= intent.expiration {
            return Err(Error::IntentNotExpired);
        }

        // Only the original sender can trigger the refund.
        intent.sender.require_auth();

        let token_client = token::Client::new(&env, &intent.asset);
        token_client.transfer(
            &env.current_contract_address(),
            &intent.sender,
            &intent.amount,
        );

        intent.status = IntentStatus::Refunded;
        env.storage()
            .persistent()
            .set(&DataKey::Intent(intent_id), &intent);

        env.events()
            .publish((symbol_short!("refund"), intent.sender.clone()), intent_id);

        Ok(())
    }
}

mod test;
