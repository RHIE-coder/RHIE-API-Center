function validate(target){
    return new Validator(target);
}

class Validator {

    #target;
    #resultStream;

    constructor(target){
        this.#target = target;
        this.#resultStream = [];
    }

    null() {
        const isTargetNull = (
            this.#target === null ||
            this.#target === undefined ||
            this.#target === ""
        ) ? true : false;

        this.#resultStream.push(isTargetNull)

        return this;
    }

    notNull() {
        const isTargetNotNull = (
            this.#target !== null &&
            this.#target !== undefined &&
            this.#target !== ""
        ) ? true : false;

        this.#resultStream.push(isTargetNotNull)

        return this;
    }

    checkPrimitive(typeExpected) {
        let typeName;
    
        if (typeExpected === Boolean) {
            typeName = typeof Boolean
        } else if (typeExpected === Number) {
            typeName = typeof Number
        } else if (typeExpected === BigInt) {
            typeName = typeof BigInt
        } else if (typeExpected === String) {
            typeName = typeof String
        } else if (typeExpected === Symbol) {
            typeName = typeof Symbol
        } else {
            typeName = null;
        }
        
        return typeName;
    }

    type(typeExpected) {
        const primitiveString = this.checkPrimitive(typeExpected)

        if(primitiveString) {
            this.#resultStream.push(this.#target === primitiveString)
        } else {
            this.#resultStream.push(this.#target instanceof typeExpected)
        }
        
        return this;
    }

    jsonKeys(properties){
        if(!(properties instanceof Array)) {
            throw new TypeError('Arguments must be <Array> type')
        }

        let isAllMatched;

        const isTargetNull = (
            this.#target === null ||
            this.#target === undefined ||
            this.#target === ""
        ) ? true : false;

        if(isTargetNull) {
            isAllMatched = false;
        } else {
            const keys = Object.entries(this.#target).map(arr=>arr[0])

            isAllMatched = keys.length === properties.length
            
            for(const property of properties) {
                if(!isAllMatched) {
                    break;
                }
                isAllMatched = keys.includes(property)
            }
        }

        this.#resultStream.push(isAllMatched);

        return this;
    }

    async done(){
        return this.#resultStream.every(trueOrFalse => trueOrFalse === true)
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

    getBody(){
        return this.#resData;
    }
}

module.exports = {
    validate,
    ResponseBody
}