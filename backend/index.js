import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employee.js';
dotenv.config();
const app = express();
const PORT = 3000;
const corsOptions ={
    origin:'*'
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get('/', (req,res)=>{
    res.send('Hello World');
})
app.use('/api/employee', employeeRoutes);
//Global Error Handler  
app.use(function(req,res){
    res.status(404).json({error:"Endpoint not found"});
})
app.use((err,req,res,next)=>{
    const statusCode= err.statusCode || 500;
    const message=err.message ||"Internal Server Error";
    return res.status(statusCode).json({error:message});
}) ;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})