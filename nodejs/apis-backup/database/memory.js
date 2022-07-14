const schemaList = require("")

class MemoryDB {

    #tables

    constructor(){
        this.#tables = {}
    }

    setTable(table){
        if(!(table instanceof Table)) throw new TypeError(`the argument must be <Table>`);
        this.#tables[table.getName()] = table;
    }

    getTable(tableName){
        return this.#tables[tableName];
    }

    removeTable(tableName){
        delete this.#tables[tableName];
        return true;
    }
}

class Table {
    
    #name
    #schema
    #schemaInstance

    constructor(name, schema){
        this.#name = name;
        this.#schema = schema;
        this.#schemaInstance = []
    }

    getName(){
        this.#name;
    }

    getData(){
        return this.#data;
    }

    setData(schemaInstance){
        if(!(schemaInstance instanceof this.#schema)) throw new TypeError(`the schema of data must be <${this.#schema.name}>`)
        this.#schemaInstance = schemaInstance;
    }

}

module.exports = {
    MemoryDB,
    Table,
}