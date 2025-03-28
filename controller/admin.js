const Task=require('../models/task')
const teamTask=require('../models/team_task')
const User=require('../models/user')

exports.add=(req,res,next)=>{
    res.render('add',{login:req.session.isLoggedIn})
}

exports.add_team=(req,res,next)=>{
    res.render('add_team',{login:req.session.isLoggedIn})
}

exports.postAdd=(req,res,next)=>{
    const title=req.body.title;
    const subject=req.body.subject;
    const todo=req.body.todo;
    const time=req.body.time;
    
    //id_=req.user._id
    const task=new Task({
        title : title,
        subject : subject,
        todo : todo,
        time : time,
        userId: req.user
    });
    //console.log(req.user._id)

    task.save()
    .then(tasks=>{
        console.log('Task has been created')
        res.render('main',{login:req.session.isLoggedIn})
    
    })
    .catch(err=>{
    console.log(err)
    })
}

exports.postSearch=(req,res,next)=>{
    const key=req.body.search;
    Task.find({title:{$regex: key,$options :'i'}})
    .then(tasks=>{
        console.log(key)
        console.log(tasks)
        res.render('tasks',{
            tasks:tasks,
            login:req.session.isLoggedIn
        })
    })

}
exports.postAdd_team=(req,res,next)=>{
    const title=req.body.title;
    const subject=req.body.subject;
    const todo=req.body.todo;
    const time=req.body.time;
    const members=req.body.members;
    
    //id_=req.user._id
    const task=new teamTask({
        title : title,
        subject : subject,
        todo : todo,
        time : time,
        members : members,
        userId: req.user
    });
    //console.log(req.user._id)

    task.save()
    .then(tasks=>{
        console.log('teamTask has been created')
        res.render('main',{login:req.session.isLoggedIn})
    
    })
    .catch(err=>{
    console.log(err)
    })
}

exports.todolists=(req,res,next)=>{
    
    Task.find({userId:req.user._id})
    //select('title price -id') title and price willbe included and id is excluded
    .populate('userId','name')//only name and id
    .then(tasks=>{
        //console.log(tasks);
        res.render('tasks',{tasks:tasks,login:req.session.isLoggedIn})
        console.log('tasks fetced successfully')
    }).catch(err=>{
        console.log(err)
    })
}

exports.info=(req,res,next)=>{
    const id=req.params.id;
    Task.findById(id).then(tasks=>{
        res.render('info',{tasks:tasks})
        console.log('requested task has been fetched')
    }).catch(err=>{
        console.log(err);
    })
}

exports.editOne=(req,res,next)=>{
    const id=req.params.id;
    Task.findById(id).then(tasks=>{
        res.render('edit',{tasks:tasks,login:req.session.isLoggedIn})
    }).catch(err=>{
        console.log(err);
    })
}
exports.postEdit=(req,res,next)=>{
    const id=req.params.id;
    const ntitle=req.body.title
    const nsubject=req.body.subject
    const ntodo=req.body.todo
    const ntime=req.body.time

    Task.findById(id).then(task=>{
        task.title=ntitle;
        task.subject=nsubject;
        task.todo=ntodo;
        task.time=ntime;
        return task.save()
})
    .then(result=>{
        res.render('main',{login:req.session.isLoggedIn})
        console.log('task has been updated..')
    }).catch(err=>{
        console.log(err)
    })
    
}

exports.deleteOne=(req,res,next)=>{
    const id=req.params.id;
    Task.deleteOne({_id:id})
    .then(tasks=>{
        console.log('task has been deleted successfully')
        res.render('main',{login:req.session.isLoggedIn})
    }).catch(err=>{
        console.log(err);
    })
}
