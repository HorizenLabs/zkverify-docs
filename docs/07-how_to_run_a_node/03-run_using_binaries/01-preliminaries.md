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

In the next sections you'll get instructed on how to run `nh-node` in different modes, setting the proper command-line arguments. Keep in mind that being **zkVerify** node based on the [Substrate node template](https://docs.substrate.io/reference/command-line-tools/node-template/), it supports the same set of command-line arguments as the template. For getting a detailed description for each of them you can type:

```bash
target/release/nh-node --version
```
