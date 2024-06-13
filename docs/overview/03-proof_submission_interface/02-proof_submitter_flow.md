---
title: Proof Submitter Flow
---

## Proof Submitter flow

The flow will be the following:

1. A proof submitter (rollup / zkApp) submits the proof via the [`submitProof`](../02-mainchain/05-mainchain_api.md#submitprooffflonk) extrinsic of the appropriate verification pallet.

    Currently we use four types of verifier (fflonk, zksync-era, risc0, and Groth16 verifier). The proof leaf `value` will be:
    - fflonk:
        ```
        keccak256(“fflonk-”, keccak256(ScaleEncode(vk)), "-", public_inputs)
        ```
    - zksync-era:
        ```
        keccak256("zksync-", public_inputs)
        ```
    - risc0:
        ```
        keccak256("risc0-", vk, "-", public_inputs)
        ```
    - Groth16:
        ```
        keccak256(keccak256("groth16"), keccak256(ScaleEncode(vk)), keccak256(ScaleEncode(public_inputs)))
        ```

    As it can be seen, at the moment the verifiers use different conventions for defining the proof leaf value, but work is currently ongoing to harmonize them.

2. If the proof is valid, it is relayed by the consensus and eventually included in a Mainchain block; otherwise the transaction reverts with an error.
3. The failing transaction will be included in the block anyway, and the user will pay fees for it. This is to prevent DoS attacks.
4. When the block in which the proof was posted is finalized, a [`Poe::NewElement`](../02-mainchain/05-mainchain_api.md#newelement) event is emitted, containing the digest of the proof `value` and the id of the attestation in which the proof will be included `attestation_id`.
5. When a predefined policy is met, a Merkle tree for the `attestation_id` is generated and a [`Poe::NewAttestation`](../02-mainchain/05-mainchain_api.md#newattestation) event is emitted with `id` and `attestation` fields.

6. The Proof Submitter can retrieve the Merkle Path of the submitted proof via the [`poe_proofPath`](../02-mainchain/05-mainchain_api.md#poe_proofpath) extrinsic of the PoE pallet, supplying the `attestation_id` and a digest of the proof `proof_hash`

## Pallets

Some pallets have been developed to accommodate the requirements:

- [**settlement-fflonk:**](../06-verification_pallets/01-fflonk.md) Contains the definition of the `submitProof` transaction and the logic to parse public inputs and verify the proof. Once a proof is verified, it’s forwarded to attestation pallet.

- [**settlement-zksync:**](../06-verification_pallets/02-zksync_era.md) Contains the definition of the `submitProof` transaction and the logic to parse public inputs and verify the proof. Once a proof is verified, it’s forwarded to attestation pallet.

- [**settlement-risc0:**](../06-verification_pallets/03-risc0.md) Contains the definition of the `submitProof` transaction and the logic to parse public inputs and verify the proof. Once a proof is verified, it’s forwarded to attestation pallet.

- [**settlement-groth16:**](../06-verification_pallets/04-groth16.md) Contains the definition of the `submitProof` transaction and the logic to parse public inputs and verify the proof. Once a proof is verified, it’s forwarded to attestation pallet.

- **proof_of_existence:** The attestation pallet that defines the logic to generate new attestations and the corresponding events once that the conditions of a given policy are met.

- **proof_of_existence_rpc:** Defines the interface and the logic of the `proofPath` RPC call.
