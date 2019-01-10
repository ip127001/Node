const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://rohit_kumawat:cunltC77NOGz1jqS@ecommerce-rs4wl.mongodb.net/shop?retryWrites=true')
        .then(client => {
            console.log('Connected!');
            _db = client.db(); // _db database instance that we are connected to
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;