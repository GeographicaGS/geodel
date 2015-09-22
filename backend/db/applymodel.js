var db = require('./db.js');
var BaseModel = db.BaseModel;

function ApplyModel() {

}

ApplyModel.prototype.getApplyList = function(callback){
	BaseModel.query(callback, 'select m.descripcion as town, solicitud,denominacion, motivo_cierre_expediente as estado, i.nombre as medida, ' +
								'ST_X(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),25830),4326)) as coord_x, ' +
								'ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),25830),4326)) as coord_y, ' +
								'ST_X(ST_Centroid(ST_Transform(geom,4326))) as coord_x_m, ' +
								'ST_Y(ST_Centroid(ST_Transform(geom,4326))) as coord_y_m ' +
								'from data.expedientes e '+
								'left join data.municipios m on e.municipio = m.id left join data.grupo_intervencion i on i.gi=e.gi ' +
								'order by denominacion');
};

ApplyModel.prototype.getApplyListGeom = function(callback){
	
	BaseModel.query(callback, 'select solicitud, motivo_cierre_expediente as estado, ' +
								'ST_X(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),25830),4326)) as coord_x, ' +
								'ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),25830),4326)) as coord_y, ' +
								'ST_X(ST_Centroid(ST_Transform(geom,4326))) as coord_x_m, ' +
								'ST_Y(ST_Centroid(ST_Transform(geom,4326))) as coord_y_m ' +
								'from data.expedientes e '+
								'left join data.municipios m on e.municipio = m.id and (coord_x is null or coord_y is null)');
};

ApplyModel.prototype.getApply = function(id,callback){

	BaseModel.query(callback, 'select solicitud, motivo_cierre_expediente as estado, expte, denominacion, municipio as ine, m.descripcion as municipio, e.descripcion, e.inversion_prevista, e.subvencion_concedida, s."Solicitante" as solicitante, s."DNI/CIF" as dni, s."Email" as email, s."Tlfnos" as tlf, sec.descripcion as sector, e.sector_actividad, e.promovido_por_mujer, e.promovido_por_joven, e.observaciones, e.subvencion_propuesta_ite, e.plus_porcentual, e.suplementaria, tipoInt.tipo_intervencion as intervention_type_name, e.tipo_intervencion, e."descripcion_intervención" as descripcion_intervencion, e.presupuesto_solicitud, e.inversion_subvencionable, e.subvencion_solicitada, e.inversion_en_contrato, e.subvencion_concedida, e.subvencion_concedida_condicionada, e.anyadir_gi, to_char(e.fechalimite_inicio, \'dd/MM/yyyy\') as fechalimite_inicio, to_char(e.fechalimite_finalizacion, \'dd/MM/yyyy\') as fechalimite_finalizacion, e.normas_competencia, e.inversion_final_realizada, e.inversion_final_subvencionable, e.g1_igualdad_h_m, e.g2_formacion_igualdad_empleo, e.g3_autoempleo_empleo_calidad_mujeres, e.g4_conciliacion_laboral_familiar, e.g5_fomento_participacion_mujeres, e.g6_conocimiento_mujeres, e.g7_ocio_enfoque_genero, e.g8_otra_cat_incidencia, e.j1_educacion_valores_juventud, e.j2_formacion_juventud, e.j3_autoempleo_empleo_calidad_juventud, e.j4_participacion_juventud, e.j5_conocimiento_juventud, e.j6_ocio_juventud, e.j7_otra_cat_incidencia, e.calificacion_intervencion, int.gi, int.nombre as intervention_group_name, ' +
								'ST_X(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),25830),4326)) as coord_x, ' +
								'ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint(coord_x, coord_y),25830),4326)) as coord_y, ' +
								'ST_X(ST_Centroid(ST_Transform(geom,4326))) as coord_x_m, ' +
								'ST_Y(ST_Centroid(ST_Transform(geom,4326))) as coord_y_m ' +
								'from data.expedientes e '+
								'left join data.municipios m on e.municipio = m.id '+
								'left join data.solictantes s on s."DNI/CIF" = e.solicitante '+
								'left join data.sector_actividad sec on sec.id = e.sector_actividad '+
								'left join data.tipo_intervencion tipoInt on tipoInt.id = e.tipo_intervencion '+
								'left join data.grupo_intervencion int on int.gi = e.gi ' +
								'where solicitud = $1', [id]);
};

ApplyModel.prototype.getSectors = function(callback){
	BaseModel.query(callback, 'select id, descripcion ' +
								'from data.sector_actividad '+
								'order by id');
};

ApplyModel.prototype.getIntervetionsTypes = function(callback){
	BaseModel.query(callback, 'select id, tipo_intervencion ' +
								'from data.tipo_intervencion '+
								'order by id');
};

ApplyModel.prototype.getIntervetionGroup = function(callback){
	BaseModel.query(callback, 'select gi, nombre ' +
								'from data.grupo_intervencion '+
								'order by gi');
};

ApplyModel.prototype.updateBasicApply = function(apply, callback){

	BaseModel.query(callback, 'UPDATE data.expedientes '+
							   'SET sector_actividad=$1, promovido_por_mujer=$2, promovido_por_joven=$3, '+
							   'g1_igualdad_h_m= $4, g2_formacion_igualdad_empleo= $5, g3_autoempleo_empleo_calidad_mujeres= $6, g4_conciliacion_laboral_familiar= $7, g5_fomento_participacion_mujeres= $8, g6_conocimiento_mujeres= $9, g7_ocio_enfoque_genero= $10, g8_otra_cat_incidencia= $11, j1_educacion_valores_juventud= $12, j2_formacion_juventud= $13, j3_autoempleo_empleo_calidad_juventud= $14, j4_participacion_juventud= $15, j5_conocimiento_juventud= $16, j6_ocio_juventud= $17, j7_otra_cat_incidencia= $18, ' +
							   'coord_x= ST_X(ST_Transform(ST_SetSRID(ST_MakePoint($19, $20),4326),25830)), '+
							   'coord_y= ST_Y(ST_Transform(ST_SetSRID(ST_MakePoint($19, $20),4326),25830)), '+
							   'descripcion= $21 ' +
							 'WHERE solicitud= $22',[apply.sector_actividad, apply.promovido_por_mujer, apply.promovido_por_joven, apply.g1_igualdad_h_m, apply.g2_formacion_igualdad_empleo, apply.g3_autoempleo_empleo_calidad_mujeres, apply.g4_conciliacion_laboral_familiar, apply.g5_fomento_participacion_mujeres, apply.g6_conocimiento_mujeres, apply.g7_ocio_enfoque_genero, apply.g8_otra_cat_incidencia, apply.j1_educacion_valores_juventud, apply.j2_formacion_juventud, apply.j3_autoempleo_empleo_calidad_juventud, apply.j4_participacion_juventud, apply.j5_conocimiento_juventud, apply.j6_ocio_juventud, apply.j7_otra_cat_incidencia, apply.coord_x, apply.coord_y, apply.descripcion, apply.solicitud]);
};

ApplyModel.prototype.updateApplicant = function(applicant, callback){
	BaseModel.query(callback, 'UPDATE data.solictantes '+
							   'SET "Solicitante"=$1, "Tlfnos"=$2, "Email"=$3 '+
							 'WHERE "DNI/CIF"=$4',[applicant.solicitante, applicant.tlf, applicant.email, applicant.dni]);
};

ApplyModel.prototype.updateInterventionApply = function(applicant, callback){
	BaseModel.query(callback, 'UPDATE data.expedientes '+
							   'SET subvencion_propuesta_ite=$1, plus_porcentual=$2, suplementaria=$3, tipo_intervencion=$4, calificacion_intervencion=$5, gi=$6, "descripcion_intervención"=$7 '+
							 'WHERE solicitud=$8',[applicant.subvencion_propuesta_ite, applicant.plus_porcentual, applicant.suplementaria, applicant.tipo_intervencion, applicant.calificacion_intervencion, applicant.gi, applicant.descripcion_intervencion, applicant.solicitud]);
};

ApplyModel.prototype.updateImportApply = function(applicant, callback){
	BaseModel.query(callback, 'UPDATE data.expedientes '+
							   'SET inversion_prevista=$1, presupuesto_solicitud=$2, inversion_subvencionable=$3, subvencion_solicitada=$4, inversion_en_contrato=$5, subvencion_concedida=$6, subvencion_concedida_condicionada=$7, anyadir_gi=$8 '+
							 'WHERE solicitud=$9',[applicant.inversion_prevista, applicant.presupuesto_solicitud, applicant.inversion_subvencionable, applicant.subvencion_solicitada, applicant.inversion_en_contrato, applicant.subvencion_concedida, applicant.subvencion_concedida_condicionada, applicant.anyadir_gi, applicant.solicitud]);
};

ApplyModel.prototype.updateExecutionApply = function(applicant, callback){
	BaseModel.query(callback, 'UPDATE data.expedientes '+
							   'SET fechalimite_inicio=to_date($1, \'dd/MM/yyyy\'), fechalimite_finalizacion=to_date($2, \'dd/MM/yyyy\'), normas_competencia=$3 '+
							 'WHERE solicitud=$4',[applicant.fechalimite_inicio, applicant.fechalimite_finalizacion, applicant.normas_competencia, applicant.solicitud]);
};

module.exports = ApplyModel;

