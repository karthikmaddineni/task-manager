const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const taskSchema=new Schema({
    title: {
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    todo:{
        type: String,
        required: true,
    },
    time:{
        type: Date,
        required: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }   
});

module.exports=mongoose.model('Task',taskSchema);





/*const getDb=require('../database/database').getDb;
const {ObjectId}=require('mongodb');
class Task{
    constructor(title,subject,todo,time,user){
        this.title=title;
        this.subject=subject;
        this.todo=todo;
        this.time=time;
        this.user=user;
    }
    save(){
        const db=getDb();
        return db.collection('tasks').insertOne(this)
        .then(result=>{
            console.log('success')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    static fetchAll(){
        const db=getDb();
        return db.collection('tasks')
        .find()
        .toArray()
        .then(tasks=>{
            console.log('fetced all tasks successfuly')
            return tasks
        })
        .catch(err=>{
            console.log(err)
        });
    }
    static findOne(id){
        const db=getDb();
        return db.collection('tasks').findOne({ _id: new ObjectId(id) })
        .then(tasks=>{
            return tasks 
        }).catch(err=>{
            console.log(err)
        });
    }
    static editOne(id){
        const db=getDb();
        return db.collection('tasks').findOne({ _id: new ObjectId(id) })
        .then(tasks=>{
            return tasks 
        }).catch(err=>{
            console.log(err)
        });
    }
    static updateOne(id,newtitle,newsubject,newtodo,newtime){
        const db=getDb();
        return db.collection('tasks').updateOne({
            _id: new ObjectId(id)
        },{$set:{title:newtitle,subject:newsubject
            ,todo:newtodo,time:newtime
        }}).then(console.log('task updated succesfully')).
        catch(err=>{
            console.log(err)
        })
    }
    static deleteOne(id,newtitle,newsubject,newtodo,newtime){
        const db=getDb();
        return db.collection('tasks').deleteOne({_id: new ObjectId(id)})
        .then(console.log('task deleted succesfully')).
        catch(err=>{
            console.log(err)
        })
    }
}


module.exports= Task;*/