var express = require('express');
var router = express.Router();

// Get admin panal
router.get('/dashboard', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;