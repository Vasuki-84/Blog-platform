import { model, Schema, models } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

postSchema.virtual("short_description").get(function () {
  return this.description?.slice(0, 30) + "...";
});

postSchema.virtual("created_at_formatted").get(function () {
  return changeDateFormat(this.created_at);
});

function changeDateFormat(date) {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const PostModel =
  models.PostBlog || model("PostBlog", postSchema);

export default PostModel;