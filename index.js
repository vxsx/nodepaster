// jshint esnext:true
import request from 'request';

class Paster {
    constructor(api, opts = {
        onBeforeUpload() {},
        onBeforeSuccess() {},
        onFail() {}
    }) {
        this.api = api;
        this.opts = opts;
    }

    upload(content, type, expires) {
        this.opts.onBeforeUpload();
        request.post({
            url: this.api,
            rejectUnauthorized: false,
            formData: {
                content: content,
                lexer: type,
                format: 'url',
                expires: expires
            }
        }, (err, response, body) => {
            if (!err) {
                this.opts.onBeforeSuccess();
                console.log(`\n${body}`);
            } else {
                console.log(err);
                this.opts.onFail();
            }
        });
    }
}

export default Paster;
