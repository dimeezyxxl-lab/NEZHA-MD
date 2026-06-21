/**
 * ClearWarn Command — Clear all warnings for a user
 * Usage: .clearwarn @user
 */
const database = require('../../utils/database');

module.exports = {
    name: 'clearwarn',
    aliases: ['warnreset', 'removewarn'],
    description: 'Clear all warnings for a user',
    category: 'admin',
    async execute({ reply, args, from, isGroup, msg }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const target = mentioned[0] || (args[0] ? args[0].replace(/[^0-9]/g,'')+'@s.whatsapp.net' : null);
        
        if (!target) return reply('🚩 Usage: `.clearwarn @user`\nMention the soul whose record you wish to cleanse.');
        
        database.resetWarnings(from, target);
        
        reply(
            `✨ *Celestial Cleansing*\n\n` +
            `👤 The warning record for @${target.split('@')[0]} has been purged by the Lotus Prince. All offenses reset to 0.`, 
            { mentions: [target] }
        );
    }
};
