const pinataSDK = require("@pinata/sdk");
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_KEY;
const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

NFT_IMAGES_DIR = "./images_nft";

async function main() {
  await pinataConnectionTest();

  let imgDirHash = await uploadFilesToIFPS(NFT_IMAGES_DIR, "nft_images");
  if (imgDirHash.length > 0) {
    console.log("Successfully uploaded nft images to IPFS");
    console.log("imgDirHash: ");
    console.log(imgDirHash);
  } else {
    console.log("failed to upload nft images");
  }
}

// test pinata connection
const pinataConnectionTest = function () {
  return pinata
    .testAuthentication()
    .then((result) => {
      //handle successful authentication here
      console.log(result);
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });
};

const uploadFilesToIFPS = async function (filePath, ipfs_file_name) {
  const sourcePath = filePath;
  const options = {
    pinataMetadata: {
      name: ipfs_file_name,
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  return pinata
    .pinFromFS(sourcePath, options)
    .then((result) => {
      //handle results here
      console.log(result);
      return result["IpfsHash"];
    })
    .catch((err) => {
      //handle error here
      console.log("upload file error: ");
      console.log(err);
      return "";
    });
};

main();
