import express from 'express';

const app = express();

app.get("/",
    (req, res)=>{
        res.json(
            {
                message : "this is a get request"
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
        res.json(
            {
                message : "this is a post request"
            }
        )
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

