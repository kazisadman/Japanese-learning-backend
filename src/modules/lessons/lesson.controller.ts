import asyncHandler from "../../utils/asyncHandler";
import errorHandler from "../../utils/errorHandler";
import responseHandler from "../../utils/responseHandler";
import { lessonService } from "./lesson.service";

const createLesson = asyncHandler(async (req, res) => {
  const result = await lessonService.createLessonInDb(req.body);

  if (!result) {
    throw new errorHandler(
      500,
      "Something went wrong while creating new lesson."
    );
  }

  res
    .status(200)
    .json(
      new responseHandler(200, true, result, "User registered successfully!")
    );
});

const updateLesson = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const payload = {
    _id,
    data: req.body,
  };

  const result = await lessonService.updateLessonInDb(payload);

  if (!result) {
    throw new errorHandler(
      500,
      "Something went wrong while creating new lesson."
    );
  }

  res
    .status(200)
    .json(
      new responseHandler(200, true, result, "Lesson Updated Successfully")
    );
});

const deleteLesson = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const result = await lessonService.deleteLessonInDb(_id);

  if (!result) {
    throw new errorHandler(500, "Something went wrong while deleting lesson.");
  }

  res
    .status(200)
    .json(
      new responseHandler(200, true, result, "Lesson deleted Successfully")
    );
});

const getAllLessons = asyncHandler(async (req, res) => {
  const { query } = req.query;

  const result = await lessonService.getAllLessonsFromDb(
    (query as string) || ""
  );

  if (!result) {
    throw new errorHandler(500, "Something went wrong while deleting lesson.");
  }

  res
    .status(200)
    .json(
      new responseHandler(200, true, result, "Lessons Fetched Successfully")
    );
});

export const lessonController = {
  createLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
};
