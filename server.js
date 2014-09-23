var http = require('http');
var Stream = require('user-stream');

var tweet_data = '';

var page = '<html><head><title>Twitter Stream</title></head>';
page += '<body><p id="display">No data retrieved</p></body></html>';

var error = function (err, res, body) {
    console.log('ERROR:');
    console.log(err);
};
var success = function (data) {
    tweet_data = data.text + '<br><br>' + tweet_data;
    page = '<html><head><title>Twitter Stream</title></head>';
    page += '<body><p id="display">' + tweet_data + '</p></body></html>';
    console.log('Data:');
    console.log(data.text);
};

var config = {
    consumer_key: "kikWgQg1aGqtUO3C2hOesXJPR",
    consumer_secret: "7vHjYz57cTFH9Lceo6nIt9oAAYfPENzjgrq5D51HiBdIMhpQCr",
    access_token_key: "2796546726-Ks9o3k5UUAQK0f0QcJLXdKvZWcTa46YICnWEjBO",
    access_token_secret: "fo7G4pvZBeLu6lO7OLGUqXi0dYbjZCd4RSrjKYXHGp50g",
};

var stream = new Stream(config);

var params = {
    track: 'Obama'
};

stream.stream(params);

stream.on('data', success);

var server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end(tweet_data);
});
server.listen(8080);
