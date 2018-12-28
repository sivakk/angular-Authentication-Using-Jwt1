var express = require("express");
var router = express.Router();
var BAD_REQUEST = require("http-status-codes");
var INTERNAL_SERVER_ERROR = require("http-status-codes");
var NOT_FOUND = require("http-status-codes");
const User = require("../models/user");
var passport = require("passport");
const bcryptjs = require('bcryptjs');
var devConfig = require('../config/env');
var jwt = require("jsonwebtoken");







router.post('/signup', (req, res, next) => {

    bcryptjs.hash(req.body.password, 10).then(
        hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(result => {
                res.status(201).json({
                    message: 'User Created!',
                    result: result
                });
            })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }

    )





    // const schema = Joi.object().keys({
    //     email: Joi.string()
    //         .email({ minDomainAtoms: 2 })
    //         .required(),
    //     password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()


    // });


    // const { value, error } = Joi.validate(req.body, schema);
    // if (error && error.details) {
    //     return res.status(BAD_REQUEST).json(error);
    // }
    // const user = User.create(value);
    // return res.json(user);

});
router.post('/login', (req, res, next) => {

    let fetchedUser;

    User.findOne({email:req.body.email}).then(user=>{
       
        if(!user){
        return res.status(401).json({msg:"Auth failed"})
        }
        else{
            console.log(user);
        }
        fetchedUser=user;
        return bcryptjs.compare(req.body.password,user.password)
    }).then(result=>{
        if(!result){
            return res.status(401).json({msg:"Auth failed"})
        }
        const token=jwt.sign({email: fetchedUser.email,userId:fetchedUser._id},
            "secret_should_be_longer",
            {expiresIn:"1h"}
            );
            res.status(200).json({token:token,expiresIn:3600})
    })
    .catch (err =>{
        return res.status(401).json({msg:"Auth failed"})
        }

    )
});

    // const schema = Joi.object().keys({

    //     email: Joi.string()
    //         .email({ minDomainAtoms: 2 })
    //         .required(),
    //     password: Joi.string().required()

    // });

    // try {
    //     const { value, error } = Joi.validate(req.body, schema);
    //     if (error && error.details) {
    //         return res.status(BAD_REQUEST).json(error);
    //     }




    //     User.findOne({ email: value.email }, function (err, result) {
    //         const matched = bcryptjs.compare(value.password, result.password);
    //         console.log(value.password);
    //         console.log(value.email);

    //         if (matched) {


    //             res.json(result.password);

    //         } else {
    //             res.json({ err: 'invalid email or password' })
    //         }

    //     });



    //     //console.log(user1);


    //     // if (!user) {
    //     //     return res.json({ err: 'invalid email or password' });
    //     // }
    //     // const matched = bcryptjs.compare(value.password, user.password);
    //     // if (!matched) {
    //     //     return res.json({ err: 'invalid credentials' });
    //     // }
    //     // else {
    //     //     const token = jwt.sign({ id: user._id }, devConfig.secret, {
    //     //         expiresIn: '1d'
    //     //     });
    //     //     return res.json({ success: true, token });
    //     // }
    // }
    // catch (err) {
    //     console.error(err);
    //     return res.status(INTERNAL_SERVER_ERROR).json(err);
    // }


router.post('/test', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    return res.json(req.currentUser);

});



module.exports = router;



