const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NTYwMjMxNjc2ODE5NjY4OTkz.D3xAgw.9-CPJ3e6JAeQOnk5xY-Y5oM4t4g';

const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const stop = { seek: 0, volume: 0 };

bot.on('ready', () =>{
    console.log('Nature music is online.');
})

bot.on('ready', () => {
    console.log('Nature bot is now online.');
    bot.user.setActivity('Your Music (?cmds)', { type: 'LISTENING' }).catch(console.error);
})


bot.on('message', message=>{

        bot.user.setStatus('Online')

        bot.user.setGame('Hello!')

        bot.user.setGame('Hello', 'youtube.com')

        if(message.content.toLowerCase().startsWith("?stop"))
        message.channel.sendMessage('This feature is currently in development. Sorry.')

        if(message.content === 'Nature Music') {
            message.channel.sendMessage('If you need help, please type ?help.')
        }

        if(message.content.toLowerCase().startsWith("?help"))
        message.channel.sendMessage('This is a music bot in version alpha 1.0.1, for the commands do ?cmds')

        if(message.content.toLowerCase().startsWith("?cmds"))
        message.channel.sendMessage('Our only current command(s) is ?play (Url Link) ?stop ?help ?cmds **UPDATE LOG** Bot leaves channel on end of song.')

        if (message.content.toLowerCase().startsWith("?play"))
        {
            let args = message.content.split(" ");
            let url = args[1];
            let VoiceChannel = message.guild.channels.find(channel => channel.id === '538840045444923402');
            if(VoiceChannel != null)
            {
                console.log(VoiceChannel.name + " was found and is a " + VoiceChannel.type + "channel.");
                VoiceChannel.join()
                .then(connection => {
                    console.log("Bot joined the channel.");
                    const stream = ytdl(url, { filter : 'audioonly' });
                    const dispatcher = connection.playStream(stream, streamOptions); 

                    dispatcher.on('end', () => {
                        VoiceChannel.leave();
                    })
                })
                .catch();
            }
        }   
    });
 
bot.login(process.env.token);
