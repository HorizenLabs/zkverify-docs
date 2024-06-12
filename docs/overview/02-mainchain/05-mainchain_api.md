---
title: zkVerify Mainchain API
---

# zkVerify Mainchain API

Mainchain nodes expose some APIs to provide information about the chain status and endpoints to send commands (e.g. to create a new transaction).

APIs follow the Substrate typical format, and for this reason, they are categorized using the following categories:

- **[Runtime](#runtime)**
- **[JSON-RPC](#json-rpc)**
- **[Constants](#constants)**
- **[Storage](#storage)**
- **[Extrinsics](#extrinsics)**
- **[Events](#events)**
- **[Errors](#errors)**

## [Runtime](#runtime)

Some calls are available to interact directly with the Mainchain runtime.
All the standard calls are available in the [official documentation](https://polkadot.js.org/docs/substrate/runtime).
Availability of these calls may vary depending on the Mainchain runtime configuration and pallet integration.

## [JSON-RPC](#json-rpc)

RPC methods can be used to query the Mainchain node for information or to submit commands.
All the standard calls are available in the [official documentation](https://polkadot.js.org/docs/substrate/rpc).
Mainchain nodes currently expose only a subset of the Substrate RPC methods, in particular, the ones from the following pallets:

- *author*
- *chain*
- *childstate*
- *offchain*
- *payment*
- *rpc*
- *state*
- *system*

In addition to these, nodes expose the following custom commands:

### poe

#### [poe_proofPath](#poe_proofpath)

Given the hash of a proof and the id of the attestation in which it is included, returns the path of the proof in the Merkle tree.
In case the proof is not found, an error is returned.

**Parameters**

`attestation_id: u64`

`proof_hash: H256`

**Returns**

`
MerkleProof
`

## [Constants](#constants)

All the standard constants are available in the [official documentation](https://polkadot.js.org/docs/substrate/constants).
Mainchain nodes currently use only a subset of the Substrate constants, in particular, the ones from the following pallets:

- *balances*
- *grandpa*
- *imOnline*
- *staking*
- *system*
- *timestamp*
- *transactionPayment*

## [Storage](#storage)

The node's storage can be queried to retrieve information about the current chain state.
Some endpoints may return also historical data (e.g. the list of validators at a specific block), but availability depends on the specific query and the configuration of the node (e.g. standard vs archive node).
Standard methods are available in the [official documentation](https://polkadot.js.org/docs/substrate/storage).
Mainchain nodes currently use only a subset of these methods, in particular, the ones from the following pallets:

- *authorship*
- *babe*
- *balances*
- *grandpa*
- *imOnline*
- *offences*
- *session*
- *staking*
- *substrate*
- *sudo*
- *system*
- *timestamp*
- *transactionPayment*

In addition to them, the following custom methods are available:

### poe

#### [firstInsertionTime](#firstinsertiontime)

Returns the timestamp of the first insertion of a proof into the Merkle tree of the latest attestation.

**Returns**

`
Option<u64>
`

#### [nextAttestation](#nextattestation)

Returns the ID of the next attestation.

**Returns**

`
u64
`

#### [palletVersion](#palletversion)

Returns the software version of the pallet.

**Returns**

`
u16
`

#### [values](#values)

Queries the storage looking for the proofs included in the Merkle tree of an attestation.
The return value depends on the presence of the optional parameter `proof_hash`:

- If the parameter is not provided, the method returns the list of all the proofs included in the Merkle tree of the requested attestation (if any)
- If the parameter is provided, the method returns `null` if the proof is found in the attestation, `None` otherwise

**Parameters**

`attestation_id: u64`

`proof_hash: Option<H256>`

**Returns**

`
Option<null>
`

## [Extrinsics](#extrinsics)

Mainchain nodes support some of the most common extrinsics provided by Substrate (see the [official documentation](https://polkadot.js.org/docs/substrate/extrinsics)).
The pallet currently included in the runtime are:

- *balances*
- *grandpa*
- *imOnline*
- *session*
- *staking*
- *sudo*
- *system*
- *timestamp*

In addition to them, the following custom extrinsics are available:

### poe

#### [publishAttestation](#publishattestation)

Creates an extrinsic to trigger the finalization of an attestation containing the proofs submitted in the current window.
If no proof is currently available, the attestation is empty but still published.

### settlementFFlonkPallet

#### [submitProof](#submitprooffflonk)

Creates an extrinsic for the submission of an FFLONK proof to be verified and eventually included in the next attestation (if valid).
The extrinsic fails in case of invalid proof and it's not included in the attestation.

**Parameters**

`rawProof: [u8;800]` The byte array representing the proof to be submitted including the public inputs (last 32 bytes).

### settlementZksyncPallet

#### [submitProof](#submitproofzksync)

Creates an extrinsic for the submission of a ZK Sync proof to be verified and eventually included in the next attestation (if valid).
The extrinsic fails in case of invalid proof and it's not included in the attestation.

**Parameters**

`rawProof: [u8;1440]` The byte array representing the proof to be submitted including the public inputs (last 32 bytes).

### settlementRisc0Pallet

#### [submitProof](#submitproofrisc0)

Creates an extrinsic for the submission of a Risc0 proof to be verified and eventually included in the next attestation (if valid).
The extrinsic fails in case of invalid proof and it's not included in the attestation.

**Parameters**

`vk: [u8; 32]` The byte array representing the verification key (also known as image id in Risc0 terminology),

`proof: Vec<u8>` The byte vector representing the proof to be submitted (also known as inner receipt in Risc0 terminology),

`pubs: Vec<u8>` The byte vector representing the public inputs (also known as journal in Risc0 terminology).

## [Events](#events)

The Mainchain leverages the standard Events provided by Substrate (see the [official documentation](https://polkadot.js.org/docs/substrate/events)).
In addition to them, the following custom events are available:

### poe

#### [NewElement](#newelement)

Emitted when a new ZK proof is submitted, successfully verified, and included in the Merkle tree for the currently pending attestation.

**Returns**

`value: H256` The hash of the proof that has been included in the Merkle tree (i.e. the value of the leaf of the tree)

`attestationId: u64` The ID of the attestation in which the proof has been included

#### [NewAttestation](#newattestation)

Emitted when a new attestation is finalized and published. It may contain 0 or more proofs.

**Returns**

`id: u64`  The ID of the attestation that has been finalized

`attestation: H256`  The root of the Merkle tree of the attestation

## [Errors](#errors)

The Mainchain nodes throw the standard errors provided by Substrate (see the [official documentation](https://polkadot.js.org/docs/substrate/errors)).

In addition to them, the following custom errors have been defined:

### poe

#### [TooEarlyForASmallTree](#tooearlyforasmalltree)

Error thrown when a validator submits a block containing an attestation with too few proofs in the Merkle tree (the minimum and maximum number are configured in the runtime).

Note: the "sudo" account can override this behavior and submit an attestation whose size is lower than the minimum threshold.

### settlementFFlonkPallet and settlementZkSyncPallet and settlementRisc0Pallet

#### [InvalidInput or InvalidPublicInputs](#invalidinput-or-invalidpublicinputs)

Error thrown when the submitted public inputs are invalid (i.e. it was not possible to deserialize the raw bytes).

#### [InvalidProofData or InvalidProof](#invalidproofdata-or-invalidproof)

Error thrown when the submitted proof is invalid (i.e. it was not possible to deserialize the raw bytes).

#### [VerifyError](#verifyerror)

Error thrown when the submitted proof is processed but the verification fails.

#### [InvalidPublicInputsSize](#invalidpublicinputssize)

Error thrown when the submitted public inputs are too big ()`settlementRisc0Pallet` only).

#### [InvalidProofSize](#invalidproofsize)

Error thrown when the submitted proof is too big (`settlementRisc0Pallet` only).
