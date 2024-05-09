---
title: Proof Submission Interface RPC
---

# Proof Submission Interface Methods
Below are the details about the API interface exposed by the Mainchain node to Proof Submitters.  

## SettlementFflonkPallet
- **Type:** non-blocking
- **Description:** submit the proof and return the transaction hash if it is valid, error otherwise.
```
Signature: submitProof(proof, public_inputs) -> Result<tx_hash, Error>
```

In case of success, the proof is included in the mempool, relayed, and eventually included in a proposed block and then finalized.


## RPC Commands
- **Endpoint:** PoE (Proof of Existence)
- **Description:** get the Merkle path of the proof within the provided attestation, returning Error if the attestation_id’s Attestation event isn’t published yet.
```
Signature: proofPath(attestation_id, proof_leaf) -> Result<merkle_path, Error> Type: non-blocking
```

Currently these APIs are “embedded” into the PolygonCDK core code and not available the end user.
