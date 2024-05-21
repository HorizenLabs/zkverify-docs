---
title: JavaScript Example
---

## How to Submit a Proof

Follow the instructions below to submit a proof using JavaScript. This example demonstrates submission of different proof types and their events.

## Prerequisites

Before you begin, ensure you have Node.js installed on your machine. You can download and install it from the [official Node.js website](https://nodejs.org/).

### Installing Node.js

1. **Download Node.js**:
   - Visit the [Node.js download page](https://nodejs.org/).
   - Download the LTS (Long Term Support) version for your operating system.

2. **Install Node.js**:
   - Run the downloaded installer and follow the instructions.
   - Ensure that the installer includes `npm` (Node Package Manager).

3. **Verify Installation**:
   - Open a terminal or command prompt.
   - Run the following commands to verify that Node.js and npm are installed correctly:
     ```shell
     node -v
     npm -v
     ```
   - You should see the version numbers of Node.js and npm.

Now you are ready to follow the instructions below to submit a proof.

### Initialize Your Project

1. Create a new directory for your project, navigate into it:

    ```shell
    mkdir my-zkverify-project
    cd my-zkverify-project
    ```
2. Initialize a new npm project:

    ```shell
    npm init -y
    ```
3. Install the required packages:

    ```shell
    npm install @polkadot/api @polkadot/keyring dotenv
    ```
4. Create a `.env` file:

    ```shell
    echo -e "WEBSOCKET=wss://testnet-rpc.zkverify.io\nPRIVATE_KEY=your_private_key" > .env
    ```
5. Update the `.env` file values:

   - WEBSOCKET: The zkVerify Websocket url
   - PRIVATE_KEY: Your testnet seedphrase enclosed in quotation marks

### Example Script

Create a file named `submitProof.js` and paste the following script into it:

```javascript
require('dotenv').config();
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

const proofs = {
   fflonk: {
      pallet: 'settlementFFlonkPallet'
   },
   boojum: {
      pallet: 'settlementZksyncPallet'
   }
};

if (!process.env.WEBSOCKET || !process.env.PRIVATE_KEY) {
   throw new Error('Required environment variables WEBSOCKET or PRIVATE_KEY are not set.');
}

const proofType = process.argv[2];
const proofHash = process.argv[3];

if (!proofType || !proofHash) {
   throw new Error('Please provide both proof type and proof hash as command line arguments.');
}

if (!proofs[proofType]) {
   throw new Error('Invalid proof type. Valid proof types are: fflonk, boojum.');
}

(async () => {
   let api;
   let provider;
   try {
      provider = new WsProvider(process.env.WEBSOCKET);

      const timeout = new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Failed to connect to the WebSocket URL. Please check the WEBSOCKET environment variable.')), 3000)
      );

      api = await Promise.race([ApiPromise.create({ provider }), timeout]);

      const keyring = new Keyring({ type: 'sr25519' });
      const account = keyring.addFromUri(process.env.PRIVATE_KEY);

      const submitProof = api.tx[proofs[proofType].pallet].submitProof(proofHash);

      console.log(`Submitting ${proofType} proof...`);
      await submitProof.signAndSend(account, ({ status, dispatchError }) => {
         if (status.isInBlock) {
            console.log(`Transaction included at blockHash ${status.asInBlock}`);
         }
         if (status.isFinalized) {
            if (dispatchError) {
               console.log(`Invalid ${proofType} transaction failed as expected.`);
            } else {
               console.log(`${proofType} transaction finalized successfully.`);
            }
         }
      });

      console.log(`Listening for ${proofType} NewAttestation event...`);
      const eventData = await listenForNewAttestationEvent(api);
      console.log(`${proofType} NewAttestation event received: ${eventData.toString()}`);

   } catch (error) {
      if (error.message.includes('Invalid bip39 mnemonic specified')) {
         console.error('Failed to create account from the provided PRIVATE_KEY. Please check the PRIVATE_KEY environment variable.');
      } else {
         console.error(`An error occurred: ${error.message}`);
      }
      if (provider) {
         provider.disconnect();
      }
   } finally {
      if (api) {
         await api.disconnect();
      }
   }
})();

async function listenForNewAttestationEvent(api) {
   return new Promise((resolve, reject) => {
      api.derive.chain.subscribeFinalizedHeads(async header => {
         const events = await api.query.system.events.at(header.hash);
         const attestationEvents = events.filter(({ event }) => api.events.poe.NewAttestation.is(event));
         if (attestationEvents.length > 0) {
            resolve(attestationEvents[0].event.data);
         }
      });
   });
}
```

### Running the Script

Run the script by providing 2 arguments: `proof type` and `proof hash`.  You should see the transaction successfully finalized and a NewAttestationEvent emitted.

```shell
node submitProof.js <proofType> <proofHash>
```

### Working Examples

**Fflonk:**

```shell
node submitProof.js fflonk 0x283e3f25323d02dabdb94a897dc2697a3b930d8781381ec574af89a201a91d5a2c2808c59f5c736ff728eedfea58effc2443722e78b2eb4e6759a278e9246d600f9c56dc88e043ce0b90c402e96b1f4b1a246f4d0d69a4c340bc910e1f2fd80519e465e01bd7629f175931feed102cb6459a1be7b08018b93c142e961d0352d80b8e5d340df28c2f454c5a2535ca01a230bb945ee24b1171481a9a2c6496fed61cf8878e40adb52dc27da5e79718f118467319d15d64fed460d69d951376ac631a6c44faaec76e296b43fe720d700a63fd530f9064878b5f72f2ffe7458c2f031ac6ed8c1e0758dfb3702ed29bbc0c14b5e727c164b3ade07b9f164af0be54b0143b1a6534b2dcf2bd660e1b5b420d86c0c350fd9d614b639c5df98009f1375e141259679021d0a6a3aa3aae2516bace4a4a651265217ec0ea7c0d7f89b987100abcc93d98ff40bae16eff6c29955f7a37155bb25672b12eb5074dcb7c3e2b001718a257cca21ee593d1ba9f8e91e5168aed8e0b1893e11a6b583d975e747f8008a8c2150a04d8f867945ca1740dc3fc3b2fc4daff61b4725fb294435a1b90101803690ae70fc212b7e929de9a22a4642ef4772546cf93ffd1b1196a3d9113a3009c506755578932ca3630508ca1ed6ee83df5ec9e26cb0b5800a70967a1a93a04d142b6a532935a31d84f75d16929df6d38c3a210ac4f435a8024dfb7e6c1f3246d58038a943f237325b44f03d106e523adfec4324615a2dd09e1e5b9143b411c1cf09ee411cf9864d30df4904099920cee9ae8134d45dfeb29e46115d2e740098674b8fc2ca31fac6fcc9302860654fdc1b522b7e064b0759bc5924f332fa921121b5af880f83fbce02f19dabb8f684593e7322fb80bfc0d054797b1d4eff411b01bf68f81f2032ae4f7fc514bd76ca1b264f3989a92e6b3d74cda4f8a714920e4c02f5a71082a8bcf5be0b5750a244bd040a776ec541dfc2c8ae73180e9240ada5414d66387211eec80d7d9d48498efa1e646d64bb1bf8775b3796a9fd0bf0fdf8244018ce57b018c093e2f75ed77d8dbdb1a7b60a2da671de2efe5f6b9d70d69b94acdfaca5bacc248a60b35b925a2374644ce0c1205db68228c8921d9d9
```

**Boojum (zkSync Era)**

```shell
node submitProof.js boojum 0x02c6cf2fd56edca1f17f406cceef3de1c99bba6e499ed96ef4f453af011257c420944a838b2cd133a414ae6882fd8cc0dfb7daa14540d796ab937f65479beaca1fb7b349b2a6dc4edfc8191e31ddc0b342840dc575ad213473529611e15261e8020c09be65a4d571cadbb39b0737777c365af77b4702d6e1a4e0340abb1cb8c3221cc01cc33c432ab679319c724544616069b0d6f4df5f537ec36887deead9631fc36d5da22c35d8d83eb74ccc2afa4a83d2d6c604998ac86e653f1307d016200e01dd9bbcfa860fe26eca3f159b473fa073fce20ef5354c25d52e5e9c4bc2930b5ae2e3e19c47907074ef77fc0e113920e9f702ad0f7f1789c696a47849ebcb21db13fcf4fc3cc99f9879514cb5a3ac5b672a4343b915833be0cb9c4281e1810a376c40d30b54d2c82d98e26d93f4d2fa5010ef0973f4c9ddc5eb83074b2fdf011214912fffecc3507d741e4164d049963f4e22dfefc659a2d4122e141f8f8700cf13591e41e00c27c19f05546c874287a483df746fd1c5f66b955f5caf1fc00928a89a4c924f98bd2bb78a704a7879f15799dcf7e94d2f465c33b65358519606f57ff3f11aee64bdffac49821dda7e029a281519e0f6a44302bd822d69e08d1797df980a6a223e0b455ad79df6ee836ac09486e3c4ce28ee870249e5d1db8f1bf81479df3717fee0f378da47910f1177685a7de078eb5dc2ae65d1ff321cdf2b3c88144fd8079426e8c39efb62913aac7cf198d6a557c9c55f448d65d8aa492a54cd2ae2e57b5ce3918aa3a75f827e8511fa6196d83e0fa77f45e789fa73cd2773b310f717b8af7bfc3456f6e008f9f8c2286808e4430d8d1b0260a5a0f08616887cc329cd4754a0994979552a26b055541d89419c083bb4bb5de0939716b6235a83962376096cac86e2f3497e16083fc0f126305a5b5d822f79b65411e6a0250b0c229cb9efa1d8f7b64754f21fc2d81d8c122d8cc57eafc2b4b2d2b02b262b65157804674d8d5da0a9c18d1d1f48c75ac8a8196bd52cb789b0b2947dbf63258d968097930fc5abd8e36b9aa1b28c8038a1f87292212ca2c0a55673e2a0480f380acabf71e994271a65230015428d1fb0fa29944c4215f070ccfe537dfe37065db5ba5c90ae76cab0e69e2a5f61d238d52b936769a3f7ed6bd98bafe4d15c17548ede6302f4d806e3217b0035927359463fdaf1ca86c439db078959f3f6aa2de55a8662d700be14b546e2099289b221f7bdf8e8d078547d9996f82f13f9e529e3c758071eab1259735092d4fac514b9bd3b87242350a0497e537ef96ac4241265632779c8a98844dea0cb1496e49fb2ab2f50d9533050c840fd2c9155d4e807a69fdafeca7e7aabdfbe234170d106eb0bc2b6e3a3d0c27fcbb8ec611aa7861d57b0926ca97b7137aceeae7c061cdb619a893fce4a77187948db00828b51e70cfbdb9f6b06aaea8b037452a37aa113c75f8a0d8755f69de8e9dbdaff5dc9742b3723cee611e17f0b5f45389e3794d499698df78583610371d6fb780ab8fb080085c1e5e3312cd0cfdf1c440ce0778f84e49f9ebe6217025d6e0a3caa019dc713390dd68b9d7e2971c85dcef20f0fd39e653d03a15d43920502ab4aaea724d4283bffa5d557519aface6622844659eb8704aba1eb7d1440e9838e5ca42aaf4824ed9174f5cae88f196a15a07fabca68c0a76cb22749d5b96a3f30eba226061d1fc0ccaf6d01858bc5096ce8c231e78e52df028888ce52d1803edd0924c08cde09ec0d1241c98d7bedb141e8abe63b5645fd6bf3b143c42004f91a4d4a4cd2480d333ed34a878fcdde8e16b6ebe9c70237f1d856c0e37e4d9aec479cdb4c8e9316284c2edd3202941fdedd81a6ee4fa6735cac981f8cc1a5609a27bb774b5901281497fb2be671c9dac31aad3c122f3859a9f838f8543c7fc2bab27e84dc4b6a2343c5416c38c8dcbbb56f1e3ccf31644ab66ebe86e77cec68836d3771d7e3a800000000a45a2ec20c3f34f4c69cea200fdf39cc78ff50092f7cb1e2894f4d35
```