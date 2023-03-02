const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

class User {
  constructor(name, email, _id) {
    this.name = name;
    this.email = email;
    this._id = new mongoDb.ObjectId(_id);
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      // Update the User
      dbOp = db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("users").insertOne(this);
    }

    return dbOp
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findUserById(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongoDb.ObjectId(id) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
