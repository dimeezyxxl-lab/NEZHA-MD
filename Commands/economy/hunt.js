/**
 * Hunt — Engage in a celestial pursuit of mythical beasts.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');

module.exports = {
    name: 'hunt',
    aliases: ['hunting', 'shoot', 'pursue'],
    description: 'Go hunting for mythical beasts in the celestial realms',
    category: 'economy',
    async execute({ reply, sender }) {
        const cd = economy.checkCooldown(sender, 'hunt');
        if (cd.onCooldown) {
            return reply(`🦌 *The forest spirits are restless.* Rest for *${formatTime(cd.remaining)}* before your next pursuit.`);
        }

        const prey = [
            { emoji:'🐇', name:'Celestial Rabbit', min:80, max:200 },
            { emoji:'🦌', name:'Spirit Deer', min:200, max:500 },
            { emoji:'🐗', name:'Divine Boar', min:300, max:700 },
            { emoji:'🦁', name:'Golden Guardian Lion!', min:600, max:1200 },
            { emoji:'🐍', name:'Shadow Serpent', min:100, max:250 },
            { emoji:'🦊', name:'Mystic Fox', min:150, max:350 },
            { emoji:'💨', name:'Ghostly Mirage — missed!', min:0, max:0 },
            { emoji:'🐘', name:'Ancient Elephant!', min:800, max:1500 },
        ];

        const animal = prey[Math.floor(Math.random() * prey.length)];
        const earned = animal.min === 0 ? 0 : Math.floor(Math.random() * (animal.max - animal.min)) + animal.min;
        
        if (earned > 0) economy.addWallet(sender, earned);
        economy.setCooldown(sender, 'hunt', 3600000); // 1 hour
        
        const bal = economy.getBalance(sender);
        const resultMsg = earned > 0 
            ? `You tracked and caught: ${animal.emoji} *${animal.name}*\n${SYMBOL} Earned: *${earned.toLocaleString()} ${CURRENCY}*` 
            : `${animal.emoji} *${animal.name}* — the beast eluded your grasp!`;
        
        reply(
            `🔫 *Celestial Pursuit Results*\n\n` +
            `${resultMsg}\n\n` +
            `👛 Wallet: *${bal.wallet.toLocaleString()}*\n\n` +
            `_The spirits return to the ether... hunt again in 1 hour!_`
        );
    }
};
