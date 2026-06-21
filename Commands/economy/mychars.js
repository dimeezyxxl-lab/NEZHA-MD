/**
 * MyChars — Behold your gathered host of celestial warriors.
 */
const cloud = require('../../utils/cloudEconomy');

module.exports = {
    name: 'mychars',
    aliases: ['collection', 'roster', 'warriors'],
    description: 'Show your collected celestial warriors',
    category: 'economy',
    async execute({ reply, sender }) {
        const linked = await cloud.requireLinked(sender, reply); 
        if (!linked) return;
        
        const chars = await cloud.getCharacters(linked.uid);
        if (!chars.length) {
            return reply(
                `📜 *Celestial Roster*\n\n` +
                `Your ranks are empty. Seek out new allies at the \`.charactershop\`!`
            );
        }
        
        const byRarity = chars.reduce((a, c) => { 
            (a[c.rarity] ||= []).push(c.character_id); 
            return a; 
        }, {});
        
        let msg = `👹 *YOUR CELESTIAL ROSTER (${chars.length}/${Object.keys(cloud.CHARACTERS).length})*\n\n`;
        
        for (const r of ['mythic', 'legendary', 'epic', 'rare', 'common']) {
            if (!byRarity[r]) continue;
            msg += `_${r.toUpperCase()}_\n`;
            byRarity[r].forEach(id => { 
                const c = cloud.CHARACTERS[id]; 
                msg += `  ${c.emoji} ${c.name}\n`; 
            });
            msg += `\n`;
        }
        
        reply(msg);
    },
};
