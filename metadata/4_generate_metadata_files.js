const fs = require("fs");

METADATA_FILE_PATH = "metadata-all.json";
// NFT_IMAGES_IPFS_HASH = "";
// NFT_IMAGES_BASE_URL = "https://gateway.pinata.cloud/ipfs/"; // pinata base url
NFT_IMAGES_BASE_URL = "https://ipfs.io/ipfs/"; // ipsf base url

async function main() {
  var myArgs = process.argv.slice(2);
  if (myArgs.length !== 1) {
    console.log("please pass nft images ipfs hash!");
    return;
  }

  NFT_IMAGES_IPFS_HASH = myArgs[0];

  let rawdata = fs.readFileSync(METADATA_FILE_PATH);
  let allMetadata = JSON.parse(rawdata);

  allMetadata.forEach((e, i) => {
    e.image = NFT_IMAGES_BASE_URL + NFT_IMAGES_IPFS_HASH + "/" + i + ".png";

    let filename = "metadata-files/" + i;
    let data = JSON.stringify(e);
    fs.writeFileSync(filename + ".json", data);
  });

  console.log(allMetadata[0]);
  console.log(allMetadata[1]);

  console.log(
    "Sucessfully generated " + allMetadata.length + " metadata files"
  );
}

main();
