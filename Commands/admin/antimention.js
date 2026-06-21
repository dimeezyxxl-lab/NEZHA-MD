/**
 * AntiMention Command — Configure protection against mass mentions
 * Usage: .antimention on/off/strict/status
 */

const database = require('../../utils/database');

module.exports = {
    name: 'antimention',
    aliases: ['antitag', 'nomentions', 'antimention'],
    description: 'Configure anti-mass-mention protection',
    category: 'admin',
    async execute({ reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        // ── Admin Gate ──
        if (!isAdmin) {
            return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');
        }

        const action = args[0]?.toLowerCase();
        const group = database.getGroup(from);

        if (!action || !['on', 'off', 'strict', 'status'].includes(action)) {
            return reply(
                `🛡️ *NEZHA-ANTI-MENTION*\n\n` +
                `Status: ${group.antimention ? (group.antimentionMode === 'strict' ? '🔴 STRICT' : '✅ ON') : '❌ OFF'}\n` +
                `Action: ${(group.antimentionAction || 'warn').toUpperCase()}\n` +
                `Max Mentions: ${group.antimentionMax || 5}\n\n` +
                `*Celestial Commands:*\n` +
                `• .antimention on — Engage (warn + delete)\n` +
                `• .antimention off — Disengage\n` +
                `• .antimention strict — Purge mode (kick on violation)\n` +
                `• .antimention status — View current protection\n\n` +
                `*Detected Threats:*\n` +
                `✦ @everyone / @admins\n` +
                `✦ Mass tagging (${group.antimentionMax || 5}+ users)\n` +
                `✦ Spam tagging`
            );
        }

        if (action === 'status') {
            const warnings = group.antimentionWarnings || {};
            const totalWarnings = Object.values(warnings).reduce((a, b) => a + b, 0);
            
            return reply(
                `🛡️ *Anti-Mention Celestial Status*\n\n` +
                `Status: ${group.antimention ? (group.antimentionMode === 'strict' ? '🔴 STRICT' : '✅ ON') : '❌ OFF'}\n` +
                `Mode: ${group.antimentionMode || 'normal'}\n` +
                `Action: ${(group.antimentionAction || 'warn').toUpperCase()}\n` +
                `Max Mentions allowed: ${group.antimentionMax || 5}\n` +
                `Total Warnings Issued: ${totalWarnings}\n\n` +
                `*The Lotus Prince monitors:*\n` +
                `✦ Global tags (@everyone/@admins)\n` +
                `✦ Mass member tagging\n` +
                `✦ Spam-tagging tactics`
            );
        }

        if (action === 'on') {
            database.setGroup(from, 'antimention', true);
            database.setGroup(from, 'antimentionMode', 'normal');
            database.setGroup(from, 'antimentionAction', 'warn');
            database.setGroup(from, 'antimentionMax', 5);
            reply(
                `✅ *Anti-Mention Protocols Engaged*\n\n` +
                `Mode: Normal\n` +
                `Judgment: Warn + Erase\n` +
                `Threshold: 5 mentions\n\n` +
                `The Lotus Prince shall maintain order on the battlefield.`
            );
        } else if (action === 'off') {
            database.setGroup(from, 'antimention', false);
            database.setGroup(from, 'antimentionMode', 'off');
            reply('❌ *Anti-Mention Protocols Disengaged*');
        } else if (action === 'strict') {
            database.setGroup(from, 'antimention', true);
            database.setGroup(from, 'antimentionMode', 'strict');
            database.setGroup(from, 'antimentionAction', 'kick');
            database.setGroup(from, 'antimentionMax', 3);
            reply(
                `🔴 *Anti-Mention Strict Mode Engaged*\n\n` +
                `Mode: STRICT\n` +
                `Judgment: Purge (Kick) + Erase\n` +
                `Threshold: 3 mentions\n\n` +
                `⚠️ Violators shall be purged from the battlefield!`
            );
        }
    }
};
