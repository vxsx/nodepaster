// jshint esnext:true
class Paster {
    constructor(api) {
        this.api = api;
    }
}

export default new Paster('https://dpaste.de/api/');
