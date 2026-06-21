/**
 * BuyChar (Summon) — Summon a celestial ally.
 */
const cloud = require('../../utils/cloudEconomy');

module.exports = {
    name: 'buychar',
    aliases: ['summon'],
    description: 'Summon (buy) a celestial ally',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const id = (args[0] || '').toLowerCase();
        const c = cloud.CHARACTERS[id];
        
        if (!c) {
            return reply(`❌ Unknown spirit. Consult the \`.charactershop\` to see who can be beckoned.`);
        }
        
        const linked = await cloud.requireLinked(sender, reply); 
        if (!linked) return;
        
        const w = await cloud.getWallet(linked.uid);
        if (w.wallet < c.price) {
            return reply(`❌ You lack the offering of ${cloud.SYMBOL} ${c.price.toLocaleString()} required for this summoning.`);
        }
        
        const owned = await cloud.getCharacters(linked.uid);
        if (owned.find(x => x.character_id === id)) {
            return reply(`⚠️ This entity, ${c.emoji} *${c.name}*, has already sworn allegiance to you.`);
        }
        
        await cloud.updateWallet(linked.uid, { wallet: w.wallet - c.price });
        await cloud.addCharacter(linked.uid, id, c.rarity);
        await cloud.logTx(linked.uid, `char_${id}`, -c.price, { character: id });
        
        reply(
            `✨ The ritual is complete! You have summoned ${c.emoji} *${c.name}* (${c.rarity}).\n` +
            `${cloud.SYMBOL} -${c.price.toLocaleString()} offered to the heavens.`
        );
    },
};
