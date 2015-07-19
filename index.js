// jshint esnext:true
import request from 'request';
import cli from 'cli';

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
            formData: {
                content: content,
                lexer: type,
                format: 'url'
            }
        }, (err, response, body) => {
            if (!err) {
                this.opts.onBeforeSuccess();
                console.log(`\n${body}`);
            } else {
                this.opts.onFail();
            }
        });
    }
}

export default Paster;
