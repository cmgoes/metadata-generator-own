// const DungeonsAndDragons = artifacts.require("DungeonsAndDragonsCharacter");
const fs = require("fs");

NUM_OF_NFTS = 9500;

let opts_Background = ["Blue", "Brick", "Brown", "Desert", "Oasis", "Purple"];
let opts_Body = [
  "Dotted",
  "Earth",
  "Hamburger",
  "Light",
  "Normal",
  "Pink",
  "Sausage",
  "Strawberry",
  "Tree",
  "Yellow",
];
let opts_Eyes = [
  "420",
  "Dizzy",
  "Fury",
  "Mike",
  "Normal",
  "Sleepy",
  "Thinkin",
  "Wink",
  "xx",
];
let opts_Hands = ["666", "Gauntlet", "Joint", "OK", "Peace", "Sponge Glove"];
let opts_Mouth = [
  "Buck",
  "Cavities",
  "Mustache",
  "Naughty",
  "Normal",
  "Pzzz",
  "Rainbow",
  "SausageLips",
  "UWU",
  "Wrinkle",
  "Yell",
  "Yummy",
];
let opts_Pot = [
  "Banana",
  "Basic",
  "GreyMug",
  "IceCream",
  "PurplePot",
  "TheBox",
  "WhiteMug",
];
let opts_Top = [
  "Afro",
  "Axe",
  "Babushka",
  "BrokenHalo",
  "Cap",
  "CherryBomb",
  "Cowboy",
  "GobbleGobble",
  "HelloKacti",
  "Link",
  "Mob",
  "Mummy",
  "OasisChain",
  "Playboy",
  "Scarf",
  "SunGlasses",
];

const getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

async function main() {
  let length = NUM_OF_NFTS;
  let index = 0;
  if (fs.existsSync("./" + "metadata-all.json")) {
    console.log("metadata.json already exists");
    return;
  }

  let allMetadata = [];
  while (index < NUM_OF_NFTS) {
    console.log("prepare the metadata for nft " + index + " of " + length);

    let characterMetadata = {
      name: "",
      description: "",
      image: "",
      external_url: "",
      attributes: [
        {
          trait_type: "Background",
          value: "",
        },
        {
          trait_type: "Body",
          value: "",
        },
        {
          trait_type: "Eyes",
          value: "",
        },
        {
          trait_type: "Hands",
          value: "",
        },
        {
          trait_type: "Mouth",
          value: "",
        },
        {
          trait_type: "Pot",
          value: "",
        },
        {
          trait_type: "Top",
          value: "",
        },
      ],
    };

    characterMetadata["name"] = "Cactus " + index;
    console.log(characterMetadata["name"]);
    characterMetadata["description"] = "Oasis DAO NFT No." + index;
    console.log(characterMetadata["description"]);

    characterMetadata["attributes"][0]["value"] =
      opts_Background[getRandomInt(opts_Background.length)];
    characterMetadata["attributes"][1]["value"] =
      opts_Body[getRandomInt(opts_Body.length)];
    characterMetadata["attributes"][2]["value"] =
      opts_Eyes[getRandomInt(opts_Eyes.length)];
    characterMetadata["attributes"][3]["value"] =
      opts_Hands[getRandomInt(opts_Hands.length)];
    characterMetadata["attributes"][4]["value"] =
      opts_Mouth[getRandomInt(opts_Mouth.length)];
    characterMetadata["attributes"][5]["value"] =
      opts_Pot[getRandomInt(opts_Pot.length)];
    characterMetadata["attributes"][6]["value"] =
      opts_Top[getRandomInt(opts_Top.length)];

    allMetadata.push(characterMetadata);
    index++;
  }

  console.log("allMetadata length: ", allMetadata.length);

  fs.writeFileSync("./metadata-all.json", JSON.stringify(allMetadata));
}

main();
