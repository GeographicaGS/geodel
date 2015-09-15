var db = require('./db.js');
var BaseModel = db.BaseModel;

function ApplyModel() {

}

ApplyModel.prototype.getApplyList = function(callback){
	BaseModel.query(callback, 'select m.descripcion as town, solicitud,denominacion, estado_expediente as estado, i.medida from data.expedientes e left join data.municipios m on e.municipio = m.id left join data.grupo_intervencion i on i.gi=e.gi order by denominacion');
};


module.exports = ApplyModel;

