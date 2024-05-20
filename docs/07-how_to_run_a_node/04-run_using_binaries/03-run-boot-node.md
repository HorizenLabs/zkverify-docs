---
title: Run a Boot Node
---

## Prepare and Run

For running a boot node the specific command-line arguments you'd want to set are the following:

| Name          | Description                                                                                                                                                                                                 | Value                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| --listen-addr | Listen on this multiaddress.<br/> By default: If `--validator` is passed: `/ip4/0.0.0.0/tcp/<port>` and `/ip6/[::]/tcp/<port>`. Otherwise: `/ip4/0.0.0.0/tcp/<port>/ws` and `/ip6/[::]/tcp/<port>/ws`.      | Multiaddress matching the p2p and p2p/ws ports your machine externally exposes. |
| --node-key-file | File from which to read the node's secret key to use for p2p networking.<br/> The contents of the file are parsed according to the choice of `--node-key-type` as follows:<br/> - `ed25519`: the file must contain an unencoded 32 byte or hex encoded Ed25519 secret key.<br/> If the file does not exist, it is created with a newly generated secret key of the chosen type. | Absolute or relative path. |

The node-key file can be generated and inspected with `nh-node` command `key`, subcommands `generate-node-key` and `inspect-node-key` (refer to [this section](./01-preliminaries.md#node-command-line-utilities) for further details).

You can then start with (note to adapt the values of the args based on your needs):

```bash
target/production/nh-node --name MyZkVerifyBootNode --base-path /home/your_user/boot_node_data --chain test --port 30333 --listen-addr /ip4/0.0.0.0/tcp/30333 --listen-addr /ip4/0.0.0.0/tcp/30334/ws
```

You can check from the logs printed out in the console that your boot node is up and running (e.g. it keeps updating the chain tip, it is connected to other peers, ...).

Refer to [this section](../03-run_using_docker/03-run-boot-node.md#next-steps) for the next steps you need to take care of after starting your boot node.
