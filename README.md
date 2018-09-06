# electroneum-rpc-nodejs

A Node.js wallet manager for interacting with `electroneum-wallet-rpc`.

For more information about Electroneum, visit: https://electroneum.com

This project is based on PsychicCat's project available at this address : https://github.com/PsychicCat/monero-nodejs

I decided to fork and modify monero-nodejs to make a few changes so it works with Electroneum.


## Install the package

### via NPM

```
npm install electroneum-rpc-nodejs
```

### Or clone the Github repository

```
git clone https://github.com/Unyxos/electroneum-rpc-nodejs.git
```

## Initializing a wallet

Require the module:

```
var electroneumWallet = require('electroneum-rpc-nodejs');
```

Create a new instance of the wallet:

```
var Wallet = new electroneumWallet();
```

This creates a wallet using the following simplewallet default RPC settings:

* `hostname` - '127.0.0.1'
* `port` - 34569

To connect to a wallet with different settings, pass in the values:

```
var Wallet = new electroneumWallet($HOSTNAME, $PORT);
```


## Testing

Some basic tests can now be run locally to verify the library and your simplewallet instance are communicating. The tests assume simplewallet will be listening at the default config settings. Tests are run via mocha.
To run the tests, clone the repository and then:

npm install
npm test

## Example Usage

    Wallet.balance().then(function(balance) {
        console.log(balance);
    });

## Wallet Methods



### balance

Usage:

```
Wallet.balance();
```

Responds with the current balance and unlocked (spendable) balance of the wallet in atomic units. Divide by 1e2 to convert.

Example response:

```
{ balance: 1264741791908, unlocked_balance: 1264714739257 }
```

### address

Usage:

```
Wallet.address();
```

Responds with the Electroneum address of the wallet.

Example response:

```
{ address: 'etnkBd7xrtzUp1M81SvhHP5mGUWUwXsTMNtsjqaCbF7C31dTgE9vW49MgwLgySsVPpc3ErPFaeWFoA8NjoYUSZrf2yafVCGJgu' }
```

### transfer

Usage:

```
Wallet.transfer(destinations, options);
```

Transfers Monero to a single recipient OR a group of recipients in a single transaction. Responds with the transaction hash of the payment.

Parameters:

* `destinations` - an object OR an array of objects in the following format: `{amount: (*number*), address: (*string*)}`
* `options` - an object with the following properties (_optional_)
  {
  unlockTime: (_number_), // number of blocks before tx is spendable (default is 0)
  pid: (_string_) // optional payment ID (a 64 character hexadecimal string used for identifying the sender of a payment)
  payment*id: (\_string*) // optional payment ID (a 64 character hexadecimal string used for identifying the sender of a payment)
  do*not_relay: (\_boolean*) // optional boolean used to indicate whether a transaction should be relayed or not
  priority: (_integer_) // optional transaction priority
  get*tx_hex: (\_boolean*) // optional boolean used to indicate that the transaction should be returned as hex string after sending
  get*tx_key: (\_boolean*) // optional boolean used to indicate that the transaction key should be returned after sending
  }

Example response:

```
{ tx_hash: '<bb2ace539e2ed152ca8410d175efc40ef0f0193959052d55a3d79626215dce58>', tx_key: '' }
```

### transferSplit

Usage:

```
Wallet.transferSplit(destinations, options);
```

Same as `transfer`, but can split into more than one transaction if necessary. Responds with a list of transaction hashes.

Additional property available for the `options` parameter:

* `new_algorithm` - `true` to use the new transaction construction algorithm. defaults to `false`. (_boolean_)

Example response:

```
{ tx_hash_list: [ '<bb2ace539e2ed152ca8410d175efc40ef0f0193959052d55a3d79626215dce58>' ] }
```

### sweep_dust

Usage:

```
Wallet.sweep_dust();
```

Sends all dust outputs back to the wallet, to make funds easier to spend and mix. Responds with a list of the corresponding transaction hashes.

Example response:

```
{ tx_hash_list: [ '<bb2ace539e2ed152ca8410d175efc40ef0f0193959052d55a3d79626215dce58>' ] }
```

### sweep_all

Usage:

```
Wallet.sweep_all('etnkBd7xrtzUp1M81SvhHP5mGUWUwXsTMNtsjqaCbF7C31dTgE9vW49MgwLgySsVPpc3ErPFaeWFoA8NjoYUSZrf2yafVCGJgu');
```

Sends all spendable outputs to the specified address. Responds with a list of the corresponding transaction hashes.

Example response:

```
{ tx_hash_list: [ '<bb2ace539e2ed152ca8410d175efc40ef0f0193959052d55a3d79626215dce58>' ] }
```

### getPayments

Usage:

```
Wallet.getPayments(paymentID);
```

Returns a list of incoming payments using a given payment ID.

Parameters:

* `paymentID` - the payment ID to scan wallet for included transactions (_string_)

### getBulkPayments

Usage:

```
Wallet.getBulkPayments(paymentIDs, minHeight);
```

Returns a list of incoming payments using a single payment ID or a list of payment IDs from a given height.

Parameters:

* `paymentIDs` - the payment ID or list of IDs to scan wallet for (_array_)
* `minHeight` - the minimum block height to begin scanning from (example: 800000) (_number_)

### incomingTransfers

Usage:

```
Wallet.incomingTransfers(type);
```

Returns a list of incoming transfers to the wallet.

Parameters:

* `type` - accepts `"all"`: all the transfers, `"available"`: only transfers that are not yet spent, or `"unavailable"`: only transfers which have been spent (_string_)

### queryKey

Usage:

```
Wallet.queryKey(type);
```

Returns the wallet's spend key (mnemonic seed) or view private key.

Parameters:

* `type` - accepts `"mnemonic"`: the mnemonic seed for restoring the wallet, or `"view_key"`: the wallet's view key (_string_)

### integratedAddress

Usage:

```
Wallet.integratedAddress(paymentID);
```

OR:

```
Wallet.integratedAddress();
```

Make and return a new integrated address from your wallet address and a payment ID.

Parameters:

* `paymentID` - a 64 character hex string. if not provided, a random payment ID is generated. (_string_, optional)

Example response:

```
{ integrated_address: '4HCSju123guax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ96NYBVqEd6JAu9j3gk' }
```

### splitIntegrated

Usage:

```
Wallet.splitIntegrated(address);
```

Returns the standard address and payment ID corresponding to a given integrated address.

Parameters:

* `address` - an integrated Monero address (_string_)

Example response:

```
{ payment_id: '<61eec5ffd3b9cb57>',
  standard_address: 'etnkBd7xrtzUp1M81SvhHP5mGUWUwXsTMNtsjqaCbF7C31dTgE9vW49MgwLgySsVPpc3ErPFaeWFoA8NjoYUSZrf2yafVCGJgu' }
  
```

### height

Usage:

```
Wallet.height();
```

Returns the current block height of the daemon.

Parameters:

* `callback` - a callback function that responds with an error or the response data in the following order: (_error, data_)

Example response:

```
{ height: 874458 }
```

### stopWallet

Usage:

```
Wallet.stopWallet();
```

Cleanly shuts down the current simplewallet process.
