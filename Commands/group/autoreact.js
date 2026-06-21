/**
 * Autoreact — Toggle Celestial Resonance
 * Usage: .autoreact on | off | status
 */

const database = require('../../utils/database');

module.exports = {
    name: 'autoreact',
    aliases: ['areact', 'randomreact', 'resonance'],
    description: 'Toggle random celestial resonances (emoji reactions) to every group message.',
    category: 'group',
    async execute({ from, args, reply, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }

        const action = (args[0] || 'status').toLowerCase();
        const cur = database.getGroup(from)?.autoreact === true;

        if (action === 'on' || action === 'enable') {
            database.setGroup(from, 'autoreact', true);
            return reply('✨ *Celestial Resonance ENABLED.* The Oracle will now vibrate with random celestial essences in response to every message.');
        }
        
        if (action === 'off' || action === 'disable') {
            database.setGroup(from, 'autoreact', false);
            return reply('🛑 *Celestial Resonance SILENCED.*');
        }
        
        return reply(
            `📊 *Celestial Resonance Status*\n\n` +
            `The Oracle's resonance is currently: *${cur ? 'ACTIVE' : 'SILENCED'}*.\n\n` +
            `Use *.autoreact on* or *.autoreact off* to adjust.`
        );
    }
};
