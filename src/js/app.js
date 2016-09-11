var hue = require("node-hue-api");

var Trafficlight = function () {
    this.trigger = $(".trafficlight");

    this._init();
    this.bindEvents();
  }

Trafficlight.prototype._init = function() {
    HueApi = hue.HueApi,
    lightState = hue.lightState;
    this.hostname = "169.254.8.238",
    this.username = "r1JXe-n8dCEIuZOUmAOukynlmwE4rKhYLyUz-Df0",
    api = new HueApi(this.hostname, this.username),
    state = lightState.create();

    this.red = 3;
    this.green = 4;

    this.simulation = {
        '3': $("#redlight"),
        '4': $('#greenlight')
    };
};

Trafficlight.prototype.debug = function(err) {
    api.config().then(this.displayResult).done();

    api.lights()
        .then(this.displayResult)
        .done();
};


Trafficlight.prototype.displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

Trafficlight.prototype.displayStatus = function(status) {
    console.log(JSON.stringify(status, null, 2));
};

Trafficlight.prototype.displayError = function(err) {
    console.error(err);
};

Trafficlight.prototype.getStatus = function(light) {
    api.lightStatus(red)
        .then(this.displayStatus)
        .done();
};

Trafficlight.prototype.resetLights = function() {
    this.simulate(this.red, false);
    this.simulate(this.green, false);

    api.setGroupLightState(0, state.off())
        .then(this.displayResult)
        .fail(this.displayError)
        .done();
};

Trafficlight.prototype.bindEvents = function(status) {
    var self = this;
    this.trigger.on("click", function(){
        var id =        $(this).data('light-id'),
            action =    $(this).data('light-action');

        if( id != 0 && action != 'off'  ){
            if(action == 'toggle'){
                self.lightToggle(id);
            } else if( action == 'both') {
                self.groupToggle();
            } else {
                self.lightOn(id);
            }
        } else {
            console.log('off');
            self.resetLights();
        }
    })
};

Trafficlight.prototype.simulate = function(id, action) {
    if(action){
        this.simulation[id].addClass('is-active');
    } else {
        this.simulation[id].removeClass('is-active');
    }
};

Trafficlight.prototype.lightOn = function(id) {
    this.simulate(id, true);
    api.setLightState(id, state.on())
        .then(this.displayResult)
        .fail(this.displayError)
        .done();
};

Trafficlight.prototype.lightOff = function(id) {
    this.simulate(id, false);
    api.setLightState(id, state.off())
        .then(this.displayResult)
        .fail(this.displayError)
        .done();
};

Trafficlight.prototype.lightToggle = function(id) {
    var self = this;

    api.lightStatus(id, function(err, result) {
        if (err) throw err;

        if( result.state.on ){
            self.lightOff(id)
        } else {
            self.lightOn(id);
        }
    });
};

Trafficlight.prototype.groupToggle = function() {
    var self = this;

    api.lightStatus(this.red, function(err, red) {
        if (err) throw err;

        if( red.state.on ){
            self.lightOff(self.red);
            self.lightOn(self.green);
        } else {
            self.lightOn(self.red);
            self.lightOff(self.green);
        }
    });
};


new Trafficlight();
