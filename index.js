const express = require("express");
const app = express();// tao ra localhost
const PORT = 3333;

// ket noi mysql
const configDB = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'T2305E',
    multipleStatements: true // cho phep viet nhieu cau SQL trong 1 lan query
}
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// cap phep cho su dung cac file static
app.use(express.static("public"));

app.listen(PORT,function(){
    console.log("Server is running...");
});
// Routes
app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/views/home.html");
});
app.get("/about-us",function(req,res){
    res.send("About us page");
})

app.get("/api/categories",function(req,res){
    const sql = `select * from categories`;
    conn.query(sql,function(err,rs){
        if(err) return res.send("Error");
        return res.send(rs);
    });
})

app.get("/api/products",function(req,res){
    const sql = `select * from products`;
    conn.query(sql,function(err,rs){
        if(err) return res.send("Error");
        return res.send(rs);
    });
})

app.get("/api/search",function(req,res){
    // get parameters
    const search = req.query.q;
    const sql = `select * from products where name like '%${search}%'`;
    conn.query(sql,function(err,rs){
        if(err) return res.send("Error");
        return res.send(rs);
    });
})
app.get("/api/category/:id",function(req,res){
    // get parameters
    const id = req.params.id;
    const sql = `select * from products where category_id = ${id}`;
    conn.query(sql,function(err,rs){
        if(err) return res.send("Error");
        return res.send(rs);
    });
})