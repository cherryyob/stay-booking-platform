const favourateModel = require("../models/favourate");

////////////////////////////////////////////////////////////////
const db = require("../utils/databaseUtil");

module.exports = class homeModel {
  constructor(id, homeName, price, location, rating, photo, description) {
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
    this.description = description;
    this.id = id;
  }
  save() {
    if (this.id) {
      db.execute(
        "update homes set houseName=?,price= ?, location=?,rating=?,photo=?,discription=? where id =?",
        [
          this.homeName,
          this.price,
          this.location,
          this.rating,
          this.photo,
          this.description,
          this.id,
        ],
      ).then((err) => {
        console.log("erroro while upadata data :: ", err);
      });
    } else {
      return db.execute(
        "insert into homes (houseName,price,location,rating,photo,discription) values(?,?,?,?,?,?)",
        [
          this.homeName,
          this.price,
          this.location,
          this.rating,
          this.photo,
          this.description,
        ],
      );
    }
  }
  ////////////////////////////////////////////

  static fatchAll(callback) {
    return db.execute("SELECT * FROM homes");
  }

  static deletePost(homeId, callback) {
    db.execute("delete from homes where id =?", [homeId]).then(callback);
    console.log("delete hoe");
  }
  static findById(id, callback) {
    this.fatchAll().then(([registerHome]) => {
      const home = registerHome.find((home) => String(home.id) === id);
      console.log("home findById : ", registerHome);

      console.log("home findById : ", home);
      callback(home);
    });
  }
};
