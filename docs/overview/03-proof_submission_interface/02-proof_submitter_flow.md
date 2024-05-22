---
title: Proof Submitter Flow
---

## Proof Submitter flow

The flow will be the following:

1. A proof submitter (rollup / zkApp) submits the proof via the [`submitProof`](../02-mainchain/05-mainchain_api.md#submitprooffflonk) extrinsic of the appropriate verification pallet.

    Currently we use just two types of verifier (fflonk and zksync era verifier) with predetermined verification keys. The proof leaf `value` will be:

    ```
    keccak256(“<verifier>-”, public_inputs)
    ```

    where `verifier` is one of `fflonk` and `zksync`.

2. If the proof is valid, it is relayed by the consensus and eventually included in a Mainchain block; otherwise the transaction reverts with an error.
3. The failing transaction will be included in the block anyway, and the user will pay fees for it. This is to prevent DoS attacks.
4. When the block in which the proof was posted is finalized, a [`Poe::NewElement`](../02-mainchain/05-mainchain_api.md#newelement) event is emitted, containing the digest of the proof `value` and the id of the attestation in which the proof will be included `attestation_id`.
5. When a predefined policy is met, a Merkle tree for the `attestation_id` is generated and a [`Poe::NewAttestation`](../02-mainchain/05-mainchain_api.md#newattestation) event is emitted with `id` and `attestation` fields.

6. The Proof Submitter can retrieve the Merkle Path of the submitted proof via the [`poe_proofPath`](../02-mainchain/05-mainchain_api.md#poe_proofpath) extrinsic of the PoE pallet, supplying the `attestation_id` and a digest of the proof `proof_hash`

## Pallets

Some pallets have been developed to accommodate the requirements:

- [**settlement-fflonk:**](../06-verification_pallets/01-fflonk.md) Contains the definition of the `submitProof` transaction and the logic to parse public inputs and verify the proof. Once a proof is verified, it’s forwarded to attestation pallet.

- [**settlement-zksync:**](../06-verification_pallets/02-zksync_era.md) Contains the definition of the `submitProof` transaction and the logic to parse public inputs and verify the proof. Once a proof is verified, it’s forwarded to attestation pallet.

- **proof_of_existence:** The attestation pallet that defines the logic to generate new attestations and the corresponding events once that the conditions of a given policy are met.

- **proof_of_existence_rpc:** Defines the interface and the logic of the `proofPath` RPC call.
