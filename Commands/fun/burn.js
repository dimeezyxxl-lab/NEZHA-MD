/**
 * Burn — Deliver a celestial scorch
 */
module.exports = {
    name: 'burn',
    aliases: ['roast', 'scorch'],
    description: 'Deliver a celestial scorch to someone',
    category: 'fun',
    async execute({ args, reply, msg }) {
        const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
            || msg.message?.extendedTextMessage?.contextInfo?.participant
            || args.join(' ').trim()
            || 'them').split('@')[0];
            
        const lines = [
            "The flames of the cosmos consume @{target}'s arrogance.",
            "I would offer a critique of @{target}, but the heavens have already found them wanting.",
            "@{target} wanders through life like a shadow without a sun.",
            "The Universe bears witness to the triviality of @{target}'s existence.",
            "Even the coldest star shines brighter than the wit of @{target}."
        ];
        
        const line = lines[Math.floor(Math.random() * lines.length)];
        return reply('🐦‍🔥 ' + line.replace('{target}', target));
    }
};
