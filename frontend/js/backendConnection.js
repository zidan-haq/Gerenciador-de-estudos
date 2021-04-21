const urlBackend = "http://127.0.0.1:8080/";


export class Backend {
    constructor(path) {
        this.path = path;
    }
    get promisseGET() {
        return fetch(urlBackend + this.path);
    }

    promisseGETOne(id) {
        return fetch(`${urlBackend}${this.path}/${id}`);
    }

    promissePUT(body) {
        return fetch(urlBackend + this.path, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
    }

    promissePOST(body) {
        return fetch(urlBackend + this.path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
    }

    promisseDELETE(id) {
        return fetch(`${urlBackend}${this.path}/${id}`, {
            method: 'DELETE'
        });
    }
}

