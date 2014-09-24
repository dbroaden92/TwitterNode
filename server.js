var Twitter = require('./twitter');

var config = {
    consumerKey: "kikWgQg1aGqtUO3C2hOesXJPR",
    consumerSecret: "7vHjYz57cTFH9Lceo6nIt9oAAYfPENzjgrq5D51HiBdIMhpQCr",
    accessTokenKey: "2796546726-Ks9o3k5UUAQK0f0QcJLXdKvZWcTa46YICnWEjBO",
    accessTokenSecret: "fo7G4pvZBeLu6lO7OLGUqXi0dYbjZCd4RSrjKYXHGp50g",
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
