const store = require('./store');
const config = require('../../config');


function addMessage(user, chat, message, file){
    return new Promise((resolve, reject) => {
        if(!user || !message){
            console.error('[mesagecontroller] No hay usuario o mensaje');
            reject('Los datos son incorrectos');
            return false;
        }
        
        const fileUrl = file ? config.host + ':' + config.port + config.publicRoute + config.filesRoute + '/' + file.filename : '';

        const fullMessage = {
            user: user,
            chat: chat,
            message: message,
            date: new Date(),
            file: fileUrl,
        };

        store.add(fullMessage); 
        resolve(fullMessage );
        
    });
    
}

function getMessages(filterMessages){
    return new Promise((resolve, reject) => {
        resolve(store.list(filterMessages));
    });
}

function updateMessage(id, message){
    return new Promise(async (resolve, reject) => {
        if(!id || !message){
            reject('Invalid data');
            return false;
        }
        const result = await store.update(id, message);
        resolve(result);
    });
}

function deleteMessage(id){
    return new Promise(async (resolve, reject) => {
        if(!id){
            reject('Invalid data');
            return false;
        }
        store.delete(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e); 
            });
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}