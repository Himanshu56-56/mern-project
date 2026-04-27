require('dotenv').config();
const express = require("express");
const cors =require("cors");
const app = express();
const authRoute=require("./router/auth-router");
const contactRoute=require("./router/contact-router");
const serviceRoute=require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb=require("./utils/db");
const errorMiddleware = require('./middleware/error-middleware');
const corsOption = {
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,PATCH,DELETE,HEAD",
    Credentials:true,
};
app.use(cors(corsOption));
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin",adminRoute);
app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(()=>{
app.listen(PORT,()=>{
    console.log(`server is running at port:${PORT}`);
});
});