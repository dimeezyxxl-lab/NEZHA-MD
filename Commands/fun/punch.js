/**
 * Punch — Deliver a Celestial Strike
 * Usage: .punch @user
 */
module.exports = {
    name: 'punch',
    aliases: ['strike', 'hit', 'blow'],
    description: 'Deliver a swift celestial strike to another spirit.',
    category: 'fun',
    async execute({ args, reply, msg }) {
        const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
            || msg.message?.extendedTextMessage?.contextInfo?.participant
            || args.join(' ').trim()
            || 'a wandering spirit').split('@')[0];
            
        const strikes = [
            "A swift celestial strike \u2014 @{target} has been humbled by the heavens.",
            "Nezha delivers a precise blow to @{target}.",
            "@{target} has felt the weight of a celestial hand."
        ];
        
        const strike = strikes[Math.floor(Math.random() * strikes.length)];
        return reply('👊 ' + strike.replace('{target}', target));
    }
};
