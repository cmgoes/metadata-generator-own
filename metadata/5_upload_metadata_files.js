const pinataSDK = require("@pinata/sdk");
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;
const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

async function main() {
  await pinataConnectionTest();

  let metadataDirHash = await uploadFilesToIFPS(
    "./metadata-files",
    "metadata_files"
  );
  if (metadataDirHash > 0) {
    console.log("The metadata hash on IPFS is: " + metadataDirHash);
  } else {
    console.log("failed to upload metadata files");
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
