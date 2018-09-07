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
var request= require('request');
app.use(cors({ origin: true }));

var translator = "Pls Wait";

// Parsers for POST data
app.use(bodyParser.json());

//app.options('/api', cors());
//app.options('/api/:id', cors());

app.get('/api/:text', function(req , res) {
  //  res.end(translator );
   console.log(req.params.text);
 var targetLang = 'hi';
 var sourceLang = 'auto';
 var sourceText = decodeURI(req.params.text);
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
                + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

     console.log(url);    
     
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

app.get('/payment/:text', function(req , res) {
    //  res.end(translator );
    var headers = { 'X-Api-Key': 'ff9a8d711de08e2b5e70a01d6145d620', 'X-Auth-Token': '405b84eeb5e4a05910f2f5525348866f'}
    var payload = {
      purpose: 'Student Fee',
      amount: '50',
      phone: '9169743022',
      buyer_name: 'John Doe',
      redirect_url: 'http://allexamcorner.firebaseapp.com/payment/',
      send_email: true,
      webhook: '',
      send_sms: true,
      email: 'isc2013008@iiita.ac.in',
      allow_repeated_payments: false}
    
    request.post('https://www.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
      if(!error && response.statusCode == 201){
        console.log(body);
        res.end(JSON.stringify(body));
      }else{
        console.log(error);
      }
    })

  })

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

var server = app.listen(function(){
    
        var host = server.address().address;
        var port = server.address().port;
    
        if(!host || host === "::"){
            host = "localhost:";
        }
    
        console.log('API running on http://%s%s', host , port);
    });

exports.app = functions.https.onRequest(app);
