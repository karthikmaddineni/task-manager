const Task=require('../models/task')
const User=require('../models/user')
const bcrypt=require('bcryptjs')
const nodemailer=require('nodemailer');
const crypto=require('crypto');
const { buffer } = require('stream/consumers');
const {validationResult}=require('express-validator');
const { error } = require('console');
const transpoter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'karthikmaddineni7@gmail.com',
        pass:'thdz znya bzrf lzmo',
    }
})
exports.login_=(req,res,next)=>{
    let message_s=req.flash('s_log');
    if (message_s.length>0){
        message_s=message_s[0];
    }else{
        message_s=null;
    }
    let message=req.flash('error');
    if (message.length>0){
        message=message[0];
    }else{
        message=null;
    }
    res.render('login_form',{

        errMessage:message,
        s_Message:message_s,
        oldInput:{
            email:'',
            password:''
        }
    
    })

}
exports.postlogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    User.findOne( { email : email} )
    .then(user=>{
        if(!user){
            req.flash('error','invalid email or password');
   
            return res.render('login_form',{
                errMessage:'Inavalid password or email',
                s_Message:'',
                oldInput:{
                    email:email,
                    password:password,
                }
            }); 
        }
        bcrypt.compare(password, user.password)
        .then(doMatch=>{
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }
            res.redirect('/login');
        })
        .catch(err=>{
            console.log(err);
            res.redirect('/login');
        });
    })
    .catch(err=>console.log(err));
}
exports.logout_=(req,res,next)=>{
    req.session.destroy((err)=>{
            console.log(err);
        res.redirect('/')
    })
}
exports.main=(req,res,next)=>{
    res.render('main',{login:req.session.isLoggedIn})
}

exports.forgot=(req,res,next)=>{
    console.log('sent0')
    res.render('reset',{});
}

exports.postReset=(req,res,next)=>{

}

exports.getNewPassword=(req,res,next)=>{
    const token=req.params.token;
    console.log('hello')
    User.findOne({
        resetToken: token,
        resetTokenExpire:{$gt: Date.now()}
    }).then(user=>{
        if (!user) {
            req.flash('error', 'Invalid or expired password reset token.');
            return res.redirect('/login'); // Redirect to login if token is invalid
        }
        let message=req.flash('error');
        if (message.length>0){
            message=message[0];
        }else{
            message=null;
        }
        res.render('new-password',{
            errMessage:message,
            userId:user._id.toString(),
            passwordToken:token,
        })
    })
    
}

exports.reset_password=(req,res,next)=>{
    
        crypto.randomBytes(32,(err,buffer)=>{
            if(err){
                console.log(err);
                return res.render('reset',{})
            }
            
            const token=buffer.toString('hex');
            const uemail=req.body.email;
            User.findOne({email:uemail})
            .then(user=>{
                if(!user){
                    req.flash('error','No account found')
                    return res.render('reset',{})
                }
                
                user.resetToken=token,
                user.resetTokenExpire=Date.now() + 360000;
                return user.save()
                .then(user=>{
                    console.log('reset mail sent')
                    res.render('main',{login:req.session.isLoggedIn})
                    transpoter.sendMail({
                        to:uemail,
                        from:'karthikmaddineni7@gmail.com',
                        subject:'Password Reset',
                        html:`Aree Erripuva please click the <a href='http://localhost:3000/reset/${token}'>link</a> to reset the password`
                    })
                })
            })
        })
    }

exports.postNewPassword=(req,res,next)=>{
    const newPassword=req.body.newPassword;
    const userId=req.body.userId;
    const passwordToken=req.body.passwordToken;
    User.findOne({
        resetToken: passwordToken,
        resetTokenExpire:{$gt: Date.now()},
        _id:userId,
    }).then(user=>{
        resetUser=user;
        return bcrypt.hash(newPassword,12);
    }).then(hashedPassword=>{
        resetUser.password=hashedPassword;
        resetUser.resetToken=undefined;
        resetUser.resetTokenExpire=undefined;
        return resetUser.save();
    }).then(result=>{
        res.render('main',{
            login:req.session.isLoggedIn
        })
    })
}
exports.signup_=(req,res,next)=>{
    let message=req.flash('err_signup');
    if (message.length>0){
        message=message[0];
    }else{
        message=null;
    }
    res.render('signup',{
        errMessage:message,
        oldInput:{
            emial:'',
            password:'',
            confirmPassword:''}
    });
}

exports.postsignup=(req,res,next)=>{
    const uemail=req.body.email
    const upassword=req.body.password
    const confirmPassword=req.body.confirmPassword;
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors.array())
        return res.status(422).render('signup',{
            errMessage:errors.array()[0].msg,
            oldInput:{
                email:uemail,
                password:upassword,
                confirmPassword:confirmPassword
            }    
        }) }

    User.findOne({ email: uemail })
    .then(userDoc => {
        if (userDoc) {
            req.flash('err_signup','user already exits please check email')
            return res.redirect('/signup');
    }
        return bcrypt
        .hash(upassword, 12)
        .then(hashedPassword => {
            const user = new User({
                email: uemail,
                password: hashedPassword,
                tasks: { tasks: [] }
            });
            return user.save();
        })
        .then(result => {
            req.flash('s_log','Account created successfully plse login to your account')
            return transpoter.sendMail({
                to: uemail,
                from:'karthikmaddineni7@gmail.com',
                subject:'Welcome to todo',
                html:`<h1>Welcome to ToDo!</h1><p>Thank you for signing up. We're excited to have you on board!</p>`
            }).then(()=>{
                console.log('email sent');
                res.redirect('/login')
            }).catch((err)=>{
                console.log(err)
            })
        })
        });
    }

