---
title: Overview
---

# Overview

Zkverify provide a set of verifier pallets that expose `submitProof` extrinsic call
to verify the given proofs and store the proof statement.

Every time that a valid proof is verified the `Zkverify` emit an **event** that identify the
submitted statement and the `id` that can be used to check proof availability on the
destination chain (i.e. Ethereum). All verified statements are uniquely identified by the
hash computed as follows

```text
hash := Keccak256('<verifier-id>-'<public-input>)
```

where:

* `verifier-id` is a unique identifier string for what statement we should prove
* `public-input` are the public input bytes of the proved statement
