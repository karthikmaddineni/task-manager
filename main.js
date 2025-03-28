const express=require('express')
const path=require('path')
const Task=require('./models/task');
const bodyParser = require('body-parser');
const session=require('express-session');
const mongoDBStore=require('connect-mongodb-session')(session);
const app=express()
const User=require('./models/user')
const controller=require('./controller/admin')
const controller2=require('./controller/auth')
const mongoose=require('mongoose');
const csrf=require('csurf');
const flash=require('connect-flash');
const {check,body}=require('express-validator');
const MONGO_URI='mongodb+srv://karthikmaddineni7:Karthik575@cluster0.unpvr.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0'
const store=new mongoDBStore({
    uri:MONGO_URI,
    collection:'sessions'
})

const csrfProtection = csrf();
app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'karthik maddineni',
    resave:false,
    saveUninitialized: false,
    store: store,
}))
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if(!user){
                return next();
            }
        req.user = user;
        next();
    })
    .catch(err => {
        throw new Error(err);
    });
});
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use('/reset_password',controller2.reset_password);
app.get('/forgot',controller2.forgot);
app.get('/add',controller.add);
app.get('/add_team',controller.add_team);
app.get('/edit/:id',controller.editOne)
app.use('/postedit/:id',controller.postEdit);
app.get('/delete',controller.todolists)
app.use('/logout',controller2.logout_);
app.get('/login',controller2.login_);
app.use('/postlogin',controller2.postlogin);
app.use('/delete/:id',controller.deleteOne);
app.use('/info/:id',controller.info);
app.use('/todo_lists',controller.todolists);
app.post('/postadd',controller.postAdd);
app.post('/search',controller.postSearch);
app.post('/postadd_team',controller.postAdd_team);
app.use('/signup',controller2.signup_)
app.use('/postsignup',
    [
    check('email')
        .isEmail()
        .withMessage('please enter a valid emial')
        .custom((value,{req})=>{
            if(value==='test@test.com'){
                throw new Error('This emial is blocked')
            }
            return true
        }),
    body('password','password must be lenght of 3 to 8 and alphanumeric')
        .isLength({min:5,max:8}),
    body('confirmPassword').custom((value,{req})=>{
        if(value!==req.body.password){
            throw new Error('passwords need to match')
        }
        return true
    })
    ],controller2.postsignup)
app.use('/postreset',controller2.postReset)
app.use('/new_password',controller2.postNewPassword)

app.use('/reset/:token',controller2.getNewPassword);
app.get('/',controller2.main);

mongoose.connect(MONGO_URI)
    .then(result=>{
        app.listen(3000);
        console.log(`connected to data base and running on port:3000`)
}).catch(err=>{
    console.log(err)
})

