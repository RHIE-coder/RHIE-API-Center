const crypto = require("crypto");

const header = {
    alg: "HS256", //HMAC with SHA-256
    typ: "JWT"
}

const payload = {
    sub: '1234567890',
    name: 'John Doe',
    iat: 1516239022,
}

function base64UrlEncode(jsonObject){
    return Buffer.from(JSON.stringify(jsonObject),"utf-8").toString('base64').replaceAll("=","")
}

function base64UrlDecode(base64String){
    return JSON.parse(Buffer.from(base64String,"base64").toString('utf-8'))
}

function generateSecretKey(){
    // base64 encoded random string
    return Buffer.from(Math.round((new Date().valueOf() * Math.random())) + '',"base64").toString("utf-8")
    // return crypto.randomBytes(64).toString('base64').replaceAll("=","")
}

function digestAsSignature(header, payload){
    const secretKey = generateSecretKey()
    return {  
        signature: crypto.createHmac('sha256', secretKey).update(header+"."+payload).digest('base64').replaceAll("=",""), 
        secretKey 
    }
}

function getJwtFormat(header, payload){
    const {signature, secretKey } = digestAsSignature(header, payload)
    return {
        jwt: `${header}.${payload}.${signature}`,
        secret: secretKey.replaceAll("=",""),
    } 
}

const headerBase64 = base64UrlEncode(header);
const payloadBase64 = base64UrlEncode(payload);

// console.log(getJwtFormat(headerBase64, payloadBase64))

// console.log(base64UrlDecode("pPygHTH2kx4y2yaJaZOps0djmQdpCr2d5hTG9pfIj_g"))

const randomStringSource = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

