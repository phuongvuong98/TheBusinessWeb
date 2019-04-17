const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

// Tao middleware cho user khi da start thanh cong SERVER voi PORT
app.use((req, res, next) => {
  User.findById("5cb2c8a566c9490c21f88eac")
    .then(user => {
      // gan user(tu DB) cho req.user de luu user(mac dinh underfiled trong req)
      // no chi co thuoc tinh, ko co cac method cua user.
      //req.user = user;
      // nen de dung het cac method cua user trong db tao moi NEW USER
      req.user = user;
      // chuyen den trang thai moi
      next(); // can than 2 cai lien tiep la loi
    })
    .catch(err => console.log(err));
});

// Them templating engine de render html, css
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.
  connect(
    'mongodb+srv://nodejs:Vuong0935986100@cluster0-aecmg.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
  )
  .then(result => {
    console.log("CONNECTED");
    User.findOne()
    .then(user => {
      if (!user) {
        const user = new User({
          username: "vuonglegend",
          password: "1",
          email: "vuonglegend@gmail.com",
          address: "Binh Thanh",
          birthday: "15/08/1998",
          cart: {
            items: []
          },
          role: "admin"
        });
        user.save();
      }
    });
    app.listen(3000);
  });