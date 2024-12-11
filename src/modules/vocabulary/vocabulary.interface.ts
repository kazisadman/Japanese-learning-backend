export type TVocabulary = {
  word: string;
  pronunciation: string;
  when_to_say: string;
  lesson_no: string;
  admin_email: string;
};

export type TUpadateVocabulary = {
  _id: string;
  data: Partial<TVocabulary>;
};
