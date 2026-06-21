/**
 * CoinFlip — Initiate Fate’s Gamble
 * Usage: .coinflip [times]
 */

module.exports = {
    name: 'coinflip',
    aliases: ['flip', 'toss', 'fategamble', 'fate'],
    description: 'Consult the universe through Fate’s Gamble.',
    category: 'utility',
    async execute({ reply, args }) {
        const times = Math.min(parseInt(args[0]) || 1, 10);
        const results = Array.from({ length: times }, () => Math.random() < 0.5 ? '🪙 Heads' : '🟡 Tails');
        const heads = results.filter(r => r.includes('Heads')).length;
        const tails = times - heads;
        
        if (times === 1) {
            return reply(
                `🌀 *Fate’s Gamble*\n\n` +
                `The Lotus Prince observes the turn: *${results[0]}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        reply(
            `🌀 *Fate’s Gamble* (${times} cycles)\n\n` +
            `${results.join('\n')}\n\n` +
            `📊 *Resulting Alignment*\n` +
            `Heads: ${heads} | Tails: ${tails}\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
