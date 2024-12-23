---
title: Proof Submitter Flow
---

## Proof Submitter flow

The flow will be the following:

1. A proof submitter (rollup / zkApp) submits the proof via the [`submitProof`](../02-mainchain/05-mainchain_api.md#submitproof) extrinsic of the appropriate verification pallet. The proof leaf `value` will be:

    ```rust
        leaf_digest = keccak256(keccak256(verifier_ctx), hash(vk), keccak256(public_inputs_bytes))
    ```

    Every verifier should define its `verifier_ctx` (a unique byte sequence), how to hash the verification key and how to extract a byte sequence from public inputs. Then, to produce the `leaf_digest` that we can also call *statement*, we apply the previous formula.
2. If the proof is valid a [`<VerifierPallet>::ProofVerified`](../02-mainchain/05-mainchain_api.md#proofverified) event that contains the statement value is emitted; otherwise the transaction emit an error.
3. The failing transaction will be included in the block anyway, and the user will pay fees for it. This is due to prevent DoS attacks.

Now two different kinds of aggregation mechanism are provided, and they work in parallel:

1. Domain separated and incentivized permission-less aggregation
2. **(Deprecated)** time driven global aggregation

### Domain Separated Aggregation

First perform the follow checks:

1. If no domain's identifier provided do nothing
2. If the pointed domain exists but cannot accept a new proof emit a [`CannotAggregate`](../02-mainchain/05-mainchain_api.md#cannotaggregate) event
3. If the submitter user has not enough funds to pay his own aggregation cost quote emit again [`CannotAggregate`](../02-mainchain/05-mainchain_api.md#cannotaggregate) event

If all these checks pass then:

1. Hold from submitter's wallet his aggregation cost quote
2. Emit [`Aggregate::NewProof`](../02-mainchain/05-mainchain_api.md#newproof) event, containing the digest of the proof `statement`, the domain's identifier `domainId` and the aggregation's identifier in which the proof will be included `aggregationId`.
3. If the current aggregation is complete emits [`Aggregate::AggregationComplete`](../02-mainchain/05-mainchain_api.md#aggregationcomplete) event

### **(Deprecated)** Global Aggregation

1. A [`Poe::NewElement`](../02-mainchain/05-mainchain_api.md#newelement) event is emitted, containing the digest of the proof `value` and the id of the attestation in which the proof will be included `attestation_id`.
2. When a predefined policy is met, a Merkle tree for the `attestation_id` is generated and a [`Poe::NewAttestation`](../02-mainchain/05-mainchain_api.md#newattestation) event is emitted with `id` and `attestation` fields.
3. The Proof Submitter can retrieve the Merkle Path of the submitted proof via the [`poe_proofPath`](../02-mainchain/05-mainchain_api.md#poe_proofpath) extrinsic of the PoE pallet, supplying the `attestation_id` and a digest of the proof `proof_hash`

## Pallets

Some pallets have been developed to accommodate the requirements:

- ***Verifiers*** where each one defines the proof, verification key and public inputs types, implements the verification logic and defines how to compute the 3 hashes that compose the final statement hash that represent the proof leaf `value`:
  - [**fflonk**](../07-verification_pallets/01-fflonk.md)
  - [**zksync**](../07-verification_pallets/02-zksync_era.md)
  - [**risc0**](../07-verification_pallets/03-risc0.md)
  - [**groth16**](../07-verification_pallets/04-groth16.md)
- **proof_of_existence:** The attestation pallet that defines the logic to generate new attestations and the corresponding events once that the conditions of a given policy are met.
- **proof_of_existence_rpc:** Defines the interface and the logic of the `proofPath` RPC call.
