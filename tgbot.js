const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs')

const token = '6275488802:AAFSLJy2lngqeRbh9h-AoWt0EHGijSKIhZg';
const bot = new TelegramBot(token, { polling: true });
const rawpost = fs.readFileSync('parser.json', 'utf-8');

const post = JSON.parse(rawpost)

console.log(post.length)

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    let i = 0;
    const sendDelayedMessage = () => {
        bot.sendPhoto(chatId, post[i].img, { caption: `${post[i].text}` }).then(() => {
            setTimeout(sendDelayedMessage, 5000);
        })
        i++;
    }
    sendDelayedMessage()
});
