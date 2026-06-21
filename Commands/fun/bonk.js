/**
 * Bonk — Deliver a celestial correction
 */
module.exports = {
    name: 'bonk',
    aliases: ['whack', 'punish'],
    description: 'Deliver a celestial correction to someone',
    category: 'fun',
    async execute({ args, reply, msg }) {
        const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
            || msg.message?.extendedTextMessage?.contextInfo?.participant
            || args.join(' ').trim()
            || 'them').split('@')[0];
            
        const lines = [
            "The heavens demand order! @{target} has been sent to the Discipline Realm.",
            "@{target} has transgressed; prepare for a celestial bonk.",
            "With the strength of the universe, I strike @{target}!",
            "@{target} requires immediate realignment."
        ];
        
        const line = lines[Math.floor(Math.random() * lines.length)];
        return reply('🔨 ' + line.replace('{target}', target));
    }
};
