import { model, Schema,models } from "mongoose";

const postSchema = new Schema({
    title:String,
    description:String,
    image:String
});
const PostModel= models.PostBlog ||  model('PostBlog',postSchema);
export default PostModel;