import fs from "fs";
import Jimp from "jimp";

 export async function filterImageFromURL(inputURL) {
  return new Promise(async (resolve, reject) => {
    try {
      if(!inputURL) {
        resolve({
          status: 0,
          error: "Dont have any img link, please give for me a url!!"
        });
        return
      }

      const photo = await Jimp.read(inputURL);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) 
        .quality(60) 
        .greyscale() 
        .write(outpath, (img) => {
          resolve({
            status: 200,
            info: "We have a good url: " + inputURL
          });
        });
    } catch (error) {
      resolve({
        status: 0,
        error: "Can read this url, please try orther url image, thanks !!"
      });
    }
  });
}

 export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
