/**
 * Blacklist — Invoke Profanity Seal
 * Usage: .blacklist <word>
 */
const database = require('../../utils/database');

module.exports = {
    name: 'blacklist',
    aliases: ['addblacklist', 'badword', 'seal', 'profanityseal'],
    description: 'Invoke Profanity Seal to forbid specific words.',
    category: 'moderation',
    async execute({ reply, args, from, isGroup }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        if (!args.length) return reply('🚫 *Profanity Seal*\n\nUsage: `.blacklist <word>`\nExample: `.blacklist forbidden-word`');
        
        const word = args[0].toLowerCase();
        const list = database.getGroupData(from, 'blacklist') || [];
        
        if (list.includes(word)) return reply(`⚠️ *The Seal is already active:* "*${word}*" is already forbidden.`);
        
        list.push(word);
        database.setGroupData(from, 'blacklist', list);
        
        reply(
            `🚫 *PROFANITY SEAL INVOKED!*\n\n` +
            `"*${word}*" has been bound by the seal. Any whisper containing this word shall be purged.\n\n` +
            `Total forbidden echoes: *${list.length}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
