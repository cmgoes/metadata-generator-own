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

```bash
export INFURA_KEY="9aa3d95b3bc440fa88ea12eaa4456161" # or you can use ALCHEMY_KEY, run: export ALCHEMY_KEY="<alchemy_project_id>"
export MNEMONIC="<metmask_mnemonic>" # 12 recovery phrases of your address
DEPLOY_CREATURES=1 yarn truffle migrate --network rinkeby
```

## Ethereum mainnet
Make sure your wallet has at least a few dollars worth of ETH in it. Then run:

```bash
yarn truffle migrate --network live
```

Look for your newly deployed contract address in the logs!


# How to mint NFTs

```bash
export INFURA_KEY="9aa3d95b3bc440fa88ea12eaa4456161" # or you can use ALCHEMY_KEY, run: export ALCHEMY_KEY="<alchemy_project_id>"
export MNEMONIC="<metmask_mnemonic>" # 12 recovery phrases of your address
export OWNER_ADDRESS="<my_address>" # the address to pay gas fee and receive the NFT
export NFT_CONTRACT_ADDRESS="<deployed_contract_address>" # currently the nft contract address on rinkeby testnet is 0x220486d3701634215D366D297087E11366C8A05e
export NETWORK="rinkeby"

# Before run this command, make sure dependencies are installed. if not run: `yarn `
node scripts/mint_nft.js
```

# Testing
TDB