const User = require("../models/user");

const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
    // message duoc lay trong flash
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Sign up',
        errorMessage: message
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log(1);
        console.log(req.flash('error'));  
        req.flash('error', 'Invalid email or password.');
        
        // luu tren session truoc khi show message.
        return req.session.save(err => {
          console.log(err);
          return res.redirect('/login');
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch && user.role == "admin") {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/admin');
            });
          }
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    // huy session khi user dang xuat
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        console.log(1);
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        console.log(req.flash('error'));  
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
        });
    })
    .catch(err => {
      console.log(err);
    });
};