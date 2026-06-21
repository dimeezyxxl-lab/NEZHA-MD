/**
 * BMBuy — Purchase from the Forbidden Bazaar.
 */
const cloud = require('../../utils/cloudEconomy');

module.exports = {
    name: 'bmbuy',
    aliases: ['smuggle'],
    description: 'Purchase contraband from the Forbidden Bazaar',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const id = (args[0] || '').toLowerCase();
        const item = cloud.BLACK_MARKET[id];
        
        if (!item) return reply(`❌ Unknown artifact. Check the \`.blackmarket\` for valid listings.`);
        
        const linked = await cloud.requireLinked(sender, reply); 
        if (!linked) return;
        
        const ps = await cloud.getPlayerState(linked.uid);
        
        // Updated to reflect the celestial location requirement
        if (ps.location !== 'heavenly-peak' && ps.location !== 'void') {
            return reply(`🔒 You must be at the *Heavenly Peak* to engage in such clandestine trade.`);
        }
        
        const w = await cloud.getWallet(linked.uid);
        if (w.wallet < item.price) {
            return reply(`❌ You lack the sufficient wealth (${cloud.SYMBOL} ${item.price.toLocaleString()}) to acquire this.`);
        }
        
        await cloud.updateWallet(linked.uid, { wallet: w.wallet - item.price });
        await cloud.addToInventory(linked.uid, id);
        await cloud.logTx(linked.uid, `bm_${id}`, -item.price, { item: id, market: 'black' });
        
        reply(
            `💀 Successfully smuggled *${item.name}* into your possession.\n` +
            `${cloud.SYMBOL} -${item.price.toLocaleString()} deducted from your treasury.`
        );
    },
};
