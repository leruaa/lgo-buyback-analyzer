const https = require('https');

module.exports = (req, res) => {


  const request = new Promise((resolve, reject) => {
    https.get('https://storage.googleapis.com/lgo-buyback-prod/buyback.csv', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        resolve(data);
      });
    });
  });

  request.then(data => res.status(200).send(data));
};
