import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		medias: [String],
		tags: [String],
		public: {
			type: Boolean,
			default: false,
		}
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
