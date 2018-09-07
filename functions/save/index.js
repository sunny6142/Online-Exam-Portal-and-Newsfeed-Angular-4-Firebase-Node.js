const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const translate = require('google-translate-api');
const fetch = require("node-fetch");
const app = express();

app.use(cors({ origin: true }));

var translator = "Pls Wait";




// Parsers for POST data
app.use(bodyParser.json());

//app.options('/api', cors());
//app.options('/api/:id', cors());

app.get('/api/:text', function(req , res) {
  //  res.end(translator );
   console.log(req.params.text);
 //  console.log(res);
  // res.send(JSON.stringify(req));
 //   createTranslation(response);
 var targetLang = 'hi';
 var sourceLang = 'auto';
 var sourceText = decodeURI(req.params.text);

 

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
                + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

     console.log(url);    
     
   /*  {
        console.log(json[0][0][0]);
         val = json[0][0][0];
         res.end(val);
     }*/
     
     var val = "Pls Wait";
     fetch(url)
       .then(response => {
         response.json().then(json => res.end(JSON.stringify(json)));
       })
       .catch(error => {
            res.end("Result Not Found!");
         console.log(error);
       });
})

/*
app.get('/api-cached', function(req , res) {
     res.set('Cache-Control','public, max-age=300000000, s-maxage=60000000');
    //  createTranslation();
      res.send(translator);
     // res.end(translator );
  })
 */
function createTranslation(response) {
     translate('Ik spreek Engels', {to: 'en'}).then(res => {
                console.log(res.text);
                translator = res.text;
                //=> I speak English
            // players = res.text;
                console.log(res.from.language.iso);
                response.send(translator);
             //   return JSON.parse(res.body).data;;
                //=> nl
            }).catch(err => {
                console.log("ERROR");
                console.log(err);
                console.error(err);
            });
  }
/**
 * Listen on provided port, on all network interfaces.
 */

//var host = server.address().address;
//var port = server.address().port;

var server = app.listen(function(){
    
        var host = server.address().address;
        var port = server.address().port;
    
        if(!host || host === "::"){
            host = "localhost:";
        }
    
        console.log('API running on http://%s%s', host , port);
    });
/*
app.get('/timestamp',(request, response)=>{
    response.send('${Date.now()}');
}); */

//exports.app = functions.https.onRequest(app);
  
 

exports.app = functions.https.onRequest(app);

//app.listen(port, () => console.log('API running on localhost:${port}'));