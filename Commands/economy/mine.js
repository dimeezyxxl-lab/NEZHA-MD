/**
 * Mine — Excavate the celestial caverns for rare spiritual resources.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

module.exports = {
    name: 'mine',
    aliases: ['mining', 'dig', 'excavate'],
    description: 'Go mining for celestial ores in the sacred mountains',
    category: 'economy',
    async execute({ reply, sender }) {
        const cd = economy.checkCooldown(sender, 'mine');
        if (cd.onCooldown) {
            return reply(`⛏️ *Your spiritual energy is depleted.* Rest for *${formatTime(cd.remaining)}* before tunneling into the mountain depths again.`);
        }

        const outcomes = [
            { msg: 'uncovered a shimmering vein of Celestial Gold', min: 300, max: 800 },
            { msg: 'unearthed fragments of radiant Spirit Quartz', min: 100, max: 300 },
            { msg: 'discovered legendary Lotus Crystals buried deep in the rock', min: 600, max: 1200 },
            { msg: 'dug up some raw Starstone shards', min: 50, max: 150 },
            { msg: 'struck a rich Meteorite Iron deposit', min: 200, max: 500 },
        ];

        const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        const earned = Math.floor(Math.random() * (outcome.max - outcome.min)) + outcome.min;
        
        economy.addWallet(sender, earned);
        economy.setCooldown(sender, 'mine', 3600000); // 1 hour
        
        const bal = economy.getBalance(sender);
        
        reply(
            `⛏️ *Celestial Excavation Report*\n\n` +
            `You ${outcome.msg}!\n` +
            `${SYMBOL} Earned: *${earned.toLocaleString()} ${CURRENCY}*\n\n` +
            `👛 Wallet: *${bal.wallet.toLocaleString()}*\n\n` +
            `_The spiritual veins shift... Return in 1 hour to excavate again!_`
        );
    }
};
