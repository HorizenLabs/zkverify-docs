---
title: risc0 Verifier
---

## [`settlementRisc0Pallet`](https://github.com/HorizenLabs/NH-core/tree/main/pallets/settlement-risc0)

The [`submitProof`](https://github.com/HorizenLabs/NH-core/tree/main/pallets/settlement-risc0/src/lib.rs#L107)
extrinsic can be used to verify risc0 proofs; these are zk-STARKs demonstrating that some code has executed correctly, generating the associated computation output. The code is attested through an image id (named verification key in the verification process) and runs inside the risc0-zkVM that provides the proof of execution through a receipt (containing the raw proof and the public inputs for the verification process). The format for those components is:

- Verification key: a bytes array of length 32; the conversion from a risc0 `image_id` (an integer array of length 8) must be little-endian.
- Proof: a bytes vector; this is the result of `bincode::serialize` applied to a risc0 `InnerReceipt`.
- Public inputs: a bytes vector; this is the result of `bincode::serialize` applied to a risc0 `Journal`.

The pallet uses [`risc0-verifier` crate](https://github.com/HorizenLabs/risc0-verifier/tree/v0.1.0) to deserialize the proof and public inputs and then verify them. If we put error handling aside we can summarize the pallet duty with the following code snipped

```rust
let vk = vk_data.into();
let proof = <Vec<u8>>::try_from(hex::decode(proof).unwrap()).unwrap();
let pubs = <Vec<u8>>::try_from(hex::decode(pubs).unwrap()).unwrap();

assert!(verify(vk, &proof, &pubs).is_ok());
```

If the proof is correct a `Poe::NewElement(statement, attestation_id)` event is emitted where `statement`
is computed by using `risc0` as `verifier-id`.

This call can fail both if it's not possible deserialize the proof or public inputs (`InvalidProof`,
`InvalidPublicInputs`), if the size of the proof or public inputs is excessive (`InvalidProofSize`, `InvalidPublicInputsSize`) or if the proof doesn't verify (`VerifyError`).
