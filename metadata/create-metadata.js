const fs = require("fs");
const images = require("images");
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  "f34550d9a0f522650952",
  "7bf54289c43b6864285ee8a2d6dedde8a0b4a645c085fa1a1fe9bb775b0aa358"
);

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

const getRandomInt = function (max) {
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
  // if (fs.existsSync("./metadata-files")) {
  //   console.log("./metadata-files already exists");
  //   return;
  // }

  let allMetadata = [];

  while (index < length) {
    //   for (let index = 0; index < length; index++) {
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

    // filename =
    //   "metadata-files/" + characterMetadata["name"].toLowerCase().replace(/\s/g, "-");
    // let filename = "metadata-files/" + index;
    // let data = JSON.stringify(characterMetadata);

    // fs.writeFileSync(filename, data);
    // fs.writeFileSync(filename + ".json", data);

    allMetadata.push(characterMetadata);
    index++;
  }

  allMetadata.forEach((e) => {
    e.attributes[0];
  });
}

main();

const generateNftImg = function (
  background,
  body,
  eyes,
  hands,
  mouth,
  pot,
  top
) {
  // Background-Body-Mouth-Top-Pot-Hand

  let backgroundImg = "./images/Cactus/Background/Blue.png";
  let bodyImg = "./images/Cactus/Body/Dotted.png";
  let eyesImg = "./images/Cactus/Eyes/420.png";
  let handsImg = "./images/Cactus/Hands/666.png";
  let mouthdImg = "./images/Cactus/Mouth/Buck.png";
  let potImg = "./images/Cactus/Pot/Banana.png";
  let topImg = " ./images/Cactus/Top/Afro.png";

  //  fs.readFile('image.jpg', function(err, data) {
  //   if (err) throw err // Fail if the file can't be read.
  //   http.createServer(function(req, res) {
  //     res.writeHead(200, {'Content-Type': 'image/jpeg'})
  //     res.end(data) // Send the file data to the browser.
  //   }).listen(8124)
  //   console.log('Server running at http://localhost:8124/')
  // })

  images(backgroundImg) //Load image from file
    //加载图像文件
    // .size(400)                          //Geometric scaling the image to 400 pixels width
    //等比缩放图像到400像素宽
    .draw(images(bodyImg), 0, 0) //Drawn logo at coordinates (10,10)
    //在(10,10)处绘制Logo
    .save("output.jpg", {
      //Save the image to a file, with the quality of 50
      quality: 100, //保存图片到文件,图片质量为50
    });
};

generateNftImg();

pinata
  .testAuthentication()
  .then((result) => {
    //handle successful authentication here
    console.log(result);
  })
  .catch((err) => {
    //handle error here
    console.log(err);
  });

// pinataTest();

const uploadFilesToIFPS = function (filePath) {
  const sourcePath = filePath;
  const options = {
    pinataMetadata: {
      name: "metadata-files",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  pinata
    .pinFromFS(sourcePath, options)
    .then((result) => {
      //handle results here
      console.log(result);
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });
};
