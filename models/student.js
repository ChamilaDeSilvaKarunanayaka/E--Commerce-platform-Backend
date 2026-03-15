import mongoose from "mongoose";

const StudentSchema = mongoose.Schema(
 {
    name : String,
    age : Number,
    stream : String,
    email : String
 }
)
 
const Student= mongoose.model("student", StudentSchema)

export default Student;