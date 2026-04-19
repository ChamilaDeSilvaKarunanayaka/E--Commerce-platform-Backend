import Student from "../models/student.js";

export function getStudents(req, res){
  Student.find().then(
    (data)=>{
      res.json(data)
    }
  )
}

export function saveSTudents(req,res){
    console.log(req.body);
    
            const student = new Student({
                name : req.body.name,
                age : req.body.age,
                stream : req.body.stream,
                email : req.body.email
            });
    
            student.save().then(()=>{
                res.json(({
                    message : "student data added successfully"
                }));
    
            }).catch(()=>{
                res.json({
                    message : "error adding student data"
                });
            });

}