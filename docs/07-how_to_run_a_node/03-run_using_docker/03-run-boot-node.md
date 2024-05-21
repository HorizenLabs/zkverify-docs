---
title: Run a Boot Node
---

## Prepare the Environment

For running a boot node (refer to [this page](../01-preliminaries.md#node-types.md) for node types) open a terminal and navigate to the root directory of project `compose-zkverify-simplified`:

```bash
cd compose-zkverify-simplified
```

then launch the initialization script by typing:

```bash
scripts/init.sh
```

The interactive session run by the script asks you for providing input related to:

- node type: you need to select boot node,
- network: currently only testnet is available,
- node name: just a human readable identifier,
- node key (`node_key.dat` file): you can import an already existing key or let the script to randomly generate one for you (refer to [this page](./01-preliminaries.md) for node keys).

At the end of the session the script would populate directory `deployments/boot-node/`*`network`* with the proper files and you would get a message similar to:

```bash
=== Run the compose project with the following command: 

========================
docker compose -f /home/your_user/compose-zkverify-simplified/deployments/boot-node/testnet/docker-compose.yml up -d
========================
```

Before actually launching the node, you can further inspect and customize the execution by manually editing `deployments/boot-node/`*`network`*`/.env` file. Entries under `# Node miscellaneous` section are related to the Docker container, while those under `# Node config` section are related to the Substrate node instance. Pay attention to only take this action if you fully understand its implications.

## Run the Node

*Time to start now!* Within the terminal type the command proposed by the script:

```bash
docker compose -f /home/your_user/compose-zkverify-simplified/deployments/boot-node/testnet/docker-compose.yml up -d
```

*and you are done!* This allows you to start the node in background, for checking it is running properly you can type:

```bash
docker container ls
```

and you should get something similar to:

```bash
CONTAINER ID   IMAGE                         COMMAND                CREATED              STATUS              NAMES
dab0c67cf5aa   horizenlabs/zkverify:latest   "/app/entrypoint.sh"   About a minute ago   Up About a minute   boot-node
```

showing your node has started correctly.

Up to here your boot node is running properly but, in order to serve its real purposes, you need to follow through with a few additional steps.

## Next Steps

It's now time to make sure that the machine your node is running on is properly configured; this means checking that:

- a public static IP address (or a DNS) is associated to it,
- the proper ports are externally exposed: check the values for configuration `NODE_NET_P2P_PORT` and `NODE_NET_P2P_PORT_WS` inside `.env` file.

Lastly, you should notify about the existence of your bootnode any other node operators you want; in particular you need to provide:

- the IP address (or the DNS),
- the open ports,
- the public part of your node key (peer id); this is printed at the startup of your node with the log `Local node identity is: ...` or is retrievable with command `docker run -v`*`path_to_your_file`*`/node_key.dat:/data/node_key.dat --rm --entrypoint nh-node horizenlabs/zkverify:latest key inspect-node-key --file /data/node_key.dat`.

In this way they will be able to leverage your boot node for joining the network by inserting these configurations into the `.env` file of their node (for the IP address case):

- `NH_CONF_BOOTNODES="/ip4/`*`IP_ADDRESS`*`/tcp/`*`${NH_NODE_NET_P2P_PORT}`*`/p2p/`*`PEER_ID`*`,
- `NH_CONF_BOOTNODES="/ip4/`*`IP_ADDRESS`*`/tcp/`*`${NH_NODE_NET_P2P_PORT_WS}`*`/ws/p2p/`*`PEER_ID`*`,

or (for the DNS case):

- `NH_CONF_BOOTNODES="/dns/`*`DNS_NAME`*`/tcp/`*`${NH_NODE_NET_P2P_PORT}`*`/p2p/`*`PEER_ID`*`,
- `NH_CONF_BOOTNODES="/dns/`*`DNS_NAME`*`/tcp/`*`${NH_NODE_NET_P2P_PORT_WS}`*`/ws/p2p/`*`PEER_ID`*`.
