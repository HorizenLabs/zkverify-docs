---
title: risc0 Verifier
---

## [`settlementRisc0Pallet`](https://github.com/HorizenLabs/NH-core/tree/main/verifiers/risc0)

### Statement hash components

- context: `keccak256(b"risc0")`
- vk: `vk`
- pubs: `keccak256(pubs)`

### `Verifier` implementation

That's a zk-STARK proof verifier where the proof proves that some code has executed correctly and generate the associated computation output.
The code is attested through an image id (named verification key in the verification process) and runs inside the risc0-zkVM that provides
the proof of execution through a receipt which contains the raw proof and the public inputs (journal in risc0 lingo) for the verification process.

- `verify_proof()` uses [`risc0-verifier` crate](https://github.com/HorizenLabs/risc0-verifier/tree/v0.1.0) to deserialize
the proof and public inputs and then verify them against the given verification key.
- Define the following types:

    ```rust
    pub type Proof = Vec<u8>;
    pub type Pubs = Vec<u8>;
    pub type Vk = H256;
    ```

    The format for those components are:
      - `Proof`: The risc0's `InnerProof` serialized by `bincode::serialize`.
      - `Pubs` Public inputs: The risc0's `Journal` serialized by `bincode::serialize`.
      - `Vk` Verification key: a bytes array of length 32; the conversion from a risc0 `image_id` (an integer array of length 8) must be big-endian.
- hash context data is `b"risc0"`
- the pubs bytes are the input ones
- `vk_hash()` just forward the given verification key and `vk_bytes()` should never be called: in this case we cannot know the verification key preimage.

#### Note

In this pallet doesn't have any sense register the verification key before
to use it in `submitProof` exstrinsic because the hash and the key are the same.

### Result

The pallet uses [`risc0-verifier` crate](https://github.com/HorizenLabs/risc0-verifier/tree/v0.1.0) to deserialize the proof and public inputs and then verify them. The pallet's duties are summarized in the following code snippet:

```rust
assert!(risc0_verifier::verify(vk, &proof, &pubs).is_ok());
```

The `submitProof` exstrinsic can fail both if it's not possible to deserialize the proof or public inputs (`InvalidProofData`,
`InvalidInput`) or if the proof doesn't verify (`VerifyError`).
