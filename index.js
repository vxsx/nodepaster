// jshint esnext:true
import request from 'request';

class Paster {
    constructor(api) {
        this.api = api;
    }

    upload(content, type, expires) {
        // TODO add progress
        request.post({
            url: this.api,
            formData: {
                content: content,
                lexer: type,
                format: 'url'
            }
        }, function (err, response, body) {
            // TODO handle errors
            if (!err) {
                console.log(`\n${body}`);
            }
        });
    }
}

export default new Paster('https://dpaste.de/api/');
