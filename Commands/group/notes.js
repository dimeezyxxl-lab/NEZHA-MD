/**
 * Notes — Consult the Celestial Scrolls
 * Usage: .notes | .notes add <note> | .notes clear
 */

const database = require('../../utils/database');

module.exports = {
    name: 'notes',
    aliases: ['note', 'groupnotes', 'scrolls', 'wisdom'],
    description: 'Archive and retrieve wisdom within the Celestial Scrolls.',
    category: 'group',
    async execute({ reply, args, from, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }

        const sub = args[0]?.toLowerCase();

        // Add to scrolls
        if (sub === 'add' || sub === 'save') {
            const text = args.slice(1).join(' ');
            if (!text) return reply('❌ *Missing essence.* Usage: `.notes add <your wisdom>`');
            
            const existing = database.getGroupData(from, 'notes') || [];
            existing.push({ text, time: Date.now() });
            database.setGroupData(from, 'notes', existing);
            
            return reply(`📝 *Celestial Scroll Inscribed!*\n\n> "${text}"`);
        }

        // Clear scrolls
        if (sub === 'clear') {
            database.setGroupData(from, 'notes', []);
            return reply('🗑️ *Celestial Scrolls purged.* All wisdom has been returned to the void.');
        }

        // View scrolls
        const notes = database.getGroupData(from, 'notes') || [];
        if (!notes.length) {
            return reply('📝 *The scrolls remain empty.* Inscribe new wisdom with: `.notes add <text>`');
        }

        const list = notes.map((n, i) => `✨ ${i + 1}. ${n.text}`).join('\n');
        reply(
            `📝 *Celestial Scrolls Archive* (${notes.length})\n\n` +
            `${list}\n\n` +
            `_Use .notes clear to return all scrolls to the void._`
        );
    }
};
