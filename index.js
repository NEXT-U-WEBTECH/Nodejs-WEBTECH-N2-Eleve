var express = require("express");

var app = express();

var router = express.Router();



router.use(function(req, res, next) {

    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    console.log("/" + req.method);

    next();
});

router.get("/", function(req, res) {

  res.send("Bonjour tout le monde");

})


app.use("/", router);

/** ******************************************************* */

app.listen(process.env.PORT || 8080, function() {
  console.log('Example app listening on port !')
})