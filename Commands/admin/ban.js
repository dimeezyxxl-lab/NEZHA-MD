/**
 * Ban Command — Exile a user from celestial services
 * Usage:
 *   .ban @user            (tag a user)
 *   .ban                  (reply to a user's message)
 *   .ban 2348012345678    (raw number)
 *   .ban list             (show banned numbers)
 *   .ban remove @user     (unban)
 */

const database = require('../../utils/database');

function extractTarget(msg, args) {
    // 1) Mentions
    const ctx = msg?.message?.extendedTextMessage?.contextInfo;
    const mentioned = ctx?.mentionedJid?.[0];
    if (mentioned) return mentioned.split('@')[0].replace(/\D/g, '');

    // 2) Quoted reply
    const quotedParticipant = ctx?.participant;
    if (quotedParticipant) return quotedParticipant.split('@')[0].split(':')[0].replace(/\D/g, '');

    // 3) Raw number argument
    if (args[0]) {
        const num = args[0].replace(/\D/g, '');
        if (num.length >= 6) return num;
    }
    return null;
}

module.exports = {
    name: 'ban',
    aliases: ['blockuser', 'banuser'],
    description: 'Exile a user from using bot commands',
    category: 'admin',
    async execute({ reply, msg, args, isOwner }) {
        try {
            if (!isOwner) {
                return reply('🛡️ *Celestial Decree!*\n\n❌ Only the High Sovereign may issue an exile.');
            }

            const sub = (args[0] || '').toLowerCase();

            // ── LIST ─────────────────────────────────────────────────────
            if (sub === 'list' || sub === 'show') {
                const all = Object.keys(database.data.banned || {})
                    .filter(k => database.data.banned[k]);
                if (!all.length) {
                    return reply('📋 *Exile Registry*\n\n_The registry is empty; no souls are currently exiled._');
                }
                const lines = all.map((n, i) => `${i + 1}. +${n}`).join('\n');
                return reply(`📋 *Exiled Souls (${all.length})*\n\n${lines}\n\nUse *.ban remove <number>* to lift the exile.`);
            }

            // ── REMOVE / UNBAN ───────────────────────────────────────────
            if (sub === 'remove' || sub === 'unban' || sub === 'off') {
                const target = extractTarget(msg, args.slice(1));
                if (!target) {
                    return reply('❌ *Usage:* `.ban remove @user` or `.ban remove 234...`');
                }
                if (!database.isBanned(target)) {
                    return reply(`ℹ️ *+${target}* is currently walking free.`);
                }
                database.setBanned(target, false);
                return reply(
                    `╔══════════════════════════╗\n` +
                    `║  ✅ *EXILE LIFTED*        ║\n` +
                    `╚══════════════════════════╝\n\n` +
                    `🔓 *+${target}* has been welcomed back to the Lotus Prince’s grace.`
                );
            }

            // ── BAN ──────────────────────────────────────────────────────
            const target = extractTarget(msg, args);
            if (!target) {
                return reply(
                    `╔══════════════════════════╗\n` +
                    `║  🚫 *CELESTIAL EXILE*     ║\n` +
                    `╚══════════════════════════╝\n\n` +
                    `*Usage:*\n` +
                    `▸ .ban @user — tag the transgressor\n` +
                    `▸ .ban (reply to message)\n` +
                    `▸ .ban 2348012345678\n` +
                    `▸ .ban list — view exiled souls\n` +
                    `▸ .ban remove @user — lift exile\n\n` +
                    `_Exiled souls are silently ignored by the Lotus Prince._`
                );
            }

            if (database.isBanned(target)) {
                return reply(`⚠️ *+${target}* has already been exiled.`);
            }

            database.setBanned(target, true);
            return reply(
                `╔══════════════════════════╗\n` +
                `║  🚫 *USER EXILED*         ║\n` +
                `╚══════════════════════════╝\n\n` +
                `🔒 *+${target}* has been *exiled* by divine order.\n\n` +
                `┌─────────────────────────┐\n` +
                `│ 🟢 Status:  *BANNED*\n` +
                `│ 🤫 Mode:    *SILENT IGNORE*\n` +
                `└─────────────────────────┘\n\n` +
                `_All commands from this soul are now silenced._\n\n` +
                `Use *.ban remove @user* to lift this judgment.`,
                { mentions: [`${target}@s.whatsapp.net`] }
            );
        } catch (err) {
            console.error('[NEZHA-BAN]', err);
            return reply(`❌ The heavens are obstructed: ${err.message}`);
        }
    }
};
