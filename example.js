var moneroWallet = require('./lib/wallet');
var Wallet = new moneroWallet();

// examples

Wallet.create_wallet('electroneum_wallet').then(function(result){
    console.log(result);
});

Wallet.open_wallet('electroneum_wallet').then((result) => {
    console.log(result);
});

Wallet.address().then((result) => {
    console.log(result);
});

Wallet.balance().then((result) => {
    console.log(result);
});
