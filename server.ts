import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util.js";

const errorCustom = "Dont have any img link, please give for me a url!!";
// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send(
    "try GET /filteredimage?image_url=https://mcdn.coolmate.me/image/October2023/nhan-vat-doraemon-3012_329.jpg"
  );
});

app.get("/filteredimage", async (req, res) => {
  const image_url: string = req.query.image_url;

  if (!image_url) {
    return new Promise((resolve) => {
      resolve({
        status: 0,
        error: errorCustom,
      });
    });
  } else {
    await filterImageFromURL(image_url)
      .then(function (image_filtered_path) {
        res.sendFile(image_filtered_path, () => {
          deleteLocalFiles([image_filtered_path]);
        });
      })
      .catch(function (err) {
        res.status(400).send("Please make sure that the image url is valid!");
      });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
