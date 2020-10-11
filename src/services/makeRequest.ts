import axios from 'axios';
const API_KEY = 'WBBcwnwQpV89';
export interface getDataParams {
  searchValue: string;
  languageTarget?: string;
}

export const getSentences = async (args: getDataParams) => {
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const fullUrl = `https://api.tracau.vn/${API_KEY}/s/${encodeURIComponent(args.searchValue)}/${args.languageTarget};
  `;

  /* const urlEncoded = encodeURIComponent(fullUrl); */
  // console.log(urlEncoded);

  const headers = {
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  };
  try {
    const result = await axios.get(fullUrl, { headers });
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};
