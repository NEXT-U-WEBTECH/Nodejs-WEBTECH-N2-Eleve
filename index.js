var express = require("express");

var app = express();

var router = express.Router();

var fs = require('fs')

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/** ************************************************* */

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/node_modules'));

/** ************************************************* */

// Import events module
var events = require('events');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

/** ************************************************* */

// view engine setup

var swig = require('swig');

app.set('views', __dirname + '/views');

var swig = new swig.Swig();

app.engine('html', swig.renderFile);

app.set('view engine', 'html');



/** ************************************************ */


router.use(function(req, res, next) {

    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    

 
   //  const responseString = `Full URL is: ${fullUrl}`; 
  //   console.log(responseString)

     console.log("/" + req.method);

  next();
});

/** ********************************************************************** */

// Create an event handler as follows
var connectHandler = function connected(objectEvent) {
   console.log(objectEvent);
  
   // Fire the data_received event 
   // eventEmitter.emit('data_received');
}

// Bind the connection event with the handler
eventEmitter.on('event', connectHandler);




/** ********************************************************************* */

router.get("/", function(req, res) {

  res.send("Hello word");

})

router.get("/backend-gestion", function(req, res) {

  var nbr_profs = 0

  fs.readFile(__dirname + '/public/data/data.json', 'utf8', function(err, data_json) {

    data = JSON.parse(data_json);

    nbr_profs = data["data_profs"].length

    console.log(nbr_profs)

  })

  res.render('index', { title: '', nbr_profs: nbr_profs });

})


router.get("/listing_profs", function(req, res) {

  const objectEvent = {nomEvent: 'listing_profs', dateEvent: new Date()}

  eventEmitter.emit('event', objectEvent);

  fs.readFile(__dirname + '/public/data/data.json', 'utf8', function(err, data_json) {

    const data = JSON.parse(data_json);

    console.log(data["data_profs"])

    const profs = data["data_profs"]

    res.render('listing_profs', { title: '', profs: profs });

  })

})


router.get("/display_fiche_prof/:idProf", function(req, res) {

  const objectEvent = {nomEvent: 'display_fiche_prof', dateEvent: new Date()}

  eventEmitter.emit('event', objectEvent);

  fs.readFile(__dirname + '/public/data/data.json', 'utf8', function(err, data_json) {
     
   
   /* const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;

      const fullUrl = `${protocol}://${host}${url}`

    const fullUrl = `${protocol}://${host}`*/

    const data = JSON.parse(data_json);

    // console.log(data["data_profs"])
    
     console.log('req.params.idProf = ', req.params.idProf)

   const filtreProf = data["data_profs"].filter(objectProf => {
              return objectProf.id === parseInt(req.params.idProf);   });

    console.log(filtreProf)
  

    res.render('display_fiche_prof', { title: '', objectProf: filtreProf[0] });

  })

})

router.get("/add_fiche_prof", function(req, res) {
  
  res.render('add_fiche_prof', { title: ''});

})

router.post("/add_fiche_prof", urlencodedParser, function(req, res) {


  const objectEvent = {nomEvent: 'add_fiche_prof', dateEvent: new Date()}

  eventEmitter.emit('event', objectEvent);

 const nom = req.body.nom
 const prenom = req.body.prenom
 const datepicker = req.body.datepicker

  console.log('nom = ', nom)
  console.log('prenom =', prenom)
  console.log('datepicker =', datepicker)
  
   fs.readFile(__dirname + '/public/data/data.json', 'utf8', function(err, data_json) {

    const data = JSON.parse(data_json);   

    console.log(data["data_profs"])

    const id_prof = data["data_profs"].length +1 

     const objectDataProf = {id: id_prof, nom : nom, prenom, date_creation_profil : datepicker }   

     data["data_profs"].push(objectDataProf)   

     	const dataStringify = JSON.stringify(data);

			fs.writeFileSync(__dirname + '/public/data/data.json',dataStringify);  

     res.redirect('/listing_profs');

  })

})

router.get("/delete_fiche_prof/:idProf", function(req, res) {

  
  const objectEvent = {nomEvent: 'delete_fiche_prof', dateEvent: new Date()}

  eventEmitter.emit('event', objectEvent);

  
  fs.readFile(__dirname + '/public/data/data.json', 'utf8', function(err, data_json) {    


    const data = JSON.parse(data_json);

    // console.log(data["data_profs"])
    
   console.log('req.params.idProf = ', req.params.idProf)

   const filtreProf = data["data_profs"].filter(objectProf => {
              return objectProf.id != parseInt(req.params.idProf);   });

    data["data_profs"] = filtreProf   

   	const dataStringify = JSON.stringify(data);

		fs.writeFileSync(__dirname + '/public/data/data.json',dataStringify);   
  
    res.redirect('/listing_profs');

  })
})


router.get("/listing_salles", function(req, res) {

})

router.get("/listing_matieres", function(req, res) {

 

})

app.use("/", router);

/** ******************************************************* */

app.listen(process.env.PORT || 8080, function() {
  console.log('Example app listening on port !')
})