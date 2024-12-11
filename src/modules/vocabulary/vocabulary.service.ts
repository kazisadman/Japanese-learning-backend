import { TUpadateVocabulary, TVocabulary } from "./vocabulary.interface";
import Vocabulary from "./vocabulary.model";


const createVocabularyInDb = async (payload: TVocabulary) => {
  const result = await Vocabulary.create(payload);
  return result;
};

const updateVocabularyInDb = async ({ _id, data }: TUpadateVocabulary) => {
  const result = await Vocabulary.findByIdAndUpdate(_id, data, { new: true });
  return result;
};

const deleteVocabularyInDb = async (payload: string) => {
  const data = await Vocabulary.findByIdAndDelete(payload);
  return data;
};

const getAllVocabularysFromDb = async (queryTerm: string) => {
  if (queryTerm) {
    const data = await Vocabulary.aggregate([
      {
        $search: {
          index: "Vocabulary_search",
          text: {
            query: queryTerm,
            path: ["pronunciation"],
          },
        },
      },
    ]);
    return data;
  } else {
    const data = await Vocabulary.find();
    return data;
  }
};

export const VocabularyService = {
  createVocabularyInDb,
  updateVocabularyInDb,
  deleteVocabularyInDb,
  getAllVocabularysFromDb,
};
