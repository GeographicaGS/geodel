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
	ApplyModel.getApply(id,function(err,apply){
		ApplyModel.getSectors(function(err,sectors){
			ApplyModel.getIntervetionsTypes(function(err,intervetions){
				ApplyModel.getIntervetionGroup(function(err,intervetionsGroups){
					apply[0].sectors = sectors;
					apply[0].intervetions = intervetions;
					apply[0].intervetionsGroups = intervetionsGroups;
					res.json(apply[0]);
				});
			});
		});
	});
});

router.post('/post_apply_basic/:id', auth, function(req, res, next) {
	ApplyModel.updateApplicant(req.body,function(err,apply){
		ApplyModel.updateBasicApply(req.body,function(err,apply){
			res.json({'results':true});
		});
	});
});

router.post('/post_apply_intervention/:id', auth, function(req, res, next) {
	ApplyModel.updateInterventionApply(req.body,function(err,apply){
		res.json({'results':true});
	});
});

router.post('/post_apply_import/:id', auth, function(req, res, next) {
	ApplyModel.updateImportApply(req.body,function(err,apply){
		res.json({'results':true});
	});
});

router.post('/post_apply_execute/:id', auth, function(req, res, next) {
	ApplyModel.updateExecutionApply(req.body,function(err,apply){
		res.json({'results':true});
	});
});

router.get('/get_apply_incidences/:id', auth, function(req, res, next) {
	var id = req.params.id;
	ApplyModel.getIncidences(id,function(err,incidences){
		res.json({'results':incidences});
	});
});

router.post('/post_apply_incidence', auth, function(req, res, next) {
	ApplyModel.insertIncidence(req.body,function(err,apply){
		res.json({'results':true});
	});
});

router.delete('/remove_apply_incidence/:id', auth, function(req, res, next) {
	var id = req.params.id;
	ApplyModel.removeIncidence(id,function(err,apply){
		res.json({'results':true});
	});
});




module.exports = router;


