/**
 * Black Market — Browse the Forbidden Bazaar.
 */
const cloud = require('../../utils/cloudEconomy');

module.exports = {
    name: 'blackmarket',
    aliases: ['bm', 'black', 'bazaar'],
    description: 'Browse the Forbidden Bazaar (Heavenly Peak only)',
    category: 'economy',
    async execute({ reply, sender }) {
        const linked = await cloud.requireLinked(sender, reply); 
        if (!linked) return;
        
        const ps = await cloud.getPlayerState(linked.uid);
        
        // Assuming location check—updated to your celestial setting
        if (ps.location !== 'heavenly-peak' && ps.location !== 'void') {
            return reply(`🔒 The Forbidden Bazaar is hidden within the *Heavenly Peak*. Use \`.travel heavenly-peak\` first to seek it.`);
        }
        
        let msg = `💀 *FORBIDDEN BAZAAR — CELESTIAL CONTRABAND*\n\n`;
        for (const [id, it] of Object.entries(cloud.BLACK_MARKET)) {
            msg += `*${it.name}*\n${cloud.SYMBOL} ${it.price.toLocaleString()}\n_${it.description}_\n\`.bmbuy ${id}\`\n\n`;
        }
        
        reply(msg);
    },
};
