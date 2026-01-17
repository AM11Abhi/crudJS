import {query} from "../utils/connectToDB.js"
import { createRoleQuery,createEmployeeTableQuery,getAllEmployeesQuery,createEmployeeQuery,getEmployeeQuery, deleteEmployeeQuery,updateEmployeeQuery } from "../utils/sqlQuery.js";
import { createError } from "../utils/error.js";
export async function getAllEmployees(req,res,next){
    try{
        const result=await query("SELECT to_regclass('employee_details')");
        if(!result.rows[0].to_regclass){
            await query(createRoleQuery);
            await query(createEmployeeTableQuery);
        }
        const {rows}=await query(getAllEmployeesQuery);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err.message);
        return next(createError(500,"Couldn't get employees details"));
    }
}
export async function getEmployee(req,res,next){
    try{
        const {id}=req.params;
        const {rows}=await query(getEmployeeQuery,[id]);
        console.log(rows);
        if(rows.length===0){
            return  next(createError(400,"Employee not found"));
        }
        res.status(200).json(rows[0]);
    }
    catch(err){
        console.log(err.message);
        return next(createError(500,err.message));
    }
}
export async function deleteEmployee(req,res,next){
    try{
        const {id}=req.params;
        const {rows}=await query(deleteEmployeeQuery,[id]);
        if(rows.length===0){
            return  next(createError(400,"Employee not found"));
        }
        res.status(200).json({message:"Employee deleted successfully"});
    }
    catch(err){
        console.log(err.message);
        return next(createError(500,err.message));
    }
    
}
export async function updateEmployee(req,res,next){
    try{
        const {id}=req.params;
        const {name,email,age,role,salary}=req.body;
        const {rows}=await query(updateEmployeeQuery,[name,email,age,role,salary,id]);
        if(rows.rowcount===0){
            return res.status(400).json({error:"Employee not found"});
        }
        res.status(200).json(rows[0]);
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({error:err.message})
    }

}
export async function createEmployee(req,res,next){
    try{
        const {name,email,age,role,salary}=req.body;
        if(!name || !email || !age || !salary){
            return res.status(400).json({error:"All fields are required"});
        };
        const data=await query(createEmployeeQuery,[name,email,age,role,salary]);
        res.status(201).json(data.rows[0]);
    }
    catch(error){
        console.log(error.message);
        return next(createError(500,error.message));

    }  
}