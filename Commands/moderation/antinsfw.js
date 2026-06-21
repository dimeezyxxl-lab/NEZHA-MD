/**
 * AntiNSFW — Invoke Divine Sanctity
 * Usage: .antinsfw on | .antinsfw off
 */
const database = require('../../utils/database');

module.exports = {
    name: 'antinsfw',
    aliases: ['nonsfw', 'safemode', 'divinesanctity'],
    description: 'Invoke Divine Sanctity to filter profane content.',
    category: 'moderation',
    async execute({ reply, args, from, isGroup }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        const state = args[0]?.toLowerCase();
        if (!state || !['on','off'].includes(state)) {
            const current = database.getGroupData(from, 'antinsfw');
            return reply(
                `🛡️ *DIVINE SANCTITY*\n\n` +
                `Status: ${current ? '✅ Sacred' : '❌ Profane allowed'}\n\n` +
                `Usage: .antinsfw on/off`
            );
        }
        
        const enabled = state === 'on';
        database.setGroupData(from, 'antinsfw', enabled);
        
        reply(
            `🛡️ *DIVINE SANCTITY ${enabled ? 'ACTIVATED ✅' : 'DISABLED ❌'}*\n\n` +
            (enabled 
                ? '_The sanctuary is now shielded from profane manifestations._' 
                : '_The shield has been lowered; profanity is permitted._') +
            `\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
