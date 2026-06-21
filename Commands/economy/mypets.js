/**
 * MyPets — View your tamed celestial companions.
 */
const cloud = require('../../utils/cloudEconomy');

module.exports = {
    name: 'mypets',
    aliases: ['pets', 'shikigami', 'companions'],
    description: 'List your tamed celestial companions',
    category: 'economy',
    async execute({ reply, sender }) {
        const linked = await cloud.requireLinked(sender, reply); 
        if (!linked) return;
        
        const pets = await cloud.getPets(linked.uid);
        if (!pets.length) {
            return reply(
                `🦴 *Celestial Companions*\n\n` +
                `You have yet to bind any spirit beasts. Visit the \`.petshop\` to find your loyal companion.`
            );
        }
        
        let msg = `🐺 *YOUR BOUND SHIKIGAMI*\n\n`;
        pets.forEach(p => { 
            msg += `• ${cloud.PET_SHOP[p.pet_id]?.name || p.pet_id} — Lv ${p.level}\n`; 
        });
        
        reply(msg);
    },
};
