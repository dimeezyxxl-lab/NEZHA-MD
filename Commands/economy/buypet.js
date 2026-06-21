/**
 * BuyPet (Tame) — Tame a celestial companion.
 */
const cloud = require('../../utils/cloudEconomy');

module.exports = {
    name: 'buypet',
    aliases: ['tame'],
    description: 'Tame a celestial companion',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const id = (args[0] || '').toLowerCase();
        const pet = cloud.PET_SHOP[id];
        
        if (!pet) {
            return reply(`❌ Unknown companion. Use \`.petshop\` to view those awaiting a master.`);
        }
        
        const linked = await cloud.requireLinked(sender, reply); 
        if (!linked) return;
        
        const w = await cloud.getWallet(linked.uid);
        if (w.wallet < pet.price) {
            return reply(`❌ The spirits demand ${cloud.SYMBOL} ${pet.price.toLocaleString()}, but you offer only ${w.wallet.toLocaleString()}.`);
        }
        
        await cloud.updateWallet(linked.uid, { wallet: w.wallet - pet.price });
        await cloud.addPet(linked.uid, id, pet.name);
        await cloud.logTx(linked.uid, `pet_${id}`, -pet.price, { pet: id });
        
        reply(
            `✅ You have successfully tamed *${pet.name}*!\n` +
            `${cloud.SYMBOL} -${pet.price.toLocaleString()} • Remaining Wallet: ${(w.wallet - pet.price).toLocaleString()}`
        );
    },
};
