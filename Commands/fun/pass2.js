/**
 * Pass — Forge a Celestial Seal (Password)
 * Usage: .pass2 [length=16]
 */
module.exports = {
    name: 'pass2',
    aliases: ['genpass', 'seal', 'secure'],
    description: 'Forge a secure celestial seal for your digital spirit.',
    category: 'fun',
    async execute({ args, reply }) {
        const n = Math.min(Math.max(parseInt(args[0]) || 16, 4), 128);
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        
        let out = ''; 
        for (let i = 0; i < n; i++) {
            out += charset[Math.floor(Math.random() * charset.length)];
        }
        
        return reply(
            `🔐 *Celestial Seal (${n})*\n\n` +
            `_“May this ward protect your spirit from the void.”_\n\n` +
            `\`${out}\``
        );
    }
};
