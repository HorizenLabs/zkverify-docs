---
title: Groth16 Verifier
---

## [`settlementGroth16Pallet`](https://github.com/HorizenLabs/NH-core/tree/main/pallets/settlement-groth16)

The `submitProof` extrinsic can be used to verify Groth16 proofs.

## [Parameters](#parameters)
- The *zk-proof*:
    ```
    proof: {
        a: Vec<u8>,                 // G1 point
        b: Vec<u8>,                 // G2 point
        c: Vec<u8>,                 // G1 point
    }
    ```
- Th *verification key*:
    ```
    vk: {
        curve: Enum,                // "Bn254" - "Bls12_381"
        alphaG1: Vec<u8>,           // G1 point
        betaG2: Vec<u8>,            // G2 point
        gammaG2: Vec<u8>,           // G2 point
        deltaG2: Vec<u8>,           // G2 point
        gammaAbcG1: Vec<Vec<u8>>,   // G1 points
    }
    ```
- The *public inputs*:
    ```
    input: Vec<Vec<u8>>             // Scalars
    ```

The pallet leverages the arkworks [`ark-groth16`](https://github.com/arkworks-rs/groth16/tree/v0.4.0) library for proof verification.
The notation and serialization of the fields which make up the proof and verification keys also closely mirror the ones of that library.
Therefore, if your proofs and verification keys are generated using `ark-groth16`, integrating with this pallet should be straightforward.
Instead, if your proofs and verification keys are generated using `snarkJS`, the [`snarkjs2zkv`](https://github.com/HorizenLabs/snarkjs2zkv) cli utility is available for performing the conversion.
If your proofs and verification keys are generated with other tools, the following section describes in detail the encoding of the various arguments.

## [Encodings](#encodings)

The *zk-proof*, *verification key*, and *public inputs* are composed of cryptographic primitives, namely *elliptic curve points* (belonging to either *G1* or *G2*) and *scalars*.
- Elliptic curve points are represented in an uncompressed form, as the concatenation of the encoding of the *x* and *y* affine coordinates.
  * An element of the base field of the BN254 curve can be represented with 32 bytes, therefore the affine representation of a BN254 G1 point requires 2 * 32 = 64 bytes.
    Instead, since G2 is an extension field of degree 2, the affine representation of a BN254 G2 point requires double the space, namely 128 bytes.
  * An element of the base field of the BLS12-381 curve can be represented with 48 bytes. Therefore, the encoding of a BLS12-381 G1 point requires 2 * 48 = 96 bytes,
    and the encoding of a BLS12-381 G2 point requires 2 * 96 = 192 bytes.
  The x and y coordinates of the G1 and G2 points are encoded in little-endian format for BN254 curve, and in big-endian format for BLS12-381 curve. This is coherent with arkworks implementation.
- Scalars are little-endian encoded. The scalar field of both the BN254 and BLS12-381 curves can be represented with 32 bytes.

The following table summarizes the size of the encodings:

|          | BN254     | BLS12-381 |
|----------|-----------|-----------|
| G1 point | 64 bytes  | 96 bytes  |
| G2 point | 128 bytes | 192 bytes |
| Scalar   | 32 bytes  | 32 bytes  |
