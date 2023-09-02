const express = require('express');
const expressLayouts= require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const {check,body ,validationResult} = require('express-validator');
require('dotenv').config();




const app= express();
const port=process.env.PORT || 3000;





app.use(express.static(__dirname + '/public'));
// app.use('/css',express.static(__dirname + 'public/css'));
// app.use('/js',express.static(__dirname + 'public/js'));
// app.use('/assets',express.static(__dirname + 'public/assets'));
app.use(expressLayouts);
// app.set('views' , './views');
app.set('view engine', 'ejs');
app.set("layout success", false);
app.use(bodyParser.json());
app.use(express.json());
const urlencodedParser = bodyParser.urlencoded({extended: false});



const pool = mysql.createPool({
connectionLimit : 100,
host            : process.env.DB_HOST ,
user            : process.env.DB_USER,
password        : process.env.DB_PASS,
database        : process.env.DB_NAME
});





app.get('/',(req,res)=>{
    res.render('index');
})




 app.post('/',urlencodedParser, [
    body('day').isAfter(new Date().toISOString().split('T')[0]).withMessage('Please select a date in the future'),
    check('email',"email is not a valid email").isEmail().normalizeEmail(),
  ],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    const alert = errors.array();
    res.render('index',{alert})
    }
    let name = req.body.name;
    let  email= req.body.email;
    let  phone= req.body.phone;
    let  bloodtype= req.body.Bloodtype;
    let  date= req.body.day;
    let  time= req.body.appt;
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as ID '+ connection.threadId);
        connection.query('INSERT INTO user SET name = ?,email = ?,phone= ?,bloodtype= ?,date= ?,time= ?',[name,email,phone,bloodtype,date,time], (err,rows)=>{
            connection.release();

            if(!err){
                res.render('success',{layout: 'success',
                 name : req.body.name
                , email:req.body.email
                , phone:req.body.phone
                , bloodtype: req.body.Bloodtype
                , date: req.body.day
                , time: req.body.appt});
            }
            else console.log("error in form connection sql: "+ err);

            console.log("the data from user table: \n",rows);
        });
    });
    });



    app.get('/about',(req,res)=>{
        res.render('about');
    });

    app.get('/contact',(req,res)=>{
        res.render('contact');
    });





    app.get('/admin',(req,res)=>{
        pool.getConnection((err,connection)=>{
            if(err) throw err;
            console.log('connected as ID '+ connection.threadId);
            connection.query('SELECT * FROM user',(err,rows)=>{
                connection.release();
    
                if(!err){
                  res.render('admin',{rows});
                }
                else console.log("error in form connection sql: "+ err);
    
                console.log("the data from user table: \n",rows);
            });
        });
    })
app.listen(port,()=> console.info(`listening on port ${port}`));