// const DungeonsAndDragons = artifacts.require("DungeonsAndDragonsCharacter");
const fs = require("fs");

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

// const metadataTemple = {
//   name: "",
//   description: "",
//   image: "",
//   attributes: [
//     {
//       trait_type: "Background",
//       value: "",
//     },
//     {
//       trait_type: "Body",
//       value: "",
//     },
//     {
//       trait_type: "Eyes",
//       value: "",
//     },
//     {
//       trait_type: "Hands",
//       value: "",
//     },
//     {
//       trait_type: "Mouth",
//       value: "",
//     },
//     {
//       trait_type: "Pot",
//       value: "",
//     },
//     {
//       trait_type: "Top",
//       value: "",
//     },
//   ],
// };
// module.exports = async callback => {
//     const dnd = await DungeonsAndDragons.deployed()
//     length = await dnd.getNumberOfCharacters()
//     index = 0
//     while (index < length) {
//         console.log('Let\'s get the overview of your character ' + index + ' of ' + length)
//         let characterMetadata = metadataTemple
//         let characterOverview = await dnd.characters(index)
//         index++
//         characterMetadata['name'] = characterOverview['name']
//         if (fs.existsSync('metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
//             console.log('test')
//             continue
//         }
//         console.log(characterMetadata['name'])
//         characterMetadata['attributes'][0]['value'] = characterOverview['strength']['words'][0]
//         characterMetadata['attributes'][1]['value'] = characterOverview['dexterity']['words'][0]
//         characterMetadata['attributes'][2]['value'] = characterOverview['constitution']['words'][0]
//         characterMetadata['attributes'][3]['value'] = characterOverview['intelligence']['words'][0]
//         characterMetadata['attributes'][4]['value'] = characterOverview['wisdom']['words'][0]
//         characterMetadata['attributes'][5]['value'] = characterOverview['charisma']['words'][0]
//         filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
//         let data = JSON.stringify(characterMetadata)
//         fs.writeFileSync(filename + '.json', data)
//     }
//     callback(dnd)
// }

const getRandomInt = function(max) {
  return Math.floor(Math.random() * max);
};

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_optionId",
        type: "uint256",
      },
      {
        name: "_toAddress",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  length = 9500;
  index = 0;
  // if (fs.existsSync('metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
  if (fs.existsSync("./" + "metadata-all.json")) {
    console.log("metadata.json already exists");
    return;
  }

  let allMetadata = [];

  while (index < length) {
    //   for (let index = 0; index < length; index++) {
    console.log("prepare the metadata for nft " + index + " of " + length);
    let characterMetadata = {
      name: "",
      description: "",
      image: "",
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

  //   filename =
  //     "metadata/" + characterMetadata["name"].toLowerCase().replace(/\s/g, "-");
  //   let data = JSON.stringify(characterMetadata);
  //   fs.writeFileSync(filename + ".json", data);

  fs.writeFileSync("./metadata-all.json", JSON.stringify(allMetadata));
}

main();
