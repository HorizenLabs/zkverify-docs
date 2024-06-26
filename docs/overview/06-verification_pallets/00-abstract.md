---
title: Abstract Verifier
---

## [`Abstract Verifier`](https://github.com/HorizenLabs/NH-core/tree/main/pallets/verifiers)

The generic verifier abstraction that define the extrisics, events and errors for all verifier. It also
implements the logic to generate the statements hash. Every verifier should implement the
`hp_verifiers::Verifier` trait:

- `Proof`: The proof data
- `Vk`: The verification key data
- `Pubs`: The public inputs data.
- `fn verify_proof()` the main verifier logic.
- `fn hash_context_data()` the unique context that identify the verifier (i.e. `b"fflonk"`)
- `fn pubs_bytes()` how to get the bytes from public inputs that will be hashed by `keccak256` in the final statement
- `fn validate_vk()` the extrinsic input type are encodable types and often is not possible to enforce type validity,
so you must provide how to check if the key is valid or not (default implementation accept all verification key as valid).
- `fn vk_bytes()` how to get the bytes from verification key that will be hashed with `Self::vk_hash()` function (default
use scale encoded data).
- `fn vk_hash()` how to hash the verification key, this is useful to bypass the standard mechanism when the verification key is
already a hash: instead of take the bytes and hash them you can just forward the vk (default implementation use `keccak256` of
`Self::vk_bytes()`).

### Submit Proof

The [`submitProof`](https://github.com/HorizenLabs/NH-core/tree/main/pallets/verifiers/src/lib.rs#L213)
extrinsic get the verification key from the storage (if need it) and use `verify_proof()` implementation to check the proof.

### Register Verification Key

If you choose to use the hash of verification key instead of the key itself, you need to register it before by use
[`registerVk`](https://github.com/HorizenLabs/NH-core/tree/main/pallets/verifiers/src/lib.rs#L241). This
extrinsic saves the verification key in storage and emits a `VkRegistered(hash)` event with the hash that can be 
used in `submitProof` call.
