var express = require('express');
var router = express.Router();
var user=require("../models/user");
var bcrypt = require('bcryptjs');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
    
  res.render('register', { title: 'Express',errors:null });
});
router.post('/',function(req,res,next){
    req.check("email","Bạn chưa nhập Email").isEmail().notEmpty();
    req.check("password_confirmation","Mật khẩu không khớp").isLength({min:3}).notEmpty().equals(req.body.password);
    req.check("fullname","Bạn chưa nhập họ tên").notEmpty();
    req.check("phone","Bạn chưa nhập phone").notEmpty();
    req.check("fax","Bạn chưa nhập fax").notEmpty();
    var errors=req.validationErrors();
    if(errors){
        res.render("register",{errors:errors});
    }else{
        dl={
            email:req.body.email,
            password:req.body.password,
            fullname:req.body.fullname,
            phone:req.body.phone,
            fax:req.body.fax
        }
        console.log(dl.password);
        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(dl.password, salt, function(err, hash) {
                dl.password=hash;
                user.create(dl,function(err,result){
                    if(err) throw err;
                    else  res.redirect('/');
                })
            });
        });
    }
})
module.exports = router;
