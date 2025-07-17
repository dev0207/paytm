const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors()); // cors middleware
app.use(express.json()); // body-parser middleware
const mainRouter = require("./routes/index.js");

app.use("/api/v1", mainRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});