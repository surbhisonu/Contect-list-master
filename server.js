var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('contactlist',['contactlist']);
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/contactlist',function(req,res) {
  db.contactlist.find(function(err, docs) {
      res.json(docs);
      console.log(docs);
  });
});

app.post('/contactlist', function(req, res){
  db.contactlist.insert(req.body, function(req, docs){
    res.json(docs);
  });
});

app.delete('/contactlist/:id',function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc) {
      res.json(doc);
      console.log(doc);
  })
});

app.get('/contactlist/:id',function(req, res) {
  var id = req.params.id;
  db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc) {
      res.json(doc);
  });
});

app.put('/contactlist/:id',function(req,res){
  var id = req.params.id;
  console.log(id);
  console.log(req.body.name);
  console.log("item update");
  db.contactlist.findAndModify({Query: {_id:id},
    update: {$set: {name:req.body.name, email:req.body.email,number: req.body.number}}, new: true},function(err, doc) {
      res.json(doc);
      console.log(doc);

  });
});

app.listen(3000);
console.log("runung 3000");
