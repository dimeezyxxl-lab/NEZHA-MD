/**
 * Rules Command — Set and display group rules
 * Usage: .rules | .setrules <rules>
 */
const database = require('../../utils/database');

module.exports = {
    name: 'rules',
    aliases: ['grouprules', 'setrules'],
    description: 'View or set group rules',
    category: 'admin',
    async execute({ reply, args, from, isGroup, command, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        
        // Handle Setting Rules
        if (command === 'setrules' || args[0] === 'set') {
            if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may establish laws in this realm.');
            
            const rulesText = (command === 'setrules' ? args : args.slice(1)).join(' ');
            if (!rulesText) return reply('❌ Usage: .setrules <the laws of this realm>');
            
            database.setGroupData(from, 'rules', rulesText);
            return reply(`📋 *Celestial Mandate Updated!*\n\n${rulesText}`);
        }
        
        // Handle Viewing Rules
        const saved = database.getGroupData(from, 'rules');
        if (!saved) return reply('📋 No laws have been inscribed for this realm.\n\nCelestial Masters can set them with: `.setrules <rules>`');
        
        reply(`📋 *The Laws of the Realm*\n\n${saved}`);
    }
};
