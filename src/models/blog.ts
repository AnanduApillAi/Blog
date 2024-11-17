// models/Blog.ts

import mongoose, { Schema, Document } from "mongoose"

export interface IBlog extends Document {
  title: string
  slug: string
  content: string
  author: string
  createdAt: Date
  topics: string[]; // Add topics as an array of strings
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  topics: { type: [String], required: true }, // Define topics as an array of strings
})

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema)
