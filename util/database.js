const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConect = (callback) => {
  MongoClient.connect(process.env.MONGO_STRING)
    .then((res) => {
      console.log("connected");
      _db = res.db();
      callback(res);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConect = mongoConect;
exports.getDb = getDb;
