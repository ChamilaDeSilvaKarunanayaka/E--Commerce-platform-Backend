import express from 'express';

let app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});