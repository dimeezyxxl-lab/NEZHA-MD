/**
 * Password — Generate Divine Seal
 * Usage: .password <length>
 */

module.exports = {
    name: 'password',
    aliases: ['passgen', 'genpass', 'divineseal', 'seal'],
    description: 'Manifest a Divine Seal to protect your digital treasures.',
    category: 'utility',
    async execute({ reply, args }) {
        const length = parseInt(args[0]) || 12;
        
        if (length < 4 || length > 64) {
            return reply('❌ _The Divine Seal must be at least 4 and no more than 64 characters to hold its integrity._');
        }

        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const allChars = uppercase + lowercase + numbers + symbols;

        let password = '';
        // Ensure at least one of each element is bound into the seal
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];

        // Fill the remaining structure
        for (let i = 4; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Shuffle the elements to ensure absolute randomness
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        reply(
            `🔐 *Divine Seal Manifested*\n\n` +
            `Complexity: ${length} runes\n` +
            `Seal: \`${password}\`\n\n` +
            `> _Store this seal in the sanctuary of your memory, for the Lotus Prince does not archive the vulnerable._`
        );
    }
};
