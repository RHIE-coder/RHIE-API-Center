class MemoryDB {

    #data

    constructor(){
        this.#data = {}
    }

    set(key, value){
        this.#data[key] = value;
    }

    get(key){
        return this.#data[key];
    }

    remove(key){
        delete this.#data[key];
        return true;
    }
}

module.exports = {
    MemoryDB,
}