const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use("/api", require("./route"));



app.listen(3000, function() {
    console.log("Port running on port 3000");
})