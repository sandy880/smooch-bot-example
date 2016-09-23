'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: { 
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m Sandeep!')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name} 
				Is that OK? %[Yes](postback:yes) %[No](postback:no)`))
				.then(()=>'confirmName');		
                
        }
    },

	confirmName: {	
	
	 receive: (bot, message) => {
		  switch(message.text) {
        case 'Yes':
          return bot.say(`Ok, great!`)
            .then(() => 'finish')
          break;
        case 'No':
          return bot.say(`Ok`)
            .then(() => 'no')
          break;
        default:
          return bot.say(`hmm...`)
            .then(() => 'finish')
          break;          
      }
    }
		 
	 },
	 	
	no: {
    prompt: (bot) => bot.say('What should I call you?'),
    receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}` 
				))
				 .then(() => 'finish');
	}
				
	},

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'no');
        }
    }
});
