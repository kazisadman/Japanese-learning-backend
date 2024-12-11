import { Types } from "mongoose";
import errorHandler from "../../utils/errorHandler";
import Lesson, { TLesson } from "./lesson.model";

type TUpdateProduct = {
  _id: string;
  data: Partial<TLesson>;
};

const createLessonInDb = async (payload: TLesson) => {
  const result = await Lesson.create(payload);
  return result;
};

const updateLessonInDb = async ({ _id, data }: TUpdateProduct) => {
  const result = await Lesson.findByIdAndUpdate(_id, data, { new: true });
  return result;
};

const deleteLessonInDb = async (payload: string) => {
  const data = await Lesson.findByIdAndDelete(payload);
  return data;
};

const getAllLessonsFromDb = async (queryTerm: string) => {
  if (queryTerm) {
    const data = await Lesson.aggregate([
      {
        $search: {
          index: "Lesson_search",
          text: {
            query: queryTerm,
            path: ["name", "number"],
          },
        },
      },
    ]);
    return data;
  } else {
    const data = await Lesson.find();
    return data;
  }
};

export const lessonService = {
  createLessonInDb,
  updateLessonInDb,
  deleteLessonInDb,
  getAllLessonsFromDb,
};
