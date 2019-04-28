const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();
const MONGODB_URI =
'mongodb+srv://nodejs:Vuong0935986100@cluster0-aecmg.mongodb.net/test';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

// Them templating engine de render html, css
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const utilRoutes = require("./routes/util");
const authRoutes = require("./routes/auth");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(path.join(__dirname, "public")));


// cấu hình cho session
app.use(
  session({
    secret: 'my secret', // secret dùng tạo hash (hash lưu id trong cookie)
    resave: false, // session sẽ ko lưu với mỗi lệnh request => tốc đô
    saveUninitialized: false, // chắn chăn ko có session đc save mỗi request
    store: store
  })
);



app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(utilRoutes);
app.use(authRoutes);
app.use(errorController.get404);

// Tao middleware cho user khi da start thanh cong SERVER voi PORT
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

mongoose.
  connect(
    MONGODB_URI,
    { useNewUrlParser: true}
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
  })
  .catch(err => {
    console.log(err);
  });
