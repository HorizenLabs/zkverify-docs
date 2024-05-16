---
title: Chosing the Node Type
---

## Node Types

When setting up a **zkVerify** node, the first decision you’ll need to make is which type of node to run. While there are various options, three main types of node can be identified:

- **RPC node:**
  - connects to the other nodes and interacts with them by sending and receiving blockchain data,
  - can maintain either a full or partial copy of the blockchain, depending on your requirements,
  - use cases for RPC node vary widely; for instance, they can serve as local entry point for user to interact with the blockchain.
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

*Not sure which option to choose?* If you’re uncertain about which node type suits your needs, consider starting with an RPC node. It will allow you to explore the ecosystem and gain familiarity.
