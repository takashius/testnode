const Model = require('./model');

function addUser(user){
    const myUser = new Model(user);
    myUser.save();
}

async function getUser(filterUser){
    let filter = {};
    if(filterUser !== null){
        filter = {
            name: filterUser,
        };
    }
    const list = await Model.find(filter);
    return list;
}

async function updateUser(id, user){
    const foundUser = await Model.findOne({
        _id: id
    });

    foundUser.name = user;
    const newUser = await foundUser.save();
    return newUser;
}

function deleteUser(id){
    return Model.deleteOne({
        _id: id
    });

}

module.exports = {
    add: addUser,
    list: getUser,
    update: updateUser,
    delete: deleteUser
}