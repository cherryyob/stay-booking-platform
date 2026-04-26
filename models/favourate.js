const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const { deleteFavourateById } = require("./home");

const favourateDataPath = path.join(rootDir, "data", "favourate.json");

module.exports = class Favourate {
  static removeFaourate(id, callback) {
    this.getFavoraties((data) => {
      const newFavourateList = data.filter((item) => id !== item);
      fs.writeFile(
        favourateDataPath,
        JSON.stringify(newFavourateList),
        callback,
      );
    });
  }
  static addToFavourateController = (homeId, callback) => {
    this.getFavoraties((data) => {
      if (data.includes(homeId)) {
        console.log("this home id is all ready mark : ", homeId);
      } else {
        data.push(homeId);
        fs.writeFile(favourateDataPath, JSON.stringify(data), (err) => {
          callback(err);
        });
      }
    });
  };
  static getFavoraties = (callback) => {
    fs.readFile(favourateDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  };
  static deleteFavourateById(id) {
    this.getFavoraties((favourateList) => {
      const newFavourateList = favourateList.filter(
        (favourate) => favourate !== id,
      );

      fs.writeFile(favourateDataPath, JSON.stringify(newFavourateList), (err) =>
        console.log("note save in favorate list after host delete : ", err),
      );
    });
  }
};
