---
title: Update a Running Node
---

## Procedure

Check the [releases page](https://github.com/zkVerify/compose-zkverify-simplified/releases) and note the latest tag `latest_tag`.
To update an already running node (wheter it is an RPC node, boot node or validator node) open a terminal, navigate to the root directory of project `zkVerify` and:

```bash
cd zkVerify
git fetch
git checkout latest_tag
```

:::tip[**Recommendation: use the latest tag**]
It is recommended to use the latest tag in order to run the latest, most updated software. Check the [releases page](https://github.com/zkVerify/compose-zkverify-simplified/releases) to find the latest tag and if needed, update accordingly the command provided above (e.g `latest_tag` -> `0.0.0`).
:::

After checking out the new source code version, build it with:

```bash
cargo build --profile production
```

After the building process has finished, stop your currently running node by pressing `ctrl+c` in the associated terminal and restart it with `target/production/zkv-node` using the same command-line arguments you previously used to start your node.

Check the new source code version is used by inspecting the log starting with `✌️  version` (it is located in the very first log lines).
