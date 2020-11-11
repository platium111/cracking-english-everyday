const axios = require('axios');
const API_KEY = 'WBBcwnwQpV89';
// interface getDataParams {
//   searchValue: string;
//   languageTarget?: string;
// }

exports.getSentences = async (args) => {
  const fullUrl = `https://api.tracau.vn/${API_KEY}/s/${encodeURI(args.searchValue)}/${args.languageTarget}`;

  const headers = {
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12',
  };
  try {
    axios.get(fullUrl, { headers }).then((response) => {
      return response;
    });
  } catch (err) {
    console.log(err);
    return;
  }
};
