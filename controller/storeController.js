const homeModel = require("../models/home");
const favourateModel = require("../models/favourate");

exports.getHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home",
    activePage: "add-Home",
  });
};

exports.home = (req, res, next) => {
  homeModel
    .fatchAll()
    .then(([rows]) => {
      console.log(rows, "hi this is home");
      res.render("store/airbnb", {
        registorHome: rows,
        pageTitle: "home",
        activePage: "home",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.bookings = (req, res, next) => {
  res.render("./store/bookings", {
    pageTitle: "Bookings",
    activePage: "bookings",
  });
};
exports.homeDetails = (req, res, next) => {
  const id = req.params.homeId;
  console.log("home prams : ", id);
  homeModel.findById(id, (home) => {
    if (!home) {
      console.log("home is not found");
      res.redirect("/home-list");
    } else {
      console.log("home is found : ", home);
      res.render("./store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        activePage: "home-details",
      });
    }
  });
};
exports.addToFavourate = (req, res, next) => {
  favourateModel.addToFavourateController(req.body.postId, (err) => {
    console.log(err);
  });
  res.redirect("/favourate");
};
exports.postRemoveHome = (req, res, next) => {
  const id = req.params.homeId;
  favourateModel.removeFaourate(id, (err) => {
    err && console.log("error while removine from favourate", err);
    res.redirect("/favourate");
  });
};
exports.favourate = (req, res, next) => {
  favourateModel.getFavoraties((homeIds) => {
    console.log("favorurai ids", homeIds);

    homeModel.fatchAll().then(([allHomes]) => {
      console.log(allHomes);
      const homeListInFavourate = homeIds.map((ids) =>
        allHomes.find((home) => String(home.id) === ids),
      );
      res.render("store/favourate", {
        registorHome: homeListInFavourate,
        pageTitle: "Favorate",
        activePage: "favourate",
      });
    });
  });
};

exports.homeList = (req, res, next) => {
  homeModel.fatchAll().then(([registorHome]) => {
    res.render("store/homeList", {
      registorHome: registorHome,
      pageTitle: "home List",
      activePage: "homeList",
    });
  });
};
