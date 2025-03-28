const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const teamtaskSchema=new Schema({
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
    members:{
        type: String,
        required: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }   
});

module.exports=mongoose.model('teamTask',teamtaskSchema);

