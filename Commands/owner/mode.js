/**
 * Mode — Set Sanctuary State
 * Usage: .mode [normal | maintenance | vip]
 */
const database = require('../../utils/database');

module.exports = {
    name: 'mode',
    aliases: ['botmode', 'setmode', 'state', 'sanctuarystate'],
    description: 'Define the operational state of the sanctuary (Owner only).',
    category: 'owner',
    ownerOnly: true,
    async execute({ reply, args }) {
        const modes = ['normal', 'maintenance', 'vip'];
        const current = database.getBotData ? database.getBotData('mode') || 'normal' : 'normal';
        
        if (!args.length || !modes.includes(args[0].toLowerCase())) {
            return reply(
                `⚙️ *SANCTUARY STATE*\n\n` +
                `Current State: *${current.toUpperCase()}*\n\n` +
                `*States:*\n` +
                `• normal      — All seekers may enter\n` +
                `• maintenance — Sanctuary restricted to the Prince\n` +
                `• vip         — Sanctuary restricted to the Elite\n\n` +
                `_Usage: .mode <normal/maintenance/vip>_`
            );
        }
        
        const newMode = args[0].toLowerCase();
        if (database.setBotData) database.setBotData('mode', newMode);
        
        const modeEmoji = { normal: '✅', maintenance: '🔧', vip: '👑' };
        const modeDescription = {
            normal: 'All seekers are welcome to utilize the Prince’s power.',
            maintenance: 'The sanctuary is closed for refinement; only the Prince may enter.',
            vip: 'The sanctuary is shielded; only the Elite and the Prince may enter.'
        };

        reply(
            `${modeEmoji[newMode]} *SANCTUARY STATE SHIFTED*\n\n` +
            `State: *${newMode.toUpperCase()}*\n\n` +
            `_Status:_ ${modeDescription[newMode]}\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
