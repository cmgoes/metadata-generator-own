const fs = require("fs");
const images = require("images");

METADATA_FILE_PATH = "metadata-all.json";
NFT_IMAGES_DIR = "./images_nft";

async function main() {
  let rawdata = fs.readFileSync(METADATA_FILE_PATH);
  let allMetadata = JSON.parse(rawdata);

  allMetadata.forEach((e, i) => {
    generateNftImg(
      i,
      e.attributes[0].value,
      e.attributes[1].value,
      e.attributes[2].value,
      e.attributes[3].value,
      e.attributes[4].value,
      e.attributes[5].value,
      e.attributes[6].value
    );
  });

  console.log("Successfully genereted " + allMetadata.length + " nft images");
}

const generateNftImg = function (
  filename,
  background,
  body,
  eyes,
  hands,
  mouth,
  pot,
  top
) {
  // Background-Body-Mouth-Eyes-Top-Pot-Hand
  let backgroundImg = "./images/Cactus/Background/" + background + ".png";
  let bodyImg = "./images/Cactus/Body/" + body + ".png";
  let eyesImg = "./images/Cactus/Eyes/" + eyes + ".png";
  let handsImg = "./images/Cactus/Hands/" + hands + ".png";
  let mouthdImg = "./images/Cactus/Mouth/" + mouth + ".png";
  let potImg = "./images/Cactus/Pot/" + pot + ".png";
  let topImg = "./images/Cactus/Top/" + top + ".png";

  images(backgroundImg) //Load image from file
    // .size(400)                          //Geometric scaling the image to 400 pixels width
    .draw(images(bodyImg), 0, 0) //Drawn logo at coordinates (0,0)
    .draw(images(mouthdImg), 0, 0)
    .draw(images(eyesImg), 0, 0)
    .draw(images(topImg), 0, 0)
    .draw(images(potImg), 0, 0)
    .draw(images(handsImg), 0, 0)
    .save(NFT_IMAGES_DIR + "/" + filename + ".png", { quality: 100 }); //Save the image to a file, with the quality of 100
};

main();
