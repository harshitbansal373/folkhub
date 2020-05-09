const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {select, generateDate, paginate} = require('./helpers/handlebars-helpers')
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const {mongoDbUrl} = require('./config/database')
const passport = require('passport');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


mongoose.connect(mongoDbUrl,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then((db)=>{
    console.log('MONGO CONNECTED');
}).catch(err=> console.log(err));


//using static
app.use(express.static(path.join(__dirname,'public')));

//upload middleware
app.use(upload());

//body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//method override
app.use(methodOverride('_method'));

//Set view Engine
app.engine('handlebars',exphbs({defaultLayout:'home', helpers:{select:select, generateDate:generateDate, paginate:paginate}, handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine','handlebars');


app.use(session({
    secret: "harshitbansallovecoding",
    resave:true,
    saveUninitialized:true
}));

app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());


//local variables using middleware
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});



//Load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');
const comments = require('./routes/admin/comments');

//use routes
app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use('/admin/categories',categories);
app.use('/admin/comments',comments);


const port = process.env.PORT || 4111;

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});