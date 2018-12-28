var express = require("express");
var router = express.Router();
var Joi = require("joi");
var HttpStatus = require("http-status-codes");

const Student = require("../models/student");




router.get('/students', (req, res, next) => {
    Student.find(function (err, result) {
        if (err)
            res.json(err);
        else {
            res.json(result);
        }

    })
});

router.get('/students/:id', (req, res, next) => {

    const { id } = req.params;
    Student.findById(id)
        .then(student => {
            if (!student) {
                return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any student' });
            }
            return res.json(student);
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
});


saveitem = function (newStudent, callback) {
    newStudent.save((err, str) => {
  
      if (err) {
  
        callback(err)
      } else {
        callback(str);
      }
  
    });
  }

router.post('/students', (req, res, next) => {


 

    let item = req.body;

  
  
    let newStudent = new Student(item);
    saveitem(newStudent, function (err, resp, sucess) {
      if (err) {
        res.send(err)
      } else {
        res.send(resp);
      }
  
    });
  

    
});

router.put('/students/:id', (req, res, next) => {

    

        const { id } = req.params;
        const value=req.body;
        console.log(value);
    
       
        Student.findOneAndUpdate({ _id: id }, value, { new: true })
            .then(student => res.json(student))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    

});

router.delete('/students/:id', (req, res, next) => {
    Student.deleteOne({
        _id: req.params.id
    }, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});
module.exports = router;