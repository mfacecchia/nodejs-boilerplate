async function fetchFromServer(endpoint, options = {}){
    /**
     * Fetches the server and returns an Object with the result and the response in JSON format...
     * ...or throws an `Error` in case no response is returned from the server or the `options` parameter is not an `Object`
     * NOTE: The `options` parameter MUST be an `Object`
     */
    try{
        if(options && !isObject(options)) throw new Error('Could not fetch data.');
        const res = await fetch(`http://localhost:3000${endpoint}`, options);
        const jsonRes = await res.json();
        return {
            successful: res.ok,
            jsonRes: jsonRes
        };
    }catch(err){
        throw new Error('Could not fetch data. Please try again later.');
    }
}