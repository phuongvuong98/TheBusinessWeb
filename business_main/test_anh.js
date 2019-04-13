const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

// Tao middleware cho user khi da start thanh cong SERVER voi PORT
app.use((req, res, next) => {
    User.findById("5ca9b16f830ead0606eaa7e1")
        .then(user => {
            // gan user(tu DB) cho req.user de luu user(mac dinh underfiled trong req)
            // no chi co thuoc tinh, ko co cac method cua user.
            //req.user = user;
            console.log("huhuhuhuhuhuh");
            // nen de dung het cac method cua user trong db tao moi NEW USER
            req.user = new User(user.name, user.email, user.cart, user._id);
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

// callback la 1 ham nhan vao tham so la client_1
// mongoConnect((client_1) => {
//     console.log(client_1);
//     app.listen(3000);
// });


mongoConnect(db => {
    app.listen(3000);
});
