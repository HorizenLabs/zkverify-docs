---
title: JSON RPC
---

# JSON RPC Methods


## Flags
```
--rpc-external
```
Listens to all RPC interfaces. By default, the node only listens to local RPC calls. If you set this command-line option, keep in mind that not all RPC methods are safe to be exposed publicly. 
<br/>

```
--unsafe-rpc-external
```
Exactly the same as –rpc-external but suppresses the warning to understand risks of exposing unsafe methods.
<br/>


```
--rpc-methods Safe 
```
Specifies the RPC methods to expose. Safe flag will only expose the safe methods.
<br/>


```
--rpc-methods Unsafe 
```
Specifies the RPC methods to expose. Unsafe flag will only expose all the methods, including the unsafe ones.


## Methods by category


### author - unsafe


###### author_hasKey

Checks if the keystore has private keys for the given public key and key type.

Returns `true` if a private key could be found.

**Parameters**

`publicKey`  Bytes

`keyType` Text

**Returns**


`
Bool 
`



###### author_hasSessionKeys

Checks if the keystore has private keys for the given session public keys.

`session_keys` is the SCALE encoded session keys object from the runtime.

Returns `true` if all private keys could be found. 

**Parameters**

`sessionKeys`  Bytes

**Returns**


`
Bool 
`



###### author_insertKey

Insert a key into the keystore

**Parameters**

`keyType`  Text

`suri`  Text

`publicKey`  Bytes

**Returns**


`
Bytes
`



###### author_removeExtrinsic

Remove given extrinsic from the pool and temporarily ban it to prevent reimporting

**Parameters**

`bytesOrHash`  Vec&lt;ExtrinsicOrHash>

**Returns**


`
Vec<Hash> 
`



###### author_rotateKeys

Generate new session keys and returns the corresponding public keys

**Parameters**

None

**Returns**
`
Bytes 
`

### author - safe


###### author_pendingExtrinsics

Returns all pending extrinsics, potentially grouped by sender

**Parameters**

None

**Returns**


`
Vec<Extrinsic> 
`



###### author_submitAndWatchExtrinsic

Submit and subscribe to watch an extrinsic until unsubscribed

**Parameters**

`extrinsic`  Extrinsic

**Returns**


`
ExtrinsicStatus
`



###### author_submitExtrinsic

Submit a fully formatted extrinsic for block inclusion

**Parameters**

`extrinsic`  Extrinsic

**Returns**


`
Hash

`



###### author_unwatchExtrinsic

Allow clients to unsubscribe to watch an extrinsic

**Parameters**

`extrinsic`  Extrinsic

**Returns**


`
Bool
`



### chain - safe


###### chain_getBlock

Get header and body of a relay chain block

**Parameters**

`hash?`  BlockHash

**Returns**


`
SignedBlock 
`



###### chain_getBlockHash (alias = chain_getHead)

Get the block hash for a specific block

**Parameters**

`blockNumber?`  BlockNumber

**Returns**


`
BlockHash 
`



###### chain_getFinalizedHead (alias = chain_getFinalisedHead)

Get hash of the last finalized block in the canon chain

**Parameters**

None

**Returns**


`
BlockHash 
`



###### chain_getHeader

Retrieves the header for a specific block

**Parameters**

`hash?`  BlockHash

**Returns**


`
Header 
`



###### chain_subscribeAllHeads

Retrieves the newest header via subscription

**Parameters**

None

**Returns**


`
Header 
`



###### chain_unsubscribeAllHeads

Enables customers to revoke their membership to receive updates on the newest headers.

**Parameters**

None

**Returns**


`
Bool 
`



###### chain_subscribeFinalizedHeads (alias = chain_subscribeFinalisedHeads)

Retrieves the best finalized header via subscription

**Parameters**

None

**Returns**


`
Header 
`



###### chain_unsubscribeFinalizedHeads (alias = chain_unsubscribeFinalisedHeads)

Enables customers to revoke their subscription to receive updates on the best finished headers.

**Parameters**

None

**Returns**


`
Bool 
`



###### chain_subscribeNewHeads (aliases = chain_subscribeNewHead, subscribe_newHead)

Retrieves the best header via subscription

**Parameters**

None

**Returns**


`
Header 
`



###### chain_unsubscribeNewHeads (alias = chain_unsubscribeNewHead, unsubscribe_newHead)

Enables customers to revoke their membership to receive updates on the newest headers.

**Parameters**

None

**Returns**


`
Bool 
`



### system - safe


###### system_accountNextIndex (alias = account_nextIndex)

Returns the next valid index (aka nonce) for a given account. This method takes into consideration all pending transactions currently in the pool and if no transactions are found in the pool it falls back to query the index from the runtime (aka. state nonce).

**Parameters**

`accountId`  

**Returns**


`
Index 
`



###### system_chainType

Retrieves the chain type

**Parameters**

`None`  

**Returns**


`
ChainType 
`



###### system_chain

Retrieves the chain

**Parameters**

`None`  

**Returns**


`
Text 
`



###### system_health

Return health status of the node.

**Parameters**

`None`  

**Returns**


`
Health 
`



###### system_name

Retrieves the node name.

**Parameters**

`None`  

**Returns**


`
Text 
`



###### system_nodeRoles

Returns the roles the node is running as.

**Parameters**

`None`  

**Returns**


`
Vec<NodeRole> 
`



###### system_properties

Get a custom set of properties as a JSON object, defined in the chain spec.

**Parameters**

`None`  

**Returns**


`
ChainProperties 
`



###### system_syncState

Returns the state of the syncing of the node.

**Parameters**

`None`  

**Returns**


`
SyncState 
`



###### system_version

Retrieves the version of the node.

**Parameters**

`None`  

**Returns**


`
Text 
`



###### system_localPeerId

Returns the base58-encoded PeerId of the node.

**Parameters**

`None`  

**Returns**


`
Text 
`



###### system_localListenAddresses

Returns the multi-addresses that the local node is listening on. The addresses include a trailing `/p2p/` with the local PeerId, and are thus suitable to be passed to `addReservedPeer` or as a bootnode address for example.

**Parameters**

`None`  

**Returns**


`
Vec<Text> 
`



###### system_reservedPeers

Returns the list of reserved peers

**Parameters**

None 

**Returns**


`
Vec<Text> 
`



### system - unsafe


###### system_peers

Returns the currently connected peers

**Parameters**

`None`  

**Returns**


`
Vec<PeerInfo> 
`



###### system_addLogFilter

Adds the supplied directives to the current log filter. The syntax is identical to the CLI `&lt;target>=&lt;level>`: `sync=debug,state=trace`

**Parameters**

`directives` Text 

**Returns**


`
Null 
`



###### system_resetLogFilter

Resets the log filter to Substrate defaults

**Parameters**

`None` 

**Returns**


`
Null 
`



###### system_addReservedPeer

Adds a reserved peer. Returns the empty string or an error. The string parameter should encode a `p2p` multiaddr.

`/ip4/198.51.100.19/tcp/30333/p2p/QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV`  is an example of a valid, passing multiaddr with PeerId attached.

**Parameters**

`peer` Text 

**Returns**


`
Text 
`



###### system_removeReservedPeer

Remove a reserved peer. The string should encode only the PeerId e.g. `QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV`

**Parameters**

`peerId` Text 

**Returns**


`
Text 
`



###### system_dryRun (alias = system_dryRunAt)

Dry run an extrinsic at a given block

**Parameters**

`extrinsic` Bytes

`at?` BlockHash

**Returns**


`
ApplyExtrinsicResult 
`



### state - safe


###### state_call (alias = state_callAt)

Call a method from the runtime API at a block's state

**Parameters**

`method` Text

`data` Bytes

`at?` BlockHash

**Returns**


`
Bytes 
`



###### state_getKeys 

Return the keys with prefix, leave empty to get all the keys.

**Parameters**

`key` StorageKey

`at?` BlockHash

**Returns**


`
Vec<StorageKey> 
`



###### state_getKeysPaged (alias = state_getKeysPagedAt)

Returns the keys with prefix with pagination support. Up to `count` keys will be returned.

If `start_key` is passed, return next keys in storage in lexicographic order.

**Parameters**

`key` StorageKey

`count` u32

`startKey?` StorageKey

`at?` BlockHash

**Returns**


`
Vec<StorageKey> 
`



###### state_getStorage (alias = state_getStorageAt)

Returns a storage entry at a specific block's state.

**Parameters**

`key` StorageKey

`at?` BlockHash

**Returns**


`
StorageData 
`



###### state_getStorageHash (alias = state_getStorageHashAt)

Returns the hash of a storage entry at a block's state.

**Parameters**

`key` StorageKey

`at?` BlockHash

**Returns**


`
Hash 
`



###### state_getStorageSize (alias = state_getStorageSizeAt)

Returns the size of a storage entry at a block's state.

**Parameters**

`key` StorageKey

`at?` BlockHash

**Returns**


`
u64 
`



###### state_getChildReadProof

Returns proof of storage for child key entries at a specific block state.

**Parameters**

`childStorageKey` PrefixedStorageKey

`keys` Vec&lt;StorageKey>

`at?` BlockHash

**Returns**


`
ReadProof 
`



###### state_getReadProof

Returns proof of storage entries at a specific block state

**Parameters**

`keys` Vec&lt;StorageKey>

`at?` BlockHash

**Returns**


`
ReadProof 
`



###### state_getMetadata

Returns the keys with prefix, leave empty to get all the keys

**Parameters**

`at?` BlockHash

**Returns**


`
Metadata
`



###### state_getRuntimeVersion (alias = chain_getRuntimeVersion)

Get the runtime version

**Parameters**

`at?` BlockHash

**Returns**


`
RuntimeVersion
`



###### state_subscribeRuntimeVersion (alias = chain_subscribeRuntimeVersion)

Retrieves the runtime version via subscription

**Parameters**

None

**Returns**


`
RuntimeVersion
`



###### state_unsubscribeRuntimeVersion (alias = chain_unsubscribeRuntimeVersion)

Unsubscribe to existing subscription to runtime version

**Parameters**

None

**Returns**


`
Bool
`



### state - unsafe


###### state_queryStorage

Query historical storage entries (by key) starting from a block given as the second parameter.

NOTE: The first returned result contains the initial state of storage for all keys.

Subsequent values in the vector represent changes to the previous state (diffs).

WARNING: The time complexity of this query is O(|keys|*dist(block, hash)), and the memory complexity is O(dist(block, hash)) -- use with caution.

**Parameters**

`key` Vec&lt;KeyStorage>

`fromBlock` Hash

`toBlock?` Hash

**Returns**


`
Vec<StorageChangeSet> 
`



###### state_queryStorageAt

Query storage entries (by key) at a block hash given as the second parameter.

NOTE: Each StorageChangeSet in the result corresponds to exactly one element the storage value under an input key at the input block hash.

**Parameters**

`keys` Vec&lt;KeyStorage>

`at?` BlockHash

**Returns**


`
Vec<StorageChangeSet> 
`



###### state_getPairs

Returns the keys with prefix, leave empty to get all the keys

**Parameters**

`prefix` StorageKey

`at?` BlockHash

**Returns**


`
Vec<KeyValue> 
`



###### state_subscribeStorage 

Subscribes to storage changes for the provided keys

**Parameters**

`Keys?`Vec&lt;StorageKey>

**Returns**


`
StorageChangeSet 
`



###### state_unsubscribeStorage 

Unsubscribes to storage changes for the provided keys

**Parameters**


`
None
`


**Returns**


`
Bool 
`



###### state_traceBlock

Provides a way to trace the re-execution of a single block

**Parameters**

`block` Hash

`targets` Option&lt;Text>

`storageKeys` Option&lt;Text>

`methods` Option&lt;Text>

**Returns**


`
TraceBlockResponse
`



### payment - safe


###### payment_queryFeeDetails

Query the detailed fee of a given encoded extrinsic

**Parameters**

`extrinsic` Bytes

`at?` Blockhash

**Returns**


`
Feedetails
`



###### payment_queryInfo

Retrieves the fee information for an encoded extrinsic

**Parameters**

`extrinsic` Bytes

`at?` Blockhash

**Returns**


`
DispatchInfo
`



### offchain - unsafe


###### offchain_localStorageGet

Get offchain local storage under given key and prefix

**Parameters**

`kind` StorageKind

`key` Bytes

**Returns**


`
Option<Bytes>
`



###### offchain_localStorageSet

Set offchain local storage under given key and prefix

**Parameters**

`kind` StorageKind

`key` Bytes

`value` Bytes

**Returns**


`
Null
`



### childstate - safe


###### childstate_getKeys

Returns the keys with prefix from a child storage, leave empty to get all the keys

**Parameters**

`childKey` PrefixedStorageKey

`prefix` StorageKey

`at?` Hash

**Returns**


`
Vec<StorageKey>
`



###### childstate_getKeysPaged (alias = childstate_getKeysPagedAt)

Returns the keys with prefix from a child storage with pagination support

**Parameters**

`childKey` PrefixedStorageKey

`prefix` StorageKey

`count` u32

`startKey?` storageKey

`at?` Hash

**Returns**


`
Vec<StorageKey>
`



###### childstate_getStorage

Returns a child storage entry at a specific block state

**Parameters**

`childKey` PrefixedStorageKey

`key` StorageKey

`at?` Hash

**Returns**


`
Option<StorageData>
`



###### childstate_getStorageEntries
Returns child storage entries for multiple keys at a specific block state

**Parameters**

`childKey` PrefixedStorageKey

`keys` Vec&lt;StorageKey>

`at?` Hash

**Returns**


`
Vec<Option<StorageData>>
`



###### childstate_getStorageHash

Returns the hash of a child storage entry at a block state

**Parameters**

`childKey` PrefixedStorageKey

`key `StorageKey

`at?` Hash

**Returns**


`
Option<Hash>
`



###### childstate_getStorageSize

Returns the size of a child storage entry at a block state

**Parameters**

`childKey` PrefixedStorageKey

`key `StorageKey

`at?` Hash

**Returns**


`
Option<u64>
`



### Others - safe


###### rpc_methods

Retrieves the list of RPC methods that are available to the node

**Parameters**

None

**Returns**


`
Array<String>
`

###### poe_proofPath

Retrieves the path to verified proof

**Parameters**

??

**Returns**


`
String
`



### unstable

The following are unstable RPC methods and are subject to change (ideally should not be used).

* "chainHead_unstable_body”
* "chainHead_unstable_call"
* "chainHead_unstable_continue"
* "chainHead_unstable_follow"
* "chainHead_unstable_header"
* "chainHead_unstable_stopOperation",
* "chainHead_unstable_storage"
* "chainHead_unstable_unfollow"
* “chainHead_unstable_unpin"
* "transaction_unstable_submitAndWatch"
* "transaction_unstable_unwatch"
* “system_unstable_networkState”
