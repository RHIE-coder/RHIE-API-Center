class JsonRpcRequester {

    #baseURL
    #axios

    constructor(baseURL) {
        this.#baseURL = baseURL;
        this.#axios = require('axios').create({baseURL});
    }

    get baseURL() {
        return this.#baseURL
    }

    /*  
        method:string;
        params?:string[];
        id?:number;
    */
    async request(req) {
        const body = { jsonrpc: '2.0', ...req}
        return (await this.#axios.post("/", body)).data
    }
}


class ResponseBody {

    #resData

    constructor(){
        this.#resData = {
            status: null,
            data: null,
            message: null,
        }
    }

    error(message){
        this.#resData.status = "error";
        this.#resData.message = message;
    }

    success(data){
        this.#resData.status = "success";
        this.#resData.data = data;
        this.#resData.message = 200;
    }

    json(){
        return this.#resData;
    }

}

module.exports = {
    JsonRpcRequester,
    ResponseBody,
}