const axios = require('axios');
const API_KEY = 'WBBcwnwQpV89';
// interface getDataParams {
//   searchValue: string;
//   languageTarget?: string;
// }

exports.getSentences = async (args) => {
  const fullUrl = `https://api.tracau.vn/${API_KEY}/s/${encodeURI(args.searchValue)}/${args.languageTarget};
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
    console.log('result', result);
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};
