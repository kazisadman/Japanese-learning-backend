import mongoose, { Schema } from "mongoose";

export type TLesson = {
  name: string;
  number: number;
};

const lessonSchema = new Schema<TLesson>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
