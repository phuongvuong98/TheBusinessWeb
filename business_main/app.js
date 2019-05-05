const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

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
const userInforRoutes = require("./routes/userInfor");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// cấu hình cho session
app.use(
  session({
    secret: 'my secret', // secret dùng tạo hash (hash lưu id trong cookie)
    resave: false, // session sẽ ko lưu với mỗi lệnh request => tốc đô
    saveUninitialized: false, // chắn chăn ko có session đc save mỗi request
    store: store
  })
);

// them flash de gui ve message error thong qua session
app.use(flash());

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

app.use((req, res, next) => {
  // gui ve 1 bien trong moi 1 route
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.currentUser = req.session.user;
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(utilRoutes);
app.use(authRoutes);
app.use(userInforRoutes);
app.use(errorController.get404);

mongoose.
  connect(
    MONGODB_URI,
    { useNewUrlParser: true}
  )
  .then(result => {
    console.log("CONNECTED");
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
