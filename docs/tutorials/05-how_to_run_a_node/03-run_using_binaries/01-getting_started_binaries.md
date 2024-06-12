---
title: Getting Started - Binaries
---

## Prerequisites

To run a **zkVerify** node, it is recommended users use a Linux machine for a better deployment experience.

Below is a list of prerequisites that need to be available on your machine in order to build the **zkVerify** source code:

- Rustup tool for Rust programming language: can be installed with `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`,
- Rust source code for Rust toolchain: can be added with `rustup component add rust-src`,
- Wasm target for Rust toolchain: can be added with `rustup target add wasm32-unknown-unknown`,
- `protoc` compiler: can be installed with `sudo apt install protobuf-compiler`,
- `clang` compiler: can be installed with `sudo apt install clang`,

Lastly, clone the repository [zkVerify](https://github.com/HorizenLabs/zkVerify) with the command:

```bash
git clone --branch 0.3.0 https://github.com/HorizenLabs/zkVerify.git
```

:::tip[**Recommendation: use the latest tag**]
It is recommended to use the latest tag in order to run fresh and updated software; check from the [releases page](https://github.com/HorizenLabs/compose-zkverify-simplified/releases) which is the latest tag and if neeeded update accordingly the command provided above (here tag `0.3.0` is used).
You can also target directly `main` branch using `git clone --branch 0.3.0 https://github.com/HorizenLabs/zkVerify.git` but ensure that you fully understand the implications of doing so.
:::

This repository contains the implementation of a **zkVerify** node. It is based on the [Substrate](https://substrate.io/) framework.

## Building the Binaries from Source Code

To build the source code, open a terminal at `root` and type:

```bash
cargo build --profile production
```

or:

```bash
cargo build
```

For a debug build.

The build process downloads all the dependencies and can take several minutes on the first run.  When finished, you can find the build output in directory `target/production` (or `target/debug`).  The node executable is `nh-node`.

In case you need to clean your workspace removing the previous build output, run:

```bash
cargo clean
```

## Node Command-Line Utilities

Apart from the execution of the node itself, `nh-node` provides some command-based utility features. Important features to note are:

- Command `key`:
  - Subcommands `generate`, `inspect`, `insert` allow you to handle generation, parsing and insertion of account keys (those used for example by Babe and Grandpa algorithm).  These are important if you choose to run a validator node.
  - subcommands `generate-node-key`, `inspect-node-key` allow you to handle generation and parsing of node keys (those used for signing peer-to-peer messages and for uniquely identifying the node within the network).  These are important if you decide to run a boot node.
  - Use `target/production/nh-node key --help` for additional details,
- Command `build-spec`:
  - Allows you to create chain-spec file.
  - Use `target/production/nh-node build-spec --help` for additional details.

## Node Common Configuration

In the next pages you'll find instructions on how to run `nh-node` in different modes and how to set the proper command-line arguments. Keep in mind that **zkVerify** nodes are based on the [Substrate node template](https://docs.substrate.io/reference/command-line-tools/node-template/).  Therefore they support the same set of command-line arguments as the template. To get detailed descriptions for each of the commands, run:

```bash
target/production/nh-node --help
```

The common command-line arguments you want to set regardless of the node type you pick are:

| Name            | Description                                                                                                                                                                                                 | Value                                                                     |
| -------------   | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| --name          | The human-readable name for this node.<br/> It's used as network node name.                                                                                                                                 | Whatever you want.                                                        |
| --base-path     | Specify custom base path.                                                                                                                                                                                   | Absolute or relative path.                                                |
| --chain         | Specify the chain specification.<br/> It can be one of the predefined ones (dev, local, or staging) or it can be a path to a file with the chainspec (such as one exported by the `build-spec` subcommand). | `test` for joining **zkVerify** testnet.                                  |
| --port          | Specify p2p protocol TCP port                                                                                                                                                                               | Any number, but make sure the port is not already in use on your machine. |
