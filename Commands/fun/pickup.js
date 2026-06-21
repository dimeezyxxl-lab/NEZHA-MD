/**
 * Pickup — Invoke a Celestial Charm
 * Usage: .pickup
 */
module.exports = {
    name: 'pickup',
    aliases: ['rizz', 'charm', 'flirt'],
    description: 'Invoke a celestial charm to dazzle another spirit.',
    category: 'fun',
    async execute({ reply }) {
        const charms = [
            'Are you a cosmic weaver? Because whenever I look at you, the rest of the world fades into the void.',
            'Do you possess a celestial map? I find myself lost within the depths of your gaze.',
            'If you were a celestial bloom, you would be the rarest orchid in the heavens.',
            'Are you a master of the elements? Because you have enchanted my spirit.',
            'Is your essence written in the stars? Because you are everything I have been seeking across the eons.',
        ];
        
        return reply(
            `💌 *Celestial Charms*\n\n` +
            `_“${charms[Math.floor(Math.random() * charms.length)]}”_`
        );
    }
};
