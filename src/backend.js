const express = require("express");
const app = express();

const cors = require("cors");

const PORT = process.env.PORT || 3001;

const whitelist = ["http://localhost:3000"];
const cors_options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Cors not allowed"), false);
    }
  },
};

app.use(cors(cors_options));
app.use(express.json());

app.post("/send_mail", (req, res) => {
  console.log("sending mail");
  console.log(req.body.data);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
