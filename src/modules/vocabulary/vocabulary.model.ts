import mongoose, { Schema } from "mongoose";
import { TVocabulary } from "./vocabulary.interface";


const vocabularyShema = new Schema<TVocabulary>({
  word: {
    type: String,
    required: true,
    trim: true,
  },
  pronunciation: {
    type: String,
    required: true,
    trim: true,
  },
  when_to_say: {
    type: String,
    required: true,
    trim: true,
  },
  lesson_no: {
    type: String,
    required: true,
    trim: true,
  },
  admin_email: {
    type: String,
    required: true,
  },
});

const Vocabulary = mongoose.model("Vocabulary", vocabularyShema);

export default Vocabulary;
