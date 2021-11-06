## This is the smart contracts for Oasis DAO NFT
-----


# Requirements
## System requirement
Ubuntu

## Node version (12.18.x is required)
Either make sure you're running a version of node compliant with the `engines` requirement in `package.json`, or install Node Version Manager [`nvm`](https://github.com/creationix/nvm) and run `nvm use` to use the correct version of node.


# Installation

Run

```bash
yarn
```
If you run into an error while building the dependencies and you're on a Mac, run the code below, remove your `node_modules` folder, and do a fresh `yarn install`:

```bash
xcode-select --install # Install Command Line Tools if you haven't already.
sudo xcode-select --switch /Library/Developer/CommandLineTools # Enable command line tools
sudo npm explore npm -g -- npm install node-gyp@latest # Update node-gyp
```

# Store metadata onto IPFS
``` bash
node metadata/create-metadata.js
```

# Smart contracts deployment
## Rinkeby testnet
1. Follow the steps above to get a Rinkeby node API key
2. Using your API key and the mnemonic for your MetaMask wallet (make sure you're using a MetaMask seed phrase that you're comfortable using for testing purposes), run:

```
export ALCHEMY_KEY="<alchemy_project_id>" # or you can use INFURA_KEY
export MNEMONIC="<metmask_mnemonic>"
DEPLOY_ACCESSORIES_SALE=1 yarn truffle migrate --network rinkeby
```

## Ethereum mainnet
Make sure your wallet has at least a few dollars worth of ETH in it. Then run:

```
yarn truffle migrate --network live
```

Look for your newly deployed contract address in the logs!


# Mint NFTs

```
export OWNER_ADDRESS="<my_address>"
export NFT_CONTRACT_ADDRESS="<deployed_contract_address>"
export FACTORY_CONTRACT_ADDRESS="<deployed_factory_contract_address>"
export NETWORK="rinkeby"
node scripts/mint.js
```

# Testing
