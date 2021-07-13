const path = require('path');
const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
const { EchoBot } = require('./bot');


const adapter = new BotFrameworkAdapter({
    appId: '',
    appPassword: ''
});

const onTurnErrorHandler = async (context, error) => {
    console.log('Error hs been encountered by Bot', error);
    await context.sendActivity('Error has been encountered by Bot');
}

adapter.onTurnError = onTurnErrorHandler;

const myBot = new EchoBot();

const server = restify.createServer();
server.listen(3978, () => {
    console.log(`${server.name} is listing to the port ${server.url}`);
});

server.post('/api/messages', (req,res) => {
    adapter.processActivity(req,res, async(context) => {
        await myBot.run(context);
    })
})