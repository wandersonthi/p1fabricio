var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;
  
	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
	  res.send();
	} else {
	  if (personInfo.password == personInfo.passwordConf) {
  
		User.findOne({email:personInfo.email},function(err,data){
		  if(!data){
			var c;
			User.findOne({},function(err,data){
			  if (data && data.unique_id) {
				console.log("if");
				c = data.unique_id + 1;
			  } else {
				c=1;
			  }
  
			  var newPerson = new User({
				unique_id:c,
				email:personInfo.email,
				username: personInfo.username,
				password: personInfo.password
			  });
  
			  newPerson.save(function(err, Person){
				if(err)
				  console.log(err);
				else
				  console.log('Success');
				  res.send({"Success":"You are registered, you can login now."});
			  });
  
			}).sort({_id: -1}).limit(1);
		  }else{
			res.send({"Success":"Email is already used."});
		  }
  
		});
	  }else{
		res.send({"Success":"password is not matched"});
	  }
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	User.findOne({email:req.body.email},function(err,user){
	  if(user){
		user.comparePassword(req.body.password, function(err, isMatch) {
		  if (isMatch && !err) {
			var token = user.generateJwt();
			res.json({success: true, token: 'JWT ' + token});
		  } else {
			res.send({"Success":"Wrong password!"});
		  }
		});
	  } else {
		res.send({"Success":"This Email Is not registered!"});
	  }
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			return res.render('data.ejs', {"name":data.username,"email":data.email});
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

module.exports = router;
