// Import Botkit
const { Botkit } = require('botkit');
const { WebexAdapter } = require('botbuilder-adapter-webex');

var request = require('request');
var results;
var res;

const adapter = new WebexAdapter({
    access_token: process.env.access_token,
    public_address: process.env.public_address,
    secret: process.env.secret
})


const controller = new Botkit({
    webhook_name: 'CatBot',
    adapter: adapter,
});

controller.on('message', async(bot, message) => {
     if(message.text) {
       const query = message.text.trim();
       if(query.includes('help')){
         await bot.reply(message, 'Hi! I\'m Catbot! I will send you a cat fact whenever you ask.');
         await bot.reply(message, 'Usage: @Catbot fact me');
       }    
       else if(query.includes('fact me')){
         console.log("hit me");
         let response = await fetch('https://catfact.ninja/fact');
         response = await response.json();
         console.log(response);
         console.log(response.fact);
         await bot.reply(message, response.fact);    
      }
       else if(query.includes('pic me')){
         console.log("pic me");
         await bot.reply(message, {
           files: ['https://cataas.com/cat']  
          })
       }
     }
});
