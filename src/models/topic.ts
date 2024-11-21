import mongoose, { Schema, Document } from "mongoose";

export interface ITopic extends Document {
  name: string;
  description: string;
  category: string;
  postCount: number;
}

const TopicSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  postCount: { type: Number, default: 0 },
});

export default mongoose.models.Topic || mongoose.model<ITopic>("Topic", TopicSchema);