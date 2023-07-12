class API_RequestHandler {
    constructor(URL="https://fireschatappapi.azurewebsites.net", version="v1") {
        this.URL = `${URL}/api/${version}`; // https://fireschatappapi.azurewebsites.net/api/v1
    }

    async post(type, obj) {
        if (type == "MESSAGE") {
            if (!obj['from'] || !obj['to'] || !obj['content'] || !obj['time']) throw new Error('Missing required message properties.');
            return await fetch(`${this.URL}/messages/`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'omit',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj)
            });
        } else if (type == "USER") {
            if (!obj['user'] || !obj['pass']) throw new Error('Missing required user properties.');
            return await fetch(`${this.URL}/users/`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'omit',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj)
            });
        }
    
        else {
            throw new Error('Invalid POST type.');
        }
    }
    
    async get(type, obj) {
        if (type == "MESSAGE") {
            if (!obj['mid']) throw new Error('Missing required message properties.');
            return await fetch(`${this.URL}/messages/id/${obj['mid']}`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'omit'
            });
        } else if (type == "MESSAGES_FOR_USER") {
            if (!obj['uid']) throw new Error('Missing required user properties.');
            return await fetch(`${this.URL}/messages/usr/${obj['uid']}`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'omit'
            });
        } else if (type == "USER") {
            if (!obj['uid']) throw new Error('Missing required user properties.');
            return await fetch(`${this.URL}/users/${obj['uid']}`, {
                method: 'GET',
                mode: 'cors',
                credentials: 'omit'
            });
        }
        
        else {
            throw new Error('Invalid GET type.');
        }
    }
    
    async del(type, obj) {
        if (type == "MESSAGE") {
            if (!obj['mid']) throw new Error('Missing required user properties.');
            return await fetch(`${this.URL}/messages/id/${obj['mid']}`, {
                method: 'DELETE',
                mode: 'cors',
                credentials: 'omit'
            });
        }
    
        else {
            throw new Error('Invalid DELETE type.');
        }
    }
}