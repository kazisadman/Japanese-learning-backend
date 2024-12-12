import Lesson, { TLesson } from "./lesson.model";

type TUpdateLesson = {
  _id: string;
  data: Partial<TLesson>;
};

const createLessonInDb = async (payload: TLesson) => {
  const result = await Lesson.create(payload);
  return result;
};

const updateLessonInDb = async ({ _id, data }: TUpdateLesson) => {
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
    const data = await Lesson.aggregate([
      {
        $lookup: {
          from: "vocabularies",
          localField: "number",
          foreignField: "lesson_no",
          as: "result",
        },
      },
      {
        $addFields: {
          word_count: {
            $size: "$result",
          },
        },
      },
    ]);
    return data;
  }
};

const getLessonsByNoFromDB = async (payload: number) => {
  console.log(typeof payload)
  const lesson = await Lesson.aggregate([
    {
      $match: {
        number: payload,
      },
    },
    {
      $lookup: {
        from: "vocabularies",
        localField: "number",
        foreignField: "lesson_no",
        as: "words",
      },
    },
  ]);
  return lesson;
};

export const lessonService = {
  createLessonInDb,
  updateLessonInDb,
  deleteLessonInDb,
  getAllLessonsFromDb,
  getLessonsByNoFromDB,
};
