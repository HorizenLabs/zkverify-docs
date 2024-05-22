---
slug: /
---
# What is zkVerify

## zkVerify Defined

zkVerify is a blockchain designed to provide zero knowledge proof verifications for any project or dApp using zero knowledge proofs. A high performance, public, decentralized, reliable, and secure blockchain, zkVerify has dedicated proof verification methods written in Rust, and available to be used in a modular and composable way.

## Goals of zkVerify

zkVerify is focused on the proof verification aspect of zero knowledge proofs. zk-proofs are used to verify computations without disclosing the underlying data, and can be used to summarize transactions, for selective disclosure of identity information, and other specific applications like secret ballot voting and hidden cards in games. 

There are two essential elements of a complete zero knowledge proof. One is the computation which creates the proof, the other is the verification of the proof. Both are needed to verify the computation. Many organizations are working diligently to create better, faster, and more compact proofs, and each of these new zk-proof computations needs proof verifiers available in a reliable and accessible place.

The zkVerify blockchain will accept proofs, verify them, then store both the proof and the verification in the blockchain for future availability

## Motivation
### Prohibitive Costs

From a macro cost perspective, the proof verification market is estimated to incur $100+ million in security expenses alone for zkRollups in 2024, extending to $1.5 billion by 2028 when including ZK applications.

On a more granular level, the verification of a single ZK proof on Ethereum can consume upwards of 200,000 to 300,000 gas units, depending on the proof type. Beyond nominal fees today, the variability of future fees inhibits product adoption. Offloading proof verification from L1s, such as Ethereum, serves to both drastically lower nominal costs, but also to stabilize costs over time in a way that segregates fees from gas volatility.

For instance, in times of network congestion, gas prices have reached over 100 Gwei, which means that verifying a single proof could cost between $20 to $60 or even more.

### Hampering Innovation
Ethereum Improvement Proposals (EIPs) are design documents that outline new features, standards, or processes for the Ethereum blockchain, serving as a primary mechanism for proposing changes to the network. Two EIPs (EIP-196 and EIP-197) significantly impacted the development of rollups and zkVMs (zero-knowledge virtual machines) by providing essential cryptographic building blocks to perform ZK proof verification on the Ethereum blockchain.

The choice to standardize around the BN254 curve, while practical at the time of implementation, means that operations involving other elliptic curves are not directly supported and are prohibitively expensive to execute. This lack of support restricts the variety of cryptographic techniques that can be efficiently employed on the platform, limiting innovation as cryptographic standards evolve.

In general, progressing EIPs forward can be challenging due to the rigorous process involved, its need for widespread consensus via the DAO, and the lack of effective prioritization amongst multiple competing priorities with different stakeholders.
