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
Is that OK? %[Yes](postback:yes) %[No](postback:no)`));
                
        }
    },
	
	yes: {
    prompt: (bot) => bot.say('Ok, great!'),
    receive: () => 'finish'
	},

	no: {
    prompt: (bot) => bot.say('What should I call you?'),
    receive: (bot, message) => {
            const new_name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}'))
				 .then(() => 'finish');
	}
				
	},

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
