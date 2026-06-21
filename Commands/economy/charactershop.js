/**
 * CharacterShop — Browse the Celestial Roster.
 */
const { CHARACTERS, SYMBOL } = require('../../utils/cloudEconomy');

module.exports = {
    name: 'charactershop',
    aliases: ['chars', 'roster'],
    description: 'Browse the celestial allies you can summon',
    category: 'economy',
    async execute({ reply, args }) {
        const filter = (args[0] || '').toLowerCase();
        let msg = `✨ *CELESTIAL SHOP — DIVINE ROSTER*\n\n`;
        
        for (const [id, c] of Object.entries(CHARACTERS)) {
            if (filter && c.rarity !== filter) continue;
            msg += `${c.emoji} *${c.name}* — _${c.rarity}_\n${SYMBOL} ${c.price.toLocaleString()}  \`${id}\`\n\n`;
        }
        
        msg += `_Use_ \`.buychar <id>\` _to summon an ally._\n_Filter by rarity:_ \`.charactershop legendary\``;
        reply(msg);
    },
};
