import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import Student from './models/student.js';

dotenv.config()

const app = express();

app.use(express.json())  // Middleware to parse JSON bodies in requests

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to database")
}).catch(()=>{
    console.log("error connecting to database")
})

app.get("/",
    (req, res)=>{
        Student.find().then(
            (data)=>{
                res.json(data)
            }
        )
    }
)

app.delete("/",
    (req, res)=>{
        res.json(
            {
                message : "this is a delete request"
            }
        )
    }
)
app.post("/",
    (req, res)=>{
        console.log(req.body);

        const student = new Student({
            name : req.body.name,
            age : req.body.age,
            stream : req.body.stream,
            email : req.body.email
        })

        student.save().then(()=>{
            res.json(({
                message : "student data added successfully"
            }))

        }).catch(()=>{
            res.json({
                message : "error adding student data"
            })
        })

    }
)
app.put("/",
    (req, res)=>{
        res.json(   
            {
                message : "this is a put request"
            }
        )
    }
)


app.listen(3000, ()=>{      // Start the server and listen on port 3000
    console.log('Server is running on port 3000');
}  ) 

