---
title: Overview
---

## Runtime Inclusion

Now that you have "palletized" your library, you have a package compatible with Substrate nodes that can be potentially integrated in any Substrate-based chain. In order to actually make it available in zkVerify, you need to include it in its runtime.

Keep in mind in this way you are generating a new runtime, whose deployment on the live chain (wheter it being testnet or mainnet) depends on the submission of a specific extrinsic, namely `system.setCode`; hence until that chain upgrade occurs, users will be able to use your verifier just for development and testing purposes on a local chain, not on any live chain.

It's now time to move on and get your hands on the code.
