function init(callback){
    module.exports.BaseModel = new (require('./basemodel.js'));
    module.exports.UserModel = new (require('./usermodel.js'));
    module.exports.ApplyModel = new (require('./applymodel.js'));
    callback();
}

module.exports.init = init