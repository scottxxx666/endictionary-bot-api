'use strict';

var scraper = require('./scraper');

function processEvent(event, callback) {
    const input = retrieveInput(event);

    scraper.scraper(input.query, callback)(function (err, obj) {
        const keyword = obj.keyword || obj.keyword2;
        const kk = obj.kk || '';
        const tranlate = obj.chinese || obj.tranlate;
        const text = `${keyword}\n - ${kk}\n - ${tranlate}`;

        const response = {
            keyword: keyword,
            kk: kk,
            text: text
        };

        callback(null, {
            statusCode: '200',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'UTF-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(response),
        });
    });
}

function retrieveInput(event) {
    if (!('httpMethod' in event)) {
        return event;
    }
    if (event.httpMethod == 'GET') {
        return event.queryStringParameters;
    }
    return JSON.parse(event.body);
}


exports.handler = (event, context, callback) => {
    processEvent(event, callback);
};
