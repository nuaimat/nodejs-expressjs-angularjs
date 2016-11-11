var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');

/* GET contact_us page. */
router.get('/', function(req, res, next) {
  res.render('contact_us', { title: 'Contact Us'});
});

router.post('/', function(req, res, next) {
    req.checkBody('name', 'Invalid name').notEmpty().isAlpha();
    req.checkBody('type', 'Invalid message type').notEmpty().belongsToList(["suggestion", "complaint"]);
    req.checkBody('message', 'Invalid message').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.locals.name = req.body.name;
        res.locals.message = req.body.message;
        res.locals.type = req.body.type;

        var errorsByKey = [];
        errors.map(function(e){
            if(!errorsByKey[e.param]) {
                errorsByKey[e.param] = [];
            }
            errorsByKey[e.param] = e;
        });
        console.log("errorsByKey: ");
        console.log(errorsByKey);

        res.render('contact_us', { title: 'Contact Us', errorsByKey: errorsByKey});
        return;
    }



    // remove unneeded csrf token
    delete req.body._csrf;
    let jsonString = JSON.stringify(req.body);
    var appendToFilePromise = function(postFileName){
        return new Promise(function(resolve, reject){
            fs.appendFile(postFileName, jsonString + "\n", (err) => {err==null?resolve():reject(err)})
        });
    }
    
    res.render('thank_you', { title: 'Thank you!', message: 'Thank you for contacting Us, we\'ll get back to you shortly'});
    
    appendToFilePromise("output.json")
        .catch((err) => {console.log("Error while writing to file: " + err);});
});


module.exports = router;
