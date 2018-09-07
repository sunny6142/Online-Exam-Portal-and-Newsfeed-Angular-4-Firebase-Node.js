const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

global.cookie = params.data.cookie;

const app = express();

var players = [
    {title: "Sunny6142", description: 'Captain of the Cavaliers and'}
    
];

var translator = "";
const translate = require('google-translate-api');

translate('My Name is Sunny', {to: 'hi'}).then(res => {
    console.log(res.text);
    translator = res.text;
    //=> I speak English
   // players = res.text;
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});

// Parsers for POST data
app.use(bodyParser.json());

app.options('/api/players', cors());
app.options('/api/layers/:id', cors());

app.get('/api/players', cors(), function(req , res) {
  //  res.end(translator );
    res.end(JSON.stringify(translator) );
    //, JSON.stringify(players)
})

/**
 * Listen on provided port, on all network interfaces.
 */
var server = app.listen(8081, function(){

    var host = server.address().address;
    var port = server.address().port;

    if(!host || host === "::"){
        host = "localhost:";
    }

    console.log('API running on http://%s%s', host , port);
});

//app.listen(port, () => console.log('API running on localhost:${port}'));