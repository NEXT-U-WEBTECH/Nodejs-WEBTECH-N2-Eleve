var express = require("express");

var fs = require('fs')

var app = express();

var router = express.Router();

/**************************************************** */

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/** ************************************************* */

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/node_modules'));

/** ************************************************* */

// view engine setup

var swig = require('swig');

app.set('views', __dirname + '/views');

var swig = new swig.Swig();

app.engine('html', swig.renderFile);

app.set('view engine', 'html');

/************************************************************** */

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

router.get("/backend-gestion", function(req, res) {

  var nbr_profs  = 0;

    // recuperer le nombre de  profs depuis le fichier data.json
    res.render('index', { title: '', nbr_profs: nbr_profs });
})

/*********************** Gestion intervenants ************************** */

router.get("/listing_profs", function(req, res) {

  var  profs = [];

    // recuperer la liste des profs depuis le fichier data.json
    res.render('index', { title: '', profs: profs });
})


router.get("/display_fiche_prof/:idProf", function(req, res) {})

router.get("/add_fiche_prof", function(req, res) {})

router.post("/add_fiche_prof", urlencodedParser, function(req, res) {})

/*********************** Gestion Salles ************************** */

router.get("/listing_salles", function(req, res) {})

router.get("/display_fiche_salle/:idSalle", function(req, res) {})

router.get("/add_fiche_salle", function(req, res) {})

router.post("/add_fiche_salle", urlencodedParser, function(req, res) {})

/*********************** Gestion Matiere ************************** */

router.get("/listing_matieres", function(req, res) {})

router.get("/display_fiche_matiere/:idMatiere", function(req, res) {})

router.get("/add_fiche_matiere", function(req, res) {})

router.post("/add_fiche_matiere", urlencodedParser, function(req, res) {})

/*********************** Gestion cours ************************** */

router.get("/gestion_cours", function(req, res) {})

router.get("/display_fiche_cours/:idCours", function(req, res) {})

router.get("/add_fiche_cours", function(req, res) {})

router.post("/add_fiche_cours", urlencodedParser, function(req, res) {})


app.use("/", router);

/** ******************************************************* */

app.listen(process.env.PORT || 8080, function() {
  console.log('Example app listening on port !')
})