const crypto = require("crypto")

// 1. server creates secret key and send to client
const secretKey256 = crypto.randomBytes(64).toString("base64").replaceAll("=","")

// 2. client sends to server
const data = {
    name: "rhie",
    age: 30
}

const hmacSha256 = crypto.createHmac('sha256', secretKey256).update(JSON.stringify(data)).digest("hex")

// 3. server verify the request



// crypto.randomBytes(64).toString().replaceAll("=","")

// crypto.createHmac('sha256', secretKey).update(header+"."+payload).digest('base64').replaceAll("=",""), 

// Buffer.from(JSON.stringify(jsonObject),"utf-8").toString('base64').replaceAll("=","")
// JSON.parse(Buffer.from(base64String,"base64").toString('utf-8'))

const objCheck = {
    target: "a",
    source: "b"
}

console.log(Object.keys(objCheck))