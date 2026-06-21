/**
 * AntiForward — Invoke Purity Seal
 * Usage: .antiforward on | .antiforward off
 */
const database = require('../../utils/database');

module.exports = {
    name: 'antiforward',
    aliases: ['noforward', 'antifwd', 'purityseal'],
    description: 'Invoke Purity Seal to block forwarded echoes.',
    category: 'moderation',
    async execute({ reply, args, from, isGroup }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        const state = args[0]?.toLowerCase();
        if (!state || !['on','off'].includes(state)) {
            return reply(
                '📜 *PURITY SEAL*\n\n' +
                'Usage: `.antiforward on` | `.antiforward off`\n\n' +
                'When active, external echoes (forwarded messages) are purged from the sanctuary.'
            );
        }

        const enabled = state === 'on';
        database.setGroupData(from, 'antiforward', enabled);
        
        reply(
            `📜 *PURITY SEAL ${enabled ? 'ENABLED ✅' : 'DISABLED ❌'}*\n\n` +
            (enabled 
                ? '_External echoes shall be purged upon arrival._' 
                : '_The sanctuary now permits external echoes to pass._') +
            `\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
