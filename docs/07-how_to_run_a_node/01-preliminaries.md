---
title: Preliminaries
---

## Node Types

When setting up a **zkVerify** node, the first decision you need to make is which type of node to run. While there are various options, three main types of node can be identified:

- **RPC node:**
  - connects to the other nodes and interacts with them by sending and receiving blockchain data,
  - can maintain either a full or partial copy of the blockchain, depending on your requirements,
  - use cases for RPC node vary widely; for instance, they can serve as local entry point for the user to interact with the blockchain.
- **Boot node (or seeder node):**
  - provides connectivity to existing nodes, making it easier for new nodes to join the network,
  - holds minimal blockchain data,
  - requires private keys for signing peer-to-peer (p2p) messages and uniquely identifying the node within the network (peer-id),
  - ideal for a user who wants to contribute an entry point to the network, thereby enhancing decentralization.
- **Validator node:**
  - actively participates in consensus, authoring new blocks and selecting the best chain,
  - maintains a complete copy of the blockchain,
  - requires specific private keys for the Babe and Grandpa consensus algorithms,
  - should be run in a high-security and high-availability environment, due to its critical role,
  - suitable for users who are prepared to run a validator, supporting the chain and earning new tokens through staking.

*Not sure which option to choose?* If you're uncertain about which node type suits your needs, consider starting with an RPC node. It will allow you to explore the ecosystem and gain familiarity.

## HW Requirements

The hardware requirements are listed in the table below:

| Requirement        | RPC node           | Boot node          | Validator node     |
| ------------------ | ------------------ | ------------------ | ------------------ |
| Core               | 1                  | 1                  | 1                  |
| Threads per core   | 2                  | 2                  | 2                  |
| Clock speed (GHz)  | 2.2                | 2.2                | 2.2                |
| Memory (GiB)       | 2                  | 4                  | 2                  |
| Bandwidth (Gigabit)| Up to 5            | Up to 5            | Up to 5            |
| Storage (GB)       | 50<br/>5 with pruning| 5                | 150                |

Consider those reported above as recommendations, even if it's possible that machines with lower requirements are still able to run a node properly.

## Setup Types

In terms of setup type, you have two options to choose between:

- **Using Docker (recommended):**
  - Docker provides a convenient and consistent environment for running your node,
  - simplifies deployment and ensures compatibility across different platforms,
  - highly recommended for ease of use and maintenance.
- **Using binaries built from source:**
  - if you prefer more control over the installation process, you can build the binaries directly from the source code, available at [NH-core](https://github.com/HorizenLabs/NH-core),
  - requires manual compilation and configuration,
  - suitable for advanced users who want to customize their setup.
