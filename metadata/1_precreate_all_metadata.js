const fs = require("fs");

NUM_OF_NFTS = 9500;

TRAITS_IMAGES_PATH = "./images";

let allTraits = JSON.parse(fs.readFileSync("./traits.json"));

const getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

async function main() {

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
        let selected_attribute = images[getRandomInt(images.length)].split(".")[0]
        if(roleName == "Cactus") {
            if (layer == "Mouth") {          
            // console.log("Before Mouth layer NFT metadata", nftMetadata["attributes"]);
            if (nftMetadata["attributes"][nftMetadata["attributes"].length-1].value == "Mystery/Ghost") {
                nftMetadata["attributes"].pop();
                nftMetadata["attributes"].pop();
                nftMetadata["attributes"].pop();
                nftMetadata["attributes"].push({
                    trait_type: "Top",
                    value: "Mystery/Ghost",
                });
                // console.log("NFT metadata", nftMetadata);
                return;            
            } else if(nftMetadata["attributes"][nftMetadata["attributes"].length-1].value == "Adventure/Mob") {
                // console.log("NFT metadata", nftMetadata);
                return;
            } else if(nftMetadata["attributes"][nftMetadata["attributes"].length-1].value == "Mystery/Mummy") {
                nftMetadata["attributes"].pop();
                nftMetadata["attributes"].pop();
                nftMetadata["attributes"].push({
                    trait_type: "Top",
                    value: "Mystery/Mummy",
                });
                // console.log("NFT metadata in Mummy case", nftMetadata["attributes"]);
                return;
            } 
            }

            if (layer == "Top") {          
            // console.log("Before Mouth layer NFT metadata", nftMetadata["attributes"]);
            if(nftMetadata["attributes"][nftMetadata["attributes"].length-1].value.includes("Adventure/")) {
                selected_attribute = "Adventure";
            }
            else if (nftMetadata["attributes"][nftMetadata["attributes"].length-1].value.includes("Comic/")) {
                selected_attribute = "Comic";                       
            } else if(nftMetadata["attributes"][nftMetadata["attributes"].length-1].value.includes("Hip hop/")) {            
                selected_attribute = "Hip hop";
            } else if(nftMetadata["attributes"][nftMetadata["attributes"].length-1].value.includes("Mystery/")) {
                selected_attribute = "Mystery";
            } 
            }

            if (layer == "Hands") {                  
                if(nftMetadata["attributes"].length == 4 || nftMetadata["attributes"].length == 5 || nftMetadata["attributes"].length == 7 && !nftMetadata["attributes"][nftMetadata["attributes"].length-2].value.includes("Adventure/")) {
                    if(selected_attribute == "Adventure") {
                        console.log("Non Adventure mismatch", nftMetadata["attributes"]);
                        selected_attribute = images[getRandomInt(images.length - 1) + 1 ].split(".")[0];
                        console.log("Updated attribute", selected_attribute);
                    }
                }            
            }
        }

        let path = TRAITS_IMAGES_PATH + "/" + roleName + "/" + layer + "/" + selected_attribute
        if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
          let images = fs.readdirSync(
            TRAITS_IMAGES_PATH + "/" + roleName + "/" + layer + "/" + selected_attribute
          );
          selected_attribute = selected_attribute + "/" + images[getRandomInt(images.length)].split(".")[0]
        }
        nftMetadata["attributes"].push({
          trait_type: layer,
          value: selected_attribute,
        });
      });

      allMetadata.push(nftMetadata);
      index++;
    }
  });

  console.log("allMetadata length: ", allMetadata.length);
  let fileName1 = "./metadata-all-" + new Date().toISOString().split(".")[0] + ".json"
  let fileName2 = "./metadata-all.json"
  fs.writeFileSync(fileName1, JSON.stringify(allMetadata));
  fs.writeFileSync(fileName2, JSON.stringify(allMetadata));
}

main();
