---
title: Run a Boot Node
---

For running a boot node the specific command-line arguments you'd want to set are the following:

| Name          | Description                                                                                                                                                                                                 | Value                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| --listen-addr | Listen on this multiaddress.<br/> By default: If `--validator` is passed: `/ip4/0.0.0.0/tcp/<port>` and `/ip6/[::]/tcp/<port>`. Otherwise: `/ip4/0.0.0.0/tcp/<port>/ws` and `/ip6/[::]/tcp/<port>/ws`.      | Multiaddress matching the p2p and p2p/ws ports your machine externally exposes. |

So for example you can launch it with:

```bash
target/release/nh-node --name MyZkVerifyBootNode --base-path /home/your_user/boot_node_data --chain test --port 30333 --listen-addr /ip4/0.0.0.0/tcp/30333 --listen-addr /ip4/0.0.0.0/tcp/30334/ws
```

You can check from the logs printed out in the console that your boot node is up and running (e.g. it keeps updating the chain tip, it is connected to other peers, ...).

Refer to [this section](../03-run_using_docker/03-run-boot-node.md#Next-Steps) for next steps you need to take care of after starting your boot node.
