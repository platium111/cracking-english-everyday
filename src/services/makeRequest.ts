import axios from 'axios';

export interface getDataParams {
  searchValue: string;
  languageTarget?: string;
}

export const getSentences = async (args: getDataParams) => {
  const fullUrl = `http://localhost:3001/`;
  return await axios.get(fullUrl, { params: args });
};
