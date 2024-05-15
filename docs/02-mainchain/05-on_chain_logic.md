---
title: On-chain Logic
---

# zkVerify Mainchain On-chain Logic

## User flow
The flow will be the following:

1. A user (rollup / zkApp) submits the proof via our API.
2. If the proof is valid, it is relayed by the consensus and eventually included in a Mainchain block; otherwise the transaction reverts with an error.
3. The failing transaction will be included in the block anyway, and the user will pay fees for it. This is to prevent DoS attacks.
4. When the block in which the proof was posted is finalized,  a `ProofVerified` event is emitted, containing a `proof_leaf` and an `attestation_id` value.
5. When a predefined policy is met, a Merkle tree for the `attestation_id` is generated and a new Attestation event emitted with `id` and `root` fields.


Currently we use just a single type of verifier (fflonk) with a predetermined verification key. The `proof_leaf` will be:

```
keccak256(“fflonk”, public_inputs)
```

## Pallets
Three pallets have been developed in the runtime to accommodate the requirements:


- **settlement-fflonk:** Contains the definition of the `submitProof` transaction and the logic to parse public inputs and verify the proof, invoking our `fflonk-verifier` crate. Once a proof is verified, it’s inserted into the merkle tree whose attestation is next to be published.


- **proof_of_existence:** Defines the logic to generate new attestations and the corresponding events once that the conditions of a given policy are met.


- **proof_of_existence_rpc:** Defines the interface and the logic of the `proofPath` RPC call.
