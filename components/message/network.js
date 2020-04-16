const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const config = require('../../config');

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, config.publicRoute + config.filesRoute),
    filename: (req, file, callback) => {
        const id = nanoid.nanoid(64);
        const extension = path.extname(file.originalname);
        const fileName = id + extension;
        callback(null, fileName)
  	}
});

const upload = multer({ storage });

router.get('/', function (req, res) {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
    .then((messageList) => {
        response.success(req, res, messageList, 200);
    }).catch(e => {
        response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/', upload.single('file'), function (req, res) {
    
    controller.addMessage(req.body.user, req.body.chat, req.body.message, req.file)
    .then((fullMessage) => {
        response.success(req, res, fullMessage, 201);
    }).catch(e => {
        response.error(req, res, 'informacion invalida', 400, e);
    });
    
});

router.patch('/:id', function (req, res){
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.delete('/:id', function (req, res) {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

module.exports = router;