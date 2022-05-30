var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throwerr;
  console.log("Database connected!");
  var dbo = db.db("test");
  dbo.collection("posts")
    .insertMany([{
        "title": "John",
        "author": "Semen",
        "text": "lorem",
        review: [{
          "name": "Viktor",
          "mark": "5",
          "reviewMessage": "Крутая статья емае"
        }],
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "title": "Sefgs",
        "author": "OPefh",
        "text": "lorem kofow qq;wqokeop gokgodkfig uweuryun jgksdfjpw io werijg sldfjlg ; iweori ;k sdf",
        review: [{
          "name": "Sanya",
          "mark": "10",
          "reviewMessage": "sadjijisegj sfogjkiodjgo k;o seigji sejf"
        }],
        "createdAt": new Date(),
        "updatedAt": new Date()
      }, {
        "title": "Kareem",
        "author": "https",
        "text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores sequi veritatis sunt enim blanditiis perspiciatis ipsum commodi et. Maxime ab autem earum unde consequuntur rem, accusantium vero nostrum in iusto.",
        review: [{
          "name": "ggs32g",
          "mark": "2",
          "reviewMessage": "bad"
        }],
        "createdAt": new Date(),
        "updatedAt": new Date()
      }, {
        "title": "John",
        "author": "hgdergh",
        "text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores sequi veritatis sunt enim blanditiis perspiciatis ipsum commodi et. Maxime ab autem earum unde consequuntur rem, accusantium vero nostrum in iusto.",
        review: [{
          "name": "KLjfiewf",
          "mark": "10",
          "reviewMessage": "Good"
        }],
        "createdAt": new Date(),
        "updatedAt": new Date()
      }, {
        "title": "Bsdfweh",
        "author": "Virkot",
        "text": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores sequi veritatis sunt enim blanditiis perspiciatis ipsum commodi et. Maxime ab autem earum unde consequuntur rem, accusantium vero nostrum in iusto.",
        review: [{
          "name": "fdksfpe",
          "mark": "",
          "reviewMessage": "1dfskgoskgsdlfh"
        }],
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ], function(err, res) {
      if (err) throwerr;
      console.log("Documents inserted");
      db.close();
    });
});


