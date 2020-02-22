"use strict";
var Twit = require('twit')
var T = new Twit({
    consumer_key:         'hlxSZJYlDMg2CJ6HwxYHdKJnV',
    consumer_secret:      't47z0lZAolmRhsTwrBzF2Fujhui2bMoRikO941NhmpBNEvBVJi',
    access_token:         '2596736233-bEsTPJBhMpiuhPD5ITt3rWmKRZiDu9lZb4Xnmpl',
    access_token_secret:  'lbinHCPPrwz0ok5vMMAHNjb6c7chUcbRqC5lYwFFXAS3D',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            false,     // optional - requires SSL certificates to be valid.
})

module.exports.handler = (event, context, callback) => {
    console.log(`Inside the api`);
    T.get('search/tweets', { q: '#forksup', count: 150 }, function(err, data, response) {
        // Do something with the JSON data returned.
        //  (Consult Twitter's documentation on the format: 
        //    https://dev.twitter.com/rest/reference/get/search/tweets)
        let result = [];
        data.statuses.forEach(function(status) {
            //etc      
            result.push({"text":status.text});
         })
      
        var response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS 
            },
            body: JSON.stringify(result)
        };
        context.succeed(response);
    });
    
};