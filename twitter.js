var events = require('events');
var Stream = require('user-stream');
var util = require('util');

function Twitter(config) {
    events.EventEmitter.call(this);

    this.oauth = {
        consumerKey: config.consumerKey,
        consumerSecret: config.consumerSecret,
        accessTokenKey: config.accessTokenKey,
        accessTokenSecret: config.accessTokenSecret
    };
    this.filterParams = config.filterParams || {};
    this.maxNum = config.maxNum || 5;
    this.maxTime = config.maxTime || 10000;

    this.aggregateTweets = [{text: 'test'}];
    this.timeout;
}

util.inherits(Twitter, events.EventEmitter);

Twitter.prototype.stream = function() {
    var twitter = this;

    function publish() {
        var filteredTweets = [];
        for (var i = 0; i < twitter.aggregateTweets.length; i++) {
            var tweet = {};
            tweet.text = twitter.aggregateTweets[i].text;
            filteredTweets.push(tweet);
        }
        twitter.aggregateTweets = [];
        twitter.emit('data', filteredTweets);
    }

    function processData(data) {
        twitter.aggregateTweets.push(data);
        if (twitter.aggregateTweets.length >= twitter.maxNum) {
            clearTimeout(twitter.timeout);
            publish();
            twitter.timeout = setTimeout(timedOut, twitter.maxTime);
        }
    }

    function timedOut() {
        publish();
        twitter.timeout = setTimeout(timedOut, twitter.maxTime);
    }

    var stream = new Stream(this.oauth);
    stream.stream(this.filterParams);
    stream.on('data', processData);

    this.timeout = setTimeout(timedOut, this.maxTime);
}

module.exports = Twitter;
