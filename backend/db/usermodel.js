var db = require('./db.js');
var BaseModel = db.BaseModel;

function UserModel() {

}

UserModel.prototype.getUser = function(username,callback){
	BaseModel.query(callback, 'select u.name,p.name as profile,surname,email,password from data.user u inner join data.profile p on u.id_profile = p.id where email=$1', [username]);
};


module.exports = UserModel;

