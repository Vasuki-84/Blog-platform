import { Schema,model } from "mongoose";
import { type } from "os";

const enquirySchema= new Schema(
 {
    name: {
        type:String,
        required:true
    },
    email:{
         type:String,
        required:true
    },
    message:{
         type:String,
        required:true
    }
 }
);

const EnquiryModel= model.Enquiry || model("Enquiry",enquirySchema);

export default EnquiryModel;