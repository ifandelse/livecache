var express = require('express'),
    app = express.createServer(),
    path = require("path");

app.use("/", express.static(path.resolve(__dirname)));
app.listen(1581);