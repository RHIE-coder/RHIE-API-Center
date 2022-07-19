const { Crypto } = require("../common/lib/utils")
const axios = require('axios');

async function main() {
    const secretKey = "yegS8s2Azst/i4eB3DHsbvJw8fA7Kp0/0egtJEND+NcTya1NcTc8VrnUyLeDg2Nk/YTPhcuic6QotwMgbZHgTA"
    const data = {
        username:'rhie@example.com',
        numbers: [1,2,3,4,5]
    }
    const nowTime = Date.now()

    const signature = Crypto.createHmacSha256({
        secretKey,
        data: data + ', ' + nowTime + ', ' + data.username
    });

    const requestOptions = {
        baseURL:'http://localhost:3020',
        url: '/api/v1/math/sum',
        method: 'get',
        data,
        headers:{
            ['X-Timestamp']: nowTime,
            ['Authorization']: signature,
        }
    }

    console.log(`timestamp: ${nowTime}`);
    console.log(`signature: ${signature}`);

    const resp = await axios(requestOptions);
    console.log(resp.data);

    const result = await afterCount(15, async ()=>{
        return axios(requestOptions);
    });
    console.log(result.data);
}

function afterCount(when, callback) {

    let count = 0;
    const until = when;

    return new Promise(resolve => {
        setInterval(function () {
            console.clear();
            if (count === until) {
                clearInterval(this);
                resolve(callback());
            }else {
                count++;
                console.log(count);
            }
        }, 1000)
    });
}

main();
