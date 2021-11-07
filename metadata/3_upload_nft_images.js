const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  "f34550d9a0f522650952",
  "7bf54289c43b6864285ee8a2d6dedde8a0b4a645c085fa1a1fe9bb775b0aa358"
);

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
