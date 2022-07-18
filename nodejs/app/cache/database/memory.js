class MemoryDB {

    #data

    constructor(){
        this.#data = {}
    }

    async set(key, value){
        this.#data[key] = value;
        return true;
    }

    async get(key){
        return this.#data[key];
    }

    async remove(key){
        delete this.#data[key];
        return true;
    }
    
}

module.exports = {
    MemoryDB,
}