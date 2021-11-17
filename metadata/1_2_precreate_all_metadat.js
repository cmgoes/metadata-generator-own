const fs = require("fs");

NUM_OF_NFTS = 9500;

TRAITS_IMAGES_PATH = "./images";

let allTraits = JSON.parse(fs.readFileSync("./traits.json"));

const getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

async function main() {
 
  if (fs.existsSync("./" + "metadata-all.json")) {
    console.log("metadata-all.json already exists");
    return;
  }

  let index = 1;
  let allMetadata = [];
  Object.keys(allTraits).forEach((roleName) => {
    for (let i = 0; i < allTraits[roleName]["amount"]; i++) {
      let nftMetadata = {
        name: "",
        description: "",
        image: "",
        external_url: "",
        attributes: [],
      };
      nftMetadata["name"] = "Critter #" + index;

      nftMetadata["description"] =
        "Oasis DAO membership is 10,000 unique NFTs with randomly generated rare traits and attributes. 9,500 General Member NFTs will be open to public minting, the remaining 500 role-based NFTs can only be earned through active participation and contribution to Oasis DAO.  In order to partake in decentralized governance and gain access to exclusive membership benefits, you must hold an Oasis Critters NFT.";

      nftMetadata["attributes"].push({
        trait_type: "Type",
        value: roleName,
      });

      allTraits[roleName]["orderOfLayer"].forEach((layer) => {
        let images = fs.readdirSync(
          TRAITS_IMAGES_PATH + "/" + roleName + "/" + layer
        );
        nftMetadata["attributes"].push({
          trait_type: layer,
          value: images[getRandomInt(images.length)].split(".")[0],
        });
      });

      allMetadata.push(nftMetadata);

      index++;
    }
  });

  console.log("allMetadata length: ", allMetadata.length);

  fs.writeFileSync("./metadata-all.json", JSON.stringify(allMetadata));
}

main();
