const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email: {
        type: String,
        required: true,
        
    },
    password:{
        type: String,
        required: true,
    },
    resetToken: String,
    resetTokenExpire: Date,
    tasks:{
        tasks:[{
            taskId:{
                type: Schema.Types.ObjectId,
                ref: 'Task',
            }
        }
        ]
    }
});

module.exports=mongoose.model('User',userSchema);



/*const Sequelize=require('sequelize');
const sequelize=require('../database/database');
const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    userName:{
        type:Sequelize.STRING,
        
    },
    userEmail:{
        type: Sequelize.STRING,
        
    }
})
module.exports = User;
const {ObjectId}=require('mongodb');
const getDb=require('../database/database').getDb;
class User{
    constructor(username,email){
        this.name=username;
        this.email=email;
    }
    save(){
        const db=getDb();
        db.collection('users').insertOne(this)
    }
    static findById(userId){
        const db=getDb();
        return db.collection('users').findOne({_id:new ObjectId(userId)})
        .then(user=>{
            console.log(user);
            return user
        }).catch(err=>{
            console.log(err);
        })
    }
}
module.exports=User;
*/
