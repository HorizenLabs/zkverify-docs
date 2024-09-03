---
title: "TypeScript Example: zkverifyjs"
---


## How to Submit a Proof

<!-- Follow the instructions below to submit a proof using the example TypeScript project. This example demonstrates submission of different proof types and their events. -->
Follow the instructions below to submit a proof using the [zkverifyjs](https://www.npmjs.com/package/zkverifyjs) npm package.

## Prerequisites

Before you begin, ensure you have Node.js installed on your machine. You can download and install it from the [official Node.js website](https://nodejs.org/).

### Installing Node.js

1. **Download Node.js**:
    - Visit the [Node.js download page](https://nodejs.org/).
    - Download the LTS (Long Term Support) version for your operating system.

2. **Install Node.js**:
    - Run the downloaded installer and follow the instructions.
    - Ensure that the installer includes `npm` (Node Package Manager).

3. **Verify Installation**:
    - Open a terminal or command prompt.
    - Run the following commands to verify that Node.js and npm are installed correctly:

      ```shell
      node -v
      npm -v
      ```

    - You should see the version numbers of Node.js and npm.

### Using zkverifyjs
Install the package with npm:
```shell
npm install zkverifyjs
```

Features of the zkverifyjs library include:
- Easily integrate with zkVerify from a backend or frontend application
- Supports fflonk, groth16, risc0 (Noir to be added next)
- Connect to zkverify testnet
- Allows custom networks by providing your own network and wss
- Verify, Proof of Existence, and an exposed polkadot API & provider
- Choose whether to wait for the attestation to be published, or get a transaction response quickly as soon as the block is finalized
- Subscribe and unsubscribe to new attestation events
- Read-only mode (no account required, can't send transactions)
- Add and remove a connected account
- Easy to read response format for success and failure
- Event emission for all steps of the process that can be listened for

See the [README](https://www.npmjs.com/package/zkverifyjs#usage) for detailed instructions on usage, API reference, and code example.

<!-- ### Example Project

Clone the example TypeScript project and then follow the README instructions.

```shell
git clone https://github.com/HorizenLabs/zkverify-example-typescript.git
``` -->

## Further Examples

Other JavaScript examples can be found in the [e2e tests](https://github.com/HorizenLabs/zkVerify/tree/main/e2e-tests/js_scripts)