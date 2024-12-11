import asyncHandler from "../../utils/asyncHandler";
import errorHandler from "../../utils/errorHandler";
import responseHandler from "../../utils/responseHandler";
import { VocabularyService } from "./vocabulary.service";

const createVocabulary = asyncHandler(async (req, res) => {
  const result = await VocabularyService.createVocabularyInDb(req.body);

  if (!result) {
    throw new errorHandler(
      500,
      "Something went wrong while creating new Vocabulary."
    );
  }

  res
    .status(200)
    .json(
      new responseHandler(200, true, result, "Vocabulary created successfully!")
    );
});

const updateVocabulary = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const payload = {
    _id,
    data: req.body,
  };

  const result = await VocabularyService.updateVocabularyInDb(payload);

  if (!result) {
    throw new errorHandler(
      500,
      "Something went wrong while creating new Vocabulary."
    );
  }

  res
    .status(200)
    .json(
      new responseHandler(200, true, result, "Vocabulary Updated Successfully")
    );
});

const deleteVocabulary = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const result = await VocabularyService.deleteVocabularyInDb(_id);

  if (!result) {
    throw new errorHandler(500, "Something went wrong while deleting Vocabulary.");
  }

  res
    .status(200)
    .json(
      new responseHandler(200, true, result, "Vocabulary deleted Successfully")
    );
});

const getAllVocabularys = asyncHandler(async (req, res) => {
  const { query } = req.query;

  const result = await VocabularyService.getAllVocabularysFromDb(
    (query as string) || ""
  );
  res
    .status(200)
    .json(
      new responseHandler(200, true, result, "Vocabularys Fetched Successfully")
    );
});

export const vocabularyController = {
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
  getAllVocabularys,
};
