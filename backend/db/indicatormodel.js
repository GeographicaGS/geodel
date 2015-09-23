var db = require('./db.js');
var BaseModel = db.BaseModel;

function IndicatorModel() {

}

IndicatorModel.prototype.getIndicatorList = function(callback){
	BaseModel.query(callback, 'select id, nombre ' +
								'from data.indicadores '+
								'order by id');
};

IndicatorModel.prototype.getIndicator = function(id,callback){
	BaseModel.query(callback, 'select id, nombre, sql ' +
								'from data.indicadores '+
								'where id=$1 '+
								'order by nombre', [id]);
};

IndicatorModel.prototype.getIndicatorData = function(sql,callback){
	BaseModel.query(callback, sql);
};


module.exports = IndicatorModel;

