//Lets require/import the HTTP module
var http = require('http');
var hue = require("node-hue-api");

//Lets define a port we want to listen to
const PORT=8080;
const hostname = '192.168.3.88';
const username = "yihfLIhO66WQ1eittuR99CDuMlOS9MzCdNVGtCq9";

//Hue api init
const HueApi = hue.HueApi;
const api = new HueApi(hostname, username);
const lightState = hue.lightState;
const state = lightState.create().on();

//define lights
const red = 1;
const green = 2;


//We need a function which handles requests and send response
function handleRequest(req, res){
    if (req.method == 'POST') {
        whole = ''
        req.on('data', (chunk) => {
            whole += chunk.toString()
        })

        req.on('end', () => {
            var body = JSON.parse(whole);
            trafficlight(body.object_attributes.status);
            res.writeHead(200, 'OK', {'Content-Type': 'text/html'})
            res.end('Data received.')
        })
    }
}

function trafficlight(status) {
    if (status == 'success') {
        api.setLightState(green, state.on().bri(254))
            .then(this.displayResult)
            .fail(this.displayError)
            .done();

        api.setLightState(red, state.off())
            .then(this.displayResult)
            .fail(this.displayError)
            .done();
    } else if ( status == 'failed') {

        api.setLightState(green, state.off())
            .then(this.displayResult)
            .fail(this.displayError)
            .done();

        api.setLightState(red, state.on().bri(254))
            .then(this.displayResult)
            .fail(this.displayError)
            .done();
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://0.0.0.0:%s", PORT);
});
