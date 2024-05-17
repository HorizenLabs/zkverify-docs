---
title: Run a Validator Node
---

For running a validator node the specific command-line arguments you'd want to set are the following:

| Name        | Description                                                                                                                                                                             | Value                      |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| --validator | Enable validator mode.<br/> The node will be started with the authority role and actively participate in any consensus task that it can (e.g. depending on availability of local keys). | No value must be provided. |

So for example you can launch it with:

```bash
target/release/nh-node --name MyZkVerifyValidatorNode --base-path /home/your_user/validator_node_data --chain test --port 30353 --validator
```

You can check from the logs printed out in the console that your validator node is up and running (e.g. it keeps updating the chain tip, it is connected to other peers, it authors new blocks, ...).

Refer to [this section](../03-run_using_docker/04-run-validator-node.md#Next-Steps) for next steps you need to take care of after starting your validator node.
