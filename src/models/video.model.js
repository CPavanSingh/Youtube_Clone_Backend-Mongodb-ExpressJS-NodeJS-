import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videofile:{
        type:String, // aws s3
        required:true,
    },
    thumbnail:{
        type:String, // aws s3
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:500
    },
    duration:{
        type:String,
        required:true,
    },
    views:{
        type:Number,
        default:0
    },
    ispulished:{
        type:Boolean,
        default:true
    },
}, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video",videoSchema);