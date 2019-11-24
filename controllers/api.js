const Mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/students";

var ObjectId = require('mongodb').ObjectID;

console.log("In api.js");

exports.get_data = (req, res) => {
    
    Mongo.connect(url,function (err, db) {
        if (err) throw err;
        db.collection(req.params.table_name).find().toArray(function (err, data) {
            if (err) throw err;
            res.status(200).send(data);
        });
    });
}

exports.post_data = (req, res) => {
    console.log(req.body);
    Mongo.connect(url, (err, db) => {
        if (err) throw err;
        db.collection(req.params.table_name).insertMany(req.body, (error, data) => {
            if (error) throw error;
            res.status(200).send(data)
        });
    });
}

exports.put_data = (req, res) => {
    
    if (req.query._id) {
        req.query._id = ObjectId(req.query._id)
    }
    Mongo.connect(url, (err, db) => {
        if (err) throw err;
        db.collection(req.params.table_name).updateMany(req.query, { $set: req.body} , (error, data) => {
            if (error) throw error;
            res.status(200).send(data)
        })
    })
}

exports.delete_data = (req, res) => {

    var obj = {}

    if (req.query._id) {
        if (req.query._id.includes(',')) {
            obj = {
                _id: {
                    $in: []
                }
            }
            var arr = req.query._id.split(',');
            for (var i in arr) {
                obj._id.$in.push(ObjectId(arr[i]))
                console.log(ObjectId(arr[i]))
            }
        } else {
            obj = {
                _id : ObjectId(req.query._id)
            }
        }
        
    } else {
        obj = req.query
    }

    console.log(obj);

    Mongo.connect(url, (err, db) => {
        if (err) throw err;
        db.collection(req.params.table_name).deleteMany(obj, (error, data) => {
            if (error) throw error;
            res.status(200).send(data)
        });
    })
}