---
title: Update a Running Node
---

## Procedure

To update an already running node (wheter it is an RPC node, boot node or validator node) open a terminal, navigate to the root directory of project `zkVerify` and check out latest tag:

```bash
cd zkVerify
git checkout 0.3.0
```

:::tip[**Recommendation: use the latest tag**]
It is recommended to use the latest tag in order to run fresh and updated software; check from the [releases page](https://github.com/HorizenLabs/compose-zkverify-simplified/releases) which is the latest tag and if neeeded update accordingly the command provided above (here tag `0.3.0` is used).
:::

After checking out the new source code version, build it with:

```bash
cargo build --profile production
```

After the building process has finished, then stop your currently running node by pressing `ctrl+c` in the associated terminal and finally restart it with `target/production/nh-node` using the same command-line arguments used by your previously running node.

Check the new source code version is used by inspecting log starting with `✌️  version` (is located in the very first log lines).
