---
title: zkVerify Roadmap
---

### Implementing a minimum viable zkVerify

:::note[Milestone 1 - March 2024]

- **zkVerify:** A blockchain built on a widely supported framework called Substrate, which features a seamless upgrade process, allows for the exchange of $ACME and verification of FFLONK proofs (produced by the Polygon zkEVM).

- **Proof Submission Interface:** An RPC and set of transactions used by zk-rollups or zk-applications to submit proofs to zkVerify

- **Attestation mechanism:** A protocol that publishes data to Ethereum to show that a proof was verified by zkVerify

- **zkVerify Smart Contract:** The storage and validation mechanism that lives on Ethereum and allows zkVerify users to verify their proof was included in an attestation.

- **Polygon zkEVM rollup:** A rollup built with Polygon’s CDK that lives on Sepolia testnet (Ethereum’s testnet) which generates and submits proofs to zkVerify.
:::

### Expanding testnet access

:::note[Milestone 2 - May 2024]
- **zkVerify**: additions to zkVerify including:
   - A change of consensus from AURA to BABE
   - Implementation of a new proof verification pallet which verifies zkSync Era proofs
- **Network** changes to allow for external parties to run a node
- **Documentation** updates
:::

### Adding proof verifiers

:::note[Milestone 2.1 - June 2024]
**Coming soon!**  This milestone will feature:
- **Two new proof verifiers** aimed at expanding accessibility and increasing use cases that zkVerify can accommodate.
- **Proof submission interface** generalization.
:::

:::note[Milestone 2.2 - June 2024]
**Coming soon!** This milestone will feature more proof verifiers.
:::
