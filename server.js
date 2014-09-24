var Twitter = require('./twitter');

var config = {
    consumerKey: "",
    consumerSecret: "",
    accessTokenKey: "",
    accessTokenSecret: "",
    filterParams: {
        track: ['Obama']
    },
    maxTime: 5000, // in milliseconds
    maxNum: 10,
};

function display(data) {
    var tweets = '';
    for (var i = 0; i < data.length; i++) {
        tweets += 'TWEET ' + i + ':\n' + data[i]['text'] + '\n\n';
    }
    console.log('------------------------------START PACKAGE------------------------------\n');
    console.log(tweets);
    console.log('-------------------------------END PACKAGE-------------------------------\n');
    console.log('\n');
}

var twitter = new Twitter(config);
twitter.stream();
twitter.on('data', display);
