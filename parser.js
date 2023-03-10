const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
let inf = []

for (let page = 1; page <= 40; page++) {
    request(`https://www.bbc.com/ukrainian/topics/czp6w66edqpt?page=${page}`, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const $ = cheerio.load(body);
            for (let i = 1; i <= 24; i++) {
                let text = $(`#main-wrapper > div > main > div > div:nth-child(3) > ul > li:nth-child(${i}) > div > div.promo-text > h2 > a`).text()
                let img = $(`#main-wrapper > div > main > div > div:nth-child(3) > ul > li:nth-child(${i}) > div > div.promo-image > div > div.bbc-6aqi2i > picture > img`).attr('src')
                inf.push({ text, img })
            }
            const post = JSON.stringify(inf)
            fs.writeFileSync(`parser.json`, post)
        }
    })
}