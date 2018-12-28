var express = require("express");
var router = express.Router();
var BAD_REQUEST = require("http-status-codes");
var INTERNAL_SERVER_ERROR = require("http-status-codes");
var NOT_FOUND = require("http-status-codes");
const Client = require("../models/client");
var Joi = require("joi");
//import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';
// var clientService = require('../service/client.service');





router.post('/clients', (req, res, next) => {

    const schema = Joi.object().keys({
        firstName: Joi.string().alphanum().min(3).max(10).required(),
        lastName: Joi.string().alphanum().min(3).max(10).required(),
        email: Joi.string()
            .email({ minDomainAtoms: 2 })
            .required()

    });


    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
    }
    const client = Client.create(value);
    return res.json(client);

});


router.get('/clients', (req, res, next) => {
    Client.find(function (err, clients) {
        if (err)
            res.status(INTERNAL_SERVER_ERROR).json(err);
        else {
            res.json(clients);
        }

    })
});
router.get('/clients/:id', (req, res, next) => {

    const { id } = req.params;
    Client.findById(id)
        .then(client => {
            if (!client) {
                return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any client' });
            }
            return res.json(client);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
});

router.delete('/clients/:id', (req, res, next) => {
    Client.deleteOne({
        _id: req.params.id
    }, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.put('/clients/:id', (req, res, next) => {

    {
        const { id } = req.params;
        const schema = Joi.object().keys({
            firstName: Joi.string().min(3).max(10).optional(),
            lastName: Joi.string().min(3).max(10).optional(),
            email: Joi.string().email({ minDomainAtoms: 2 }).optional()
        });


        const { value, error } = Joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(BAD_REQUEST).json(error);
        }
        Client.findOneAndUpdate({ _id: id }, value, { new: true })
            .then(client => res.json(client))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    }
});

module.exports = router;



