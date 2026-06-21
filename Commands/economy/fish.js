/**
 * Fish — Cast your line into the Celestial Waters.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

module.exports = {
    name: 'fish',
    aliases: ['fishing', 'cast'],
    description: 'Go fishing in the Celestial Waters',
    category: 'economy',
    async execute({ reply, sender }) {
        const cd = economy.checkCooldown(sender, 'fish');
        if (cd.onCooldown) {
            return reply(`🎣 *The waters are still.* Wait *${formatTime(cd.remaining)}* before casting your line again.`);
        }

        const catches = [
            { emoji:'🐟', name:'Common Spirit Fish', min:50, max:150 },
            { emoji:'🐠', name:'Radiant Tropical Fish', min:100, max:300 },
            { emoji:'🐡', name:'Spiky Celestial Puffer', min:80, max:250 },
            { emoji:'🦈', name:'Abyssal Shark!', min:500, max:1000 },
            { emoji:'🦞', name:'Golden Lobster', min:300, max:600 },
            { emoji:'🐙', name:'Mystic Octopus', min:200, max:450 },
            { emoji:'👢', name:'Discarded Mortal Boot', min:0, max:10 },
            { emoji:'💎', name:'Sunken Celestial Treasure!', min:800, max:1500 },
        ];

        const catch_ = catches[Math.floor(Math.random() * catches.length)];
        const earned = Math.floor(Math.random() * (catch_.max - catch_.min)) + catch_.min;
        
        economy.addWallet(sender, earned);
        economy.setCooldown(sender, 'fish', 1800000); // 30 min
        
        const bal = economy.getBalance(sender);
        
        reply(
            `🎣 *Celestial Fishing Report*\n\n` +
            `You caught: ${catch_.emoji} *${catch_.name}*\n` +
            `${SYMBOL} Earned: *${earned.toLocaleString()} ${CURRENCY}*\n\n` +
            `👛 Wallet: *${bal.wallet.toLocaleString()}*\n\n` +
            `_The waters calm... cast again in 30 minutes!_`
        );
    }
};
