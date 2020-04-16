const store = require('./store');

function addChat(users){
    if(!users || !Array.isArray(users)){
        return Promise.reject('Invalid user list');
    }

    const chats = {
        users: users,
    }
    return store.add(chats);
}

function listChat(userId){
    return store.list(userId);
}

module.exports = {
    addChat,
    listChat,
}