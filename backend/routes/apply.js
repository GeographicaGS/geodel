var express = require('express');
var router = express.Router();
var auth = require('../auth.js').authenticate;

var db = require('../db/db.js');
var ApplyModel = db.ApplyModel;

router.get('/get_apply_list', auth, function(req, res, next) {
	ApplyModel.getApplyList(function(err,data){
		res.json({'results':data});
	});
});


router.get('/get_apply_geom', auth, function(req, res, next) {
	ApplyModel.getApplyListGeom(function(err,data){
		res.json({'results':data});
	});
});

router.get('/apply/:id', auth, function(req, res, next) {
	var id = req.params.id;
	ApplyModel.getApplyListGeom(function(err,data){
		res.json({'results':data});
	});
});

module.exports = router;
