---
title: End-to-End Tests
---

## The Step-By-Step Guide

### Expanding End-to-End Tests Suite

The end-to-end (e2e) tests suite is a tool that the zkVerify CI/CD pipeline leverages to externally test the node features. Expanding it so to accomodate your new pallet is important for stability and reliability reasons.

The steps to follow are:

- Create a new file `e2e-tests/js_scripts/foo_data.js` and define inside the tests data in a similar way to what you did for `verifiers/foo/src/resources.rs`:

  ```javascript
  const PROOF = "0x00...02"
  const PUBS = "0000000000000000000000000000000000000000000000000000000000000003"
  const VKEY = "0x0000000000000000000000000000000000000000000000000000000000000001"
  
  exports.PROOF = PROOF
  exports.PUBS = PUBS
  exports.VK = VKEY
  ```

- Adapt the file `e2e-tests/js_scripts/0005-proofPath_rpc.js` adding this line after the analogous ones for the other verifiers:

  ```javascript
  const { PROOF: FOO_PROOF, PUBS: FOO_PUBS, VK: FOO_VK } = require('./foo_data.js');
  ```

  And finally adapt also the file `e2e-tests/js_scripts/0005-proofPath_rpc.js` adding the code below:

  ```javascript
  ,
  {
      name: "Foo",
      pallet: api.tx.settlementFooPallet,
      args: [{ 'Vk': FOO_VK }, FOO_PROOF, FOO_PUBS],
  }
  ```

At this point you should be able to run end-to-end tests locally following the instructions provided in the file `e2e-tests/README.md`.
