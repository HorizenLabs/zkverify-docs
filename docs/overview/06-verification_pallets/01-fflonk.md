---
title: Fflonk Verifier
---

## [`settlementFflonkPallet`](https://github.com/HorizenLabs/NH-core/tree/main/pallets/settlement-fflonk)

The [`submitProof`](https://github.com/HorizenLabs/NH-core/tree/main/pallets/settlement-fflonk/src/lib.rs#L108)
extrinsic of the checks if the given proof is a Polygon-CDK Fork-Id 6 valid proof. The input proof format
is 800 bytes array where the last 32 bytes are the public inputs: the pallet use
[`fflonk_verifier` crate](https://github.com/HorizenLabs/fflonk_verifier/tree/v0.3.0) to deserialize
the proof and public inputs and then verify them. If we put error handling aside we can sketch the pallet duty
with the following code snipped

```rust
let proof = Proof::try_from(&proof_data).unwrap();
let pubs = pubs_data.into();

proof.verify(pubs).unwrap()
```

If the proof is correct a `Poe::NewElement(statement, attestation_id)` event is emitted where `statement`
is computed by using `fflonk` as `verifier-id`.

This call can fail both if is not possible to deserialize the proof (`InvalidProofData`) or if the proof doesn't
verify (`VerifyError`)
