var db = require('./db.js');
var BaseModel = db.BaseModel;

function ApplyModel() {

}

ApplyModel.prototype.getApplyList = function(callback){
	BaseModel.query(callback, 'select m.descripcion as town, solicitud,denominacion, motivo_cierre_expediente as estado, i.nombre as medida ' +
								'from data.expedientes e '+
								'left join data.municipios m on e.municipio = m.id left join data.grupo_intervencion i on i.gi=e.gi ' +
								'order by denominacion');
};

ApplyModel.prototype.getApplyListGeom = function(callback){
	
	BaseModel.query(callback, 'select solicitud, motivo_cierre_expediente as estado, ' +
								'ST_X(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),3042),4326)) as coord_x, ' +
								'ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),3042),4326)) as coord_y, ' +
								'ST_X(ST_Centroid(ST_Transform(geom,4326))) as coord_x_m, ' +
								'ST_Y(ST_Centroid(ST_Transform(geom,4326))) as coord_y_m ' +
								'from data.expedientes e '+
								'left join data.municipios m on e.municipio = m.id and (coord_x is null or coord_y is null)');
};

// ApplyModel.prototype.getApplyListGeom = function(callback){
	
// 	BaseModel.query(callback, 'select solicitud, motivo_cierre_expediente as estado, ' +
// 								'ST_X(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),3042),4326)) as coord_x, ' +
// 								'ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),3042),4326)) as coord_y, ' +
// 								'ST_X(ST_Centroid(ST_Transform(geom,4326))) as coord_x_m, ' +
// 								'ST_Y(ST_Centroid(ST_Transform(geom,4326))) as coord_y_m ' +
// 								'from data.expedientes e '+
// 								'left join data.municipios m on e.municipio = m.id and (coord_x is null or coord_y is null)');
// };


module.exports = ApplyModel;

