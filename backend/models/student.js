const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    StudentId: {
        type: String,
        require:true
       

    },
    StudentName: {
        type: String,
        require:true
     

    },
    Email: {
        type: String,
        require:true

    },
    Class: {
        type: String,
        require:true
     

    },
    EnrollementYear: {
        type: String,
        require:true
     

    },
    City: {
        type: String,
        require:true
       

    },
    Country: {
        type: String,
        require:true
    

    },

});

module.exports = mongoose.model("Student", studentSchema);