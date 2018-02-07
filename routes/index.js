var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var user=require("../models/user");
/* GET home page. */
/**
 * Đăng nhập gmail
 */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function(username, password, done) {
  user.findOne({email:username},function(err,username){
    if(err) throw err;
    if(!username){
      console.log("Tài khoản này không tồn tại");
      return done(null,false,{message : 'Tài khoản này không tồn tại'});
    }else{
      console.log(username.email+" Tài khoản này tồn tại");
    }
    bcrypt.compare(password, username.password, function(err, isMatch) {
      if (isMatch) {
        console.log(username.email+" - Chào bạn");
        
          return done(null, username);
      } else {
        console.log("Mật khẩu không chính xác");
        return done(null,false,{message : 'Mật khẩu không chính xác'});
      }
    });
  })  
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  }).catch(function (err) {
    console.log(err);
  });
});
/**
 * check and return session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// const authcheck= function(req,res,next){
//   if(!req.user){
//        res.redirect('/');
//   }else{
//       next();
//   }
// }
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express',errors:null});
});
router.post('/',
  passport.authenticate('local', { successRedirect: '/register',
                                   failureRedirect: '/',
                                   })
                                  //  failureFlash: true 
);
/**
 * checkAuthentication : check xem nếu đã đăng nhập thì đc phép vào admin còn ko thì về home
 */
// router.get("/admin",authcheck,function(req,res,next){  
//   // res.send(req.user);
// })
module.exports = router;
