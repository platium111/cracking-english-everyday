import axios from 'axios';

export interface getDataParams {
  searchValue: string;
  languageTarget?: string;
}

export const getSentences = async (args: getDataParams) => {
  // http://localhost:3001/
  const fullUrl = `https://nk3mrgnqu9.execute-api.us-east-1.amazonaws.com/dev/lookup`;
  return await axios.get(fullUrl, { params: args });
};
