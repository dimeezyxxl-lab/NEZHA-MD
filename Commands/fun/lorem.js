/**
 * Lorem — Recite a celestial script
 * Usage: .lorem [count]
 */
module.exports = {
    name: 'lorem',
    aliases: ['script', 'text', 'mantra'],
    description: 'Recite a series of ancient celestial scripts.',
    category: 'fun',
    async execute({ args, reply }) {
        const n = Math.min(Math.max(parseInt(args[0]) || 3, 1), 20);
        const SCRIPTS = [
            'The celestial tapestry unfolds in patterns of light.',
            'Wisdom flows like the river from the peaks of the high heavens.',
            'In the quiet of the void, the truth of the cosmos reveals itself.',
            'Cycles of eons pass, yet the spirit remains constant in its path.',
            'Harmony is the balance maintained between the earth and the firmament.',
        ];
        
        let out = ''; 
        for (let i = 0; i < n; i++) {
            out += SCRIPTS[i % SCRIPTS.length] + ' ';
        }
        
        return reply(
            `📜 *Celestial Script*\n\n` +
            `_${out.trim()}_`
        );
    }
};
