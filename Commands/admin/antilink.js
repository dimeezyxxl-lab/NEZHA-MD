/**
 * AntiLink Command — Robust protection against external chaos
 * Usage: .antilink on/off/strict/status
 */

const database = require('../../utils/database');

module.exports = {
    name: 'antilink',
    aliases: ['nolink', 'antilinks'],
    description: 'Enable/disable robust anti-link protection in group',
    category: 'admin',
    async execute({ reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        // ── Admin Gate ──
        if (!isAdmin) {
            return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');
        }
        
        const action = args[0]?.toLowerCase();
        const group = database.getGroup(from);

        if (!action || !['on', 'off', 'strict', 'status', 'delete', 'kick', 'mute'].includes(action)) {
            const warnings = group.antilinkWarnings || {};
            const totalWarnings = Object.values(warnings).reduce((a, b) => a + b, 0);
            
            return reply(
                `🔗 *NEZHA-ANTI-LINK*\n\n` +
                `Status: ${group.antilink ? (group.antilinkMode === 'strict' ? '🔴 STRICT' : '✅ ON') : '❌ OFF'}\n` +
                `Mode: ${group.antilinkMode || 'normal'}\n` +
                `Action: ${(group.antilinkAction || 'warn').toUpperCase()}\n` +
                `Max Warnings: ${group.antilinkMaxWarnings || 3}\n` +
                `Total Violations: ${totalWarnings}\n\n` +
                `*Celestial Commands:*\n` +
                `• .antilink on — Engage (warn + delete)\n` +
                `• .antilink off — Disengage\n` +
                `• .antilink strict — Immediate purge mode\n` +
                `• .antilink status — View protection status\n\n` +
                `*Judgment System:*\n` +
                `• 1st-2nd strike: Warning\n` +
                `• 3rd strike: Mute/Purge\n\n` +
                `*Detected Threats:*\n` +
                `✓ Web protocols (http/https)\n` +
                `✓ Invitation links (WA/TG/Discord)\n` +
                `✓ Shortened/Obfuscated URLs`
            );
        }

        if (action === 'status') {
            const warnings = group.antilinkWarnings || {};
            const totalWarnings = Object.values(warnings).reduce((a, b) => a + b, 0);
            
            return reply(
                `🔗 *Anti-Link Celestial Status*\n\n` +
                `Status: ${group.antilink ? (group.antilinkMode === 'strict' ? '🔴 STRICT' : '✅ ON') : '❌ OFF'}\n` +
                `Mode: ${group.antilinkMode || 'normal'}\n` +
                `Action: ${(group.antilinkAction || 'warn').toUpperCase()}\n` +
                `Max Warnings: ${group.antilinkMaxWarnings || 3}\n` +
                `Total Violations: ${totalWarnings}\n` +
                `Judgment Window: ${group.antilinkCooldown || 24} hours\n\n` +
                `*Defensive coverage:* Web links, invites, and obfuscated URLs are monitored by the Lotus Prince.`
            );
        }

        if (action === 'on') {
            database.setGroup(from, 'antilink', true);
            database.setGroup(from, 'antilinkMode', 'normal');
            database.setGroup(from, 'antilinkAction', 'mute');
            database.setGroup(from, 'antilinkMaxWarnings', 3);
            database.setGroup(from, 'antilinkCooldown', 24);
            reply(
                `✅ *Anti-Link Protocols Engaged*\n\n` +
                `Mode: Normal\n` +
                `Judgment: Warn → Mute after 3 violations\n` +
                `Window: 24 hours\n\n` +
                `The Lotus Prince shall erase external links.`
            );
        } else if (action === 'off') {
            database.setGroup(from, 'antilink', false);
            database.setGroup(from, 'antilinkMode', 'off');
            reply('❌ *Anti-Link Protocols Disengaged*');
        } else if (action === 'strict') {
            database.setGroup(from, 'antilink', true);
            database.setGroup(from, 'antilinkMode', 'strict');
            database.setGroup(from, 'antilinkAction', 'kick');
            reply(
                `🔴 *Anti-Link Strict Mode Engaged*\n\n` +
                `⚠️ JUDGMENT: Strict mode is active!\n\n` +
                `• Links are instantly erased\n` +
                `• Violators are purged on FIRST strike\n` +
                `• No mercy for external invaders\n\n` +
                `Use .antilink on for standard judgment.`
            );
        } else if (['delete', 'kick', 'mute'].includes(action)) {
            database.setGroup(from, 'antilink', true);
            database.setGroup(from, 'antilinkAction', action);
            reply(
                `✅ *Anti-Link Protocol Updated*\n\n` +
                `New Judgment: ${action.toUpperCase()}\n\n` +
                `The Lotus Prince shall execute this command upon threshold breach.`
            );
        }
    }
};
