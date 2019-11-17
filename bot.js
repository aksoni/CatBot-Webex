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
         let helpMessage = "Hi! I\'m CatBot! I will send you a cat fact or pic whenever you ask.\n" +
             "To get a fact: \'@CatBot fact\'\n"+"To get a pic: \'@CatBot pic\'";
         await bot.say(helpMessage);
       }    
       else if(query.includes('fact')){
         console.log("hit me");
         let response = await fetch('https://catfact.ninja/fact');
         response = await response.json();
         await bot.say(response.fact);    
      }
       else if(query.includes('pic')){
         console.log("pic me");
         await bot.say({
           files: ['https://cataas.com/cat']  
          });
       }
     }
});
