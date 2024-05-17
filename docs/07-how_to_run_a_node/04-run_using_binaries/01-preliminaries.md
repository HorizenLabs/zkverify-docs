---
title: Preliminaries
---

## Prerequisites

For running a **zkVerify** node, it is recommended to use a Linux machine in order to have a better deployment experience.

Here below is a list of prerequisites that need to be available on your machine in order to build **zkVerify** source code:

- Rustup tool for Rust programming language: can be installed with `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`,
- Rust source code for Rust toolchain: can be added with `rustup component add rust-src`,
- Wasm target for Rust toolchain: can be added with `rustup target add wasm32-unknown-unknown`,
- `protoc` comnpiler: can be installed with `sudo apt install protobuf-compiler`,
- `clang` comnpiler: can be installed with `sudo apt install clang`,

Lastly, clone the repository [NH-core](https://github.com/HorizenLabs/NH-core) with the command:

```bash
git clone https://github.com/HorizenLabs/NH-core.git
```

This repository contains the implementation of a **zkVerify** mainchain node. It is based on the [Substrate](https://substrate.io/) framework.

## Building the Binaries from Source Code

For building the source code open a terminal at repository root and type:

```bash
cargo build --release
```

or:

```bash
cargo build
```

for a debug build.

The build process downloads all the dependencies and can take several minutes on the first run; when finished you can find the build output in directory `target/release` (or `target/debug`) and in particular the node executable `nh-node`.

In case you need to clean your workspace, removing previous build output, you can achieve this with:

```bash
cargo clean
```

## Node Common Configuration

In the next pages you'll get instructed on how to run `nh-node` in different modes, setting the proper command-line arguments. Keep in mind that being **zkVerify** node based on the [Substrate node template](https://docs.substrate.io/reference/command-line-tools/node-template/), it supports the same set of command-line arguments as the template. For getting a detailed description for each of them you can type:

```bash
target/release/nh-node --version
```

The common command-line arguments you'd want to set regardless of the node type you picked are:

| Name            | Description                                                                                                                                                                                                 | Value                                                                     |
| -------------   | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| --name          | The human-readable name for this node.<br/> It's used as network node name.                                                                                                                                 | Whatever you want.                                                        |
| --base-path     | Specify custom base path.                                                                                                                                                                                   | Absolute or relative path.                                                |
| --chain         | Specify the chain specification.<br/> It can be one of the predefined ones (dev, local, or staging) or it can be a path to a file with the chainspec (such as one exported by the `build-spec` subcommand). | `test` for joining **zkVerify** testnet.                                  |
| --port          | Specify p2p protocol TCP port                                                                                                                                                                               | Any number, but make sure the port is not already in use on your machine. |
| --node-key-file | File from which to read the node's secret key to use for p2p networking.<br/> The contents of the file are parsed according to the choice of `--node-key-type` as follows:<br/> - `ed25519`: the file must contain an unencoded 32 byte or hex encoded Ed25519 secret key.<br/> If the file does not exist, it is created with a newly generated secret key of the chosen type. | Absolute or relative path. |

## Node Command-Line Utilities
