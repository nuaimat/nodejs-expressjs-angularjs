var express = require('express');
var router = express.Router();

/* GET add point of interest page. */
router.get('/', function(req, res, next) {
    console.log(res.locals.config.poi_categories);
    res.render('poi', { title: 'Points of interest', poi_types: res.locals.config.poi_categories });
});

// don't forget
// db.poi.createIndex({"location": "2d"});

router.post('/add',function(req, res, next) {
    console.log(req.body);
    let poi = {name: req.body.name, category: req.body.category, location: [parseFloat(req.body.lon), parseFloat(req.body.lat)]};
    res.db.collection("poi").insertOne(poi, (err, doc) => {
        if(err) throw err;
        res.status(201).json({"id": doc.ops[0]._id});
    });
});


router.get('/around', function(req, res, next) {
    let currentLocation = [parseFloat(req.query.lon), parseFloat(req.query.lat)];
    let limit = parseInt(req.query.limit);
    let category = req.query.category;

    var filter = {"location": {$near: currentLocation}};
    if(category != '*'){
        filter = {"location": {$near: currentLocation}, "category": category};
    }

    console.log("currentLocation: " + currentLocation);
    var records = res.db.collection("poi").find(
        filter,
        {name: 1,"category": 1,"location": 1, "_id": 0});
    if(limit != -1){
        records = records.limit(limit);
    }


    records.toArray((err, pois) => {
        if(err) throw  err;
        console.log(pois);
        res.header("Content-Type", "application/json");
        res.end(JSON.stringify(pois));
    });
});
module.exports = router;
