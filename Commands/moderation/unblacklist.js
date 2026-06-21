/**
 * Unblacklist — Invoke Profanity Seal Dissolution
 * Usage: .unblacklist <word>
 */
const database = require('../../utils/database');

module.exports = {
    name: 'unblacklist',
    aliases: ['removeblacklist', 'delbadword', 'dissolve', 'unseal'],
    description: 'Invoke Profanity Seal Dissolution to permit a forbidden word.',
    category: 'moderation',
    async execute({ reply, args, from, isGroup }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        if (!args.length) return reply('✅ *Profanity Seal Dissolution*\n\nUsage: `.unblacklist <word>`');
        
        const word = args[0].toLowerCase();
        let list = database.getGroupData(from, 'blacklist') || [];
        
        if (!list.includes(word)) return reply(`❌ _The word "*${word}*" is not bound by the seal; it is already permitted._`);
        
        list = list.filter(w => w !== word);
        database.setGroupData(from, 'blacklist', list);
        
        reply(
            `✅ *SEAL DISSOLVED!*\n\n` +
            `"*${word}*" has been released from the seal. It may now echo within this sanctuary.\n\n` +
            `Remaining forbidden echoes: *${list.length}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
