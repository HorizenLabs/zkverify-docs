---
title: zkVerify Mainchain On-chain Logic
---

## User flow

The flow will be the following:

1. A user (rollup / zkApp) submits the proof via our API.
2. If the proof is valid, it is relayed by the consensus and eventually included in a Mainchain block; otherwise the transaction reverts with an error.
3. The failing transaction will be included in the block anyway, and the user will pay fees for it. This is to prevent DoS attacks.
4. When the block in which the proof was posted is finalized, a `Poe::NewElement` event is emitted, containing a `value` and an `attestation_id` value.
5. When a predefined policy is met, a Merkle tree for the `attestation_id` is generated and a `Poe::NewAttestation` event emitted with `id` and `attestation` fields.

Currently we use just two types of verifier (fflonk as zksync boojum verifier) with predetermined verification keys. The proof leaf `value` will be:

```
keccak256(“<verifier>-”, public_inputs)
```

where `verifier` is one of `fflonk` and `zksync`.

## Pallets

Some pallets have been developed to accommodate the requirements:

- [**settlement-fflonk:**](../08-verification_pallets.md#fflonk-verifier-settlementfflonkpallet) Contains the definition of the `submitProof` transaction and the logic to parse public inputs and verify the proof. Once a proof is verified, it’s forwarded to attestation pallet.

- [**settlement-zksync:**](../08-verification_pallets.md#fflonk-zksync-settlementzksyncpallet) Contains the definition of the `submitProof` transaction and the logic to parse public inputs and verify the proof. Once a proof is verified, it’s forwarded to attestation pallet.

- **proof_of_existence:** The attestation pallet that defines the logic to generate new attestations and the corresponding events once that the conditions of a given policy are met.

- **proof_of_existence_rpc:** Defines the interface and the logic of the `proofPath` RPC call.
