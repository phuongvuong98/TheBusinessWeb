const User = require("../models/user");

const bcrypt = require("bcryptjs");

exports.getChangePassword = (req, res, next) => {
    // message duoc lay trong flash
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('shop/account', {
        path: '/account',
        pageTitle: 'Your Information',
        errorMessage: message
    });
};

exports.postChangePassword = (req, res, next) => {
    const password = req.body.oldpass;
    const newpass = req.body.newpass;
    const renewpass = req.body.renewpass;
    const kindChange = req.body.kindChange;
    if (kindChange.includes("pw")){
    const email = req.body.email;
      User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log(1);
        console.log(req.flash('error'));  
        req.flash('error', 'Invalid email or password.');
        req.session.errM = true;
        res.redirect('/account');
        req.session.errM = false;
      } else{
      if (newpass!=renewpass){
        console.log(1);
        console.log(req.flash('error'));  
        req.flash('error', 'Password khong khop');
        req.session.errP = true;
        return res.redirect('/account');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          
          if (doMatch) {
            req.session.errM = false;
            req.session.errP = false;
            req.session.isLoggedIn = true;
            req.session.user = user;
            return bcrypt
              .hash(newpass, 12)
              .then(hashedPassword => {
                user.password = hashedPassword;
              return user.save();
        })
        .then(result => {
          res.redirect("/account");
        });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/account');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/account');
        });
      }
    })
    .catch(err => console.log(err));
    }
    if (kindChange.includes("if")){
      const address = req.body.address;
      const email = req.body.email2;
      const phone = req.body.phone;
      const birthday = req.body.birthday;
      User.findOne({ email: email })
  .then(user => {
    if (!user) {
      console.log(email);
      console.log(req.flash('error'));  
      req.flash('error', 'Invalid email password.');
      return res.redirect('/account');
    }
    req.session.user = user;
    user.address = address;
    user.phone = phone;
    user.birthday = birthday;
    user.email = email;
    user.save();
    return res.redirect('/account');
    
  })
  .catch(err => console.log(err));
    }
};

