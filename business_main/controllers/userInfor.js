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
    return res.render('shop/account', {
        path: '/account',
        pageTitle: 'Your Information',
        errorMessage: message
    });
};

exports.postChangePassword = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.oldpass;
    const newpass = req.body.newpass;
    const renewpass = req.body.renewpass;
    User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log(1);
        console.log(req.flash('error'));  
        req.flash('error', 'Invalid email or password.');
        return req.session.save(err => {
          console.log(err);
          res.redirect('/account');
        })
      }
      if (newpass != renewpass){
        console.log(1);
        console.log(req.flash('error'));  
        req.flash('error', "Password don't match confirmation!");
        return req.session.save(err => {
          console.log(err);
          res.redirect('/account');
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
             
          if (doMatch) {
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
          return req.session.save(err => {
            console.log(err);
            res.redirect('/account');
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/account');
        });
      
    })
    .catch(err => console.log(err));
};

exports.getChangeAddress = (req, res, next) => {
  res.render('shop/account', {
      path: '/account',
      pageTitle: 'Your Information',
  });
};


exports.postChangeAddress = (req, res, next) => {
  const email = req.body.email2;
  const address = req.body.address;
  User.findOne({ email: email })
  .then(user => {
    if (!user) {
      console.log(email);
      console.log(req.flash('error'));  
      req.flash('error', 'Invalid email password.');
      return req.session.save(err => {
        console.log(err);
        res.redirect('/account');
      })
    }
    req.session.user = user;
    user.address = address;
    user.save();
    return res.redirect('/account');
    
  })
  .catch(err => console.log(err));
};
