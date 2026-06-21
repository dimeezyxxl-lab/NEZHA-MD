/**
 * PetShop — Browse the Celestial Den of Shikigami.
 */
const { PET_SHOP, SYMBOL } = require('../../utils/cloudEconomy');

module.exports = {
    name: 'petshop',
    aliases: ['pets-shop', 'shikigami', 'den'],
    description: 'Browse the collection of celestial Shikigami ready to be bound',
    category: 'economy',
    async execute({ reply }) {
        let msg = `🐺 *CELESTIAL SHIKIGAMI DEN*\n\n`;
        
        for (const [id, p] of Object.entries(PET_SHOP)) {
            msg += `*${p.name}*\n${SYMBOL} ${p.price.toLocaleString()} • +${p.passive}/h\n_${p.description}_\nID: \`${id}\`\n\n`;
        }
        
        msg += `_Use_ \`.buypet <id>\` _to bind a spirit beast to your service._`;
        reply(msg);
    },
};
