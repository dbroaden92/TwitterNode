var http = require('http');
var Twitter = require('twitter-js-client').Twitter;

var tweet_data = '';

var page = '<html><head><title>Twitter Stream</title></head>';
page += '<body><p id="display">No data retrieved</p></body></html>';

var error = function (err, res, body) {
    console.log('ERROR:');
    console.log(err);
};
var success = function (data) {
    tweet_data += data + '\n\n';
    page = '<html><head><title>Twitter Stream</title></head>';
    page += '<body><p id="display">' + tweet_data + '</p></body></html>';
    console.log('Data [%s]', data);
};

var config = {
    consumerKey: "kikWgQg1aGqtUO3C2hOesXJPR",
    consumerSecret: "7vHjYz57cTFH9Lceo6nIt9oAAYfPENzjgrq5D51HiBdIMhpQCr",
    accessTokenKey: "2796546726-Ks9o3k5UUAQK0f0QcJLXdKvZWcTa46YICnWEjBO",
    accessTokenSecret: "fo7G4pvZBeLu6lO7OLGUqXi0dYbjZCd4RSrjKYXHGp50g",
    callBackUrl: "http://www.google.com"
};

twitter = new Twitter(config);
twitter.getUserTimeline({screen_name: 'katyperry', count: '10'}, error, success);

var server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end(page);
});
server.listen(8080);
