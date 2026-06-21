/**
 * AntiSpam — Invoke Eternal Silence
 * Usage: .antispam on | .antispam off | .antispam <number> | .antispam status
 */

const database = require('../../utils/database');

module.exports = {
    name: 'antispam',
    aliases: ['nospam', 'spamprotect', 'eternalsilence'],
    description: 'Invoke Eternal Silence to suppress chaotic messaging.',
    category: 'moderation',

    async execute({ reply, args, from, isGroup, isAdmin, isOwner }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        if (!isAdmin && !isOwner) return reply('🛡️ _Only those with celestial authority may invoke Eternal Silence._');

        const sub = (args[0] || '').toLowerCase();

        if (!sub || sub === 'status') {
            const cfg = database.getGroup(from).antispam;
            const on  = cfg?.enabled || cfg === true;
            const lim = (typeof cfg === 'object' && cfg?.limit) ? cfg.limit : 5;
            return reply(
                '📿 *ETERNAL SILENCE SETTINGS*\n\n' +
                `Status: ${on ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                `Threshold:  ${on ? `*${lim} echoes* per 10 seconds` : '—'}\n\n' +
                '*Rituals:*\n' +
                '• `.antispam on`    — Invoke (default: 5 echoes/10s)\n' +
                '• `.antispam off`   — Banish\n' +
                '• `.antispam 3`     — Invoke with custom threshold\n' +
                '• `.antispam status`— View current barriers\n\n' +
                '_Violators receive two warnings before they are banished._'
            );
        }

        if (sub === 'off') {
            database.setGroup(from, 'antispam', { enabled: false, limit: 5 });
            return reply('📿 *ETERNAL SILENCE BANISHED ❌*\n\n_The sanctuary returns to the chaotic whispers of the crowd._');
        }

        const limit = sub === 'on' ? 5 : parseInt(sub);
        if (isNaN(limit) || limit < 1 || limit > 30) {
            return reply('❌ _The threshold must be between 1 and 30._');
        }
        database.setGroup(from, 'antispam', { enabled: true, limit });
        reply(
            '📿 *ETERNAL SILENCE INVOKED ✅*\n\n' +
            `⚡ Max *${limit} echoes* per 10 seconds permitted.\n\n' +
            '*The Decree:*\n' +
            '• 1st transgression → ⚠️ Warning + whisper deleted\n' +
            '• 2nd transgression → ⚠️ Final warning\n' +
            '• 3rd transgression → 🚫 Banishment from the sanctuary\n\n' +
            '_Celestial Guardians (Admins) are exempt from this decree._\n\n' +
            '> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_'
        );
    }
};
