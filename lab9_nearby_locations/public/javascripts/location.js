/**
 * Created by nuaimat on 10/12/16.
 */
var Location = {
    lat: null,
    lon: null,
    getLocation: function(){
        return {lat: this.getLat(), lon: this.getLon()};
    },
    getLat: function(){
        return this.lat;
    },
    getLon: function () {
        return this.lon;
    },
    isLocationAvailable: function(){
        return this.getLat() != null;
    },
    setLat: function(l){
        this.lat = l;
    },
    setLon: function(l){
        this.lon = l;
    }
}

var MyLocation = function () {
    var successcb = function(pos){
        console.log(pos);
        Location.lat = pos.coords.latitude;
        Location.lon = pos.coords.longitude;
    }
    var failcb = function (err) {
        console.log(err)
    }

    navigator.geolocation.getCurrentPosition(successcb, failcb);
}

MyLocation.prototype = Location;



