import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    require: true,
    trim: true
  },
  image: {
    url: String,
    public_id: String
  },
}, {
  timestamps: true
});

const Post = mongoose.model("Post", postSchema);

export default Post;