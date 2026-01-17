import pg from "pg";
import env from "dotenv";

env.config();
const requiredEnvVars=["PG_USER","PG_HOST","PG_DATABASE","PG_PASSWORD","PG_PORT"];
requiredEnvVars.forEach((varName)=>{
    if(!process.env[varName]){
        console.log(`Missing environment variable: ${varName}`);
        process.exit(1);
    }
})
const db= new pg.Pool({
    user:process.env.PG_USER,
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PG_PASSWORD,
    port:process.env.PG_PORT,
});
db.connect()
    .then(()=>{
        console.log("Connected to db");
    })
    .catch((err)=>{
        console.error("Error connecting to db",err);
        process.exit(1);
    });
db.on("error",(err)=>{
    console.log("DB ERROR",err);
    process.exit(1);
});
export const query=(text,params)=>db.query(text,params);