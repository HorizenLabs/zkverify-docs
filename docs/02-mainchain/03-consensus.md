---
title: Consensus
---

# zkVerify Mainchain Consensus

## Block Authoring
Currently we have implemented [AURA](https://docs.substrate.io/reference/glossary/#authority-round-aura) as the block authoring algorithm, while leveraging the Staking pallet.

BABE (Blind Assignment for Blockchain Extension) will be implemented shortly.  It provides slot-based block authoring with a known set of validators and is typically used in proof-of-stake blockchains. Slot assignment is based on the evaluation of a Verifiable Random Function (VRF). Each validator is assigned a weight for an epoch. This epoch is broken up into slots and the validator evaluates its VRF at each slot. For each slot that the validator's VRF output is below its weight, it is allowed to author a block.


| Parameter | Value | Description |
| --- | --- | --- |
| Slot Duration | 6 seconds (Default)  | Time period for which a block can be produced. |
| Epoch | 600 slots | The number of slots in an epoch. An epoch is a period of time where the block producer set is the same. |


## Block Finalization
[GRANDPA](https://paritytech.github.io/polkadot-sdk/master/sc_consensus_grandpa/index.html) (GHOST-based Recursive ANcestor Deriving Prefix Agreement) is a block finalization algorithm designed to work alongside block production mechanisms such as BABE.

On a high level, the GRANDPA algorithm follows these steps:

 - **Block Production:** Blocks are produced by a separate mechanism (e.g., BABE) and are broadcast to the network. These blocks are considered tentative until finalized by GRANDPA.


- **Voting on Blocks:** Validators participate in rounds of voting to decide on the block that should be finalized. Each validator casts a vote for a block that it believes can be finalized, which implicitly includes votes for all ancestors of that block on the blockchain.


- **GHOST Rule:** GRANDPA uses a variation of the Greedy Heaviest Observed Sub-Tree (GHOST) rule to select the block that has the majority of votes from validators. The GHOST rule helps in selecting the block that is on the heaviest (most weighted) chain, which indicates the chain with the most cumulative support from validators. In this case, the support/weight is the validator’s staked amount.


- **Two-Phase Voting:** GRANDPA's voting process consists of two phases - the "prevote" and "precommit":

    * **Prevote:** Validators vote for the block they consider should be finalized. This vote is based on the blocks they've seen and their current view of the chain.

    * **Precommit:** Validators precommit to a block if it is the descendant of the highest block they've seen justified in the prevote phase. A block is justified when more than 2/3 of the validators have prevoted for it, either directly or for a descendant of it.


- Finalization: Once more than 2/3 of validators have precommitted to a block (directly or for an ancestor of it), that block is considered finalized. This means that the block and all its ancestors are agreed upon to never be reverted.

| Parameter | Value | Description |
| --- | --- | --- |
| Session | 600 slots |A period that has a constant set of validators. Validators can only join or exit the validator set at a session change. |
| Era | 6 sessions | At the end of any era, there is the election of the next validators and the payout of the rewards. |
