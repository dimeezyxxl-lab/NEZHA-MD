/**
 * AntiURL — Invoke Void Barrier
 * Usage: .antiurl on | .antiurl off
 */
const database = require('../../utils/database');

module.exports = {
    name: 'antiurl',
    aliases: ['nourl', 'blockurl', 'voidbarrier'],
    description: 'Invoke Void Barrier to block external links.',
    category: 'moderation',
    async execute({ reply, args, from, isGroup }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        const state = args[0]?.toLowerCase();
        if (!state || !['on','off'].includes(state)) {
            const current = database.getGroupData(from, 'antiurl');
            return reply(
                `🌀 *VOID BARRIER*\n\n` +
                `Status: ${current ? '✅ Sealed' : '❌ Permeable'}\n\n` +
                `Usage: .antiurl on/off\n\n` +
                `_When sealed, those without celestial authority may not manifest external links._`
            );
        }
        
        const enabled = state === 'on';
        database.setGroupData(from, 'antiurl', enabled);
        
        reply(
            `🌀 *VOID BARRIER ${enabled ? 'SEALED ✅' : 'DISSOLVED ❌'}*\n\n` +
            (enabled 
                ? '_The sanctuary is now shielded from external digital tendrils._' 
                : '_The barrier is dissolved; external paths may be shared._') +
            `\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
