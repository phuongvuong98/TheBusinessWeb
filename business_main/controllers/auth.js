const User = require("../models/user");

const bcrypt = require("bcryptjs");

var nodemailer = require('nodemailer');

var rn = require('random-number');

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
        return res.redirect('/login');
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

exports.getForgot = (req, res, next) => {
  // message duoc lay trong flash
  let message = req.flash('error');
  if (message.length > 0) {
      message = message[0];
  } else {
      message = null;
  }
  res.render('auth/forgot', {
      path: '/forgot',
      pageTitle: 'Forgot your password',
      errorMessage: message
  });
};

exports.getVerify = (req, res, next) => {
  // message duoc lay trong flash
  let message = req.flash('error');
  if (message.length > 0) {
      message = message[0];
  } else {
      message = null;
  }
  res.render('auth/verify', {
      path: '/verify',
      pageTitle: 'Verify Code',
      errorMessage: message
  });
};

exports.postVerify = (req, res, next)=>{
  const email = req.body.email;
  req.session.email = email;
  User.findOne({ email: email })
  .then(user => {
    if (!user) {
      console.log(1);
      console.log(req.flash('error'));  
      req.flash('error', 'Invalid email');
      return res.redirect('/forgot');
    }
    var gen = rn.generator({
      min:  100000
    , max:  999999
    , integer: true
    })
    const code = gen();
    req.session.codeVerify = code;
    //user.codeVerify = code;
    //console.log(user.c);
    //user.save();
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'supergogetavegito@gmail.com',
          pass: 'gokukamehameha'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'supergogetavegito@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please enter your code: ' + code + '\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + email);
          
          res.redirect('/verify');
        }
        
      });
    
  }
  )
  .catch(err => console.log(err));
};

exports.getReset = (req, res, next) => {
  // message duoc lay trong flash
  let message = req.flash('error');
  if (message.length > 0) {
      message = message[0];
  } else {
      message = null;
  }
  res.render('auth/reset', {
      path: '/reset',
      pageTitle: 'Reset Your Password',
      errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  // huy session khi user dang xuat
  const code1 = req.body.verifyCode;
  const code2 = req.session.codeVerify;
  const email = req.session.email;

  //const password = req.body.password;
  //console.log(req.session.codeVerify);
    User.findOne({ email: email })
    .then(user => {
      if(code1 == code2){
        res.redirect('/reset');
      }
      else{
        console.log(req.flash('error'));  
        req.flash('error', 'Invalid code');
        return res.redirect('/verify');
      }
      
    })
  
};

exports.getUpdatePass = (req, res, next) => {
  // message duoc lay trong flash
  
  res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: message
  });
};
exports.postUpdatePass = (req, res, next) => {
    
  //const email2 = req.body.email2;
  const newpass = req.body.password;
  const renewpass = req.body.confirmPassword;
  const email = req.session.email;
  User.findOne({ email: email })
  .then(user => {
    if (newpass!=renewpass){
      console.log(1);
      console.log(req.flash('error'));  
      req.flash('error', 'Password khong khop');
      return res.redirect('/reset');
    }
    if (newpass == renewpass){
      return bcrypt
            .hash(newpass, 12)
            .then(hashedPassword => {
              user.password = hashedPassword;
            return user.save();
      })
      .then(result => {
        res.redirect("/login");
      });
    }
  })
  .catch(err => console.log(err));

};
