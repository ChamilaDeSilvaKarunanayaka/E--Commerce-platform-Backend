import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";

dotenv.config()

const app = express();

app.use(express.json())  // Middleware to parse JSON bodies in requests

app.use(
    (req, res, next) => { // Middleware to set CORS headers
        const tokenString = req.header("Authorization")
        if(tokenString != null){
            const token = tokenString.replace("Bearer ", "")

            jwt.verify(token, "dilcsksecretkey" ,
                (err, decoded) => {
                    if(err,decoded != null){
                        req.user = decoded
                        next()
                         
                    }else{
                        console.log("invalid token")
                        res.status(403).json({
                            message : "invalid token"
                        })  
                    }
                    
        })
        
    }else{
        next()
    }
 }
)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to database")
}).catch(()=>{
    console.log("error connecting to database")
})

app.use("/students", studentRouter)  // Use the student router for routes starting with /students 
app.use("/products", productRouter)  // Use the product router for routes starting with /products
app.use("/users", userRouter)  // Use the user router for routes starting with /users


app.listen(3000, ()=>{      // Start the server and listen on port 3000
    console.log('Server is running on port 3000');
}  ) 

