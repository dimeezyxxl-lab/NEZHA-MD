/**
 * AntiGroupMention Command — Protect group from @everyone/@group mentions
 * Usage: .antigroupmention on/off/set/get/status
 */

const database = require('../../utils/database');

module.exports = {
    name: 'antigroupmention',
    aliases: ['agm', 'notagall', 'antigmention'],
    description: 'Protect group from unauthorized @everyone / group-wide mentions',
    category: 'admin',
    async execute({ sock, reply, args, from, isGroup, isAdmin, isBotAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');

        const action = args[0]?.toLowerCase();
        const group = database.getGroup(from);
        const isEnabled = group.antigroupmention || false;
        const currentAction = group.antigroupmentionAction || 'delete';
        const violations = group.antigroupmentionViolations || 0;

        // ── No args or invalid — show full dashboard ──
        if (!action || !['on', 'off', 'set', 'get', 'status', 'reset'].includes(action)) {
            const statusIcon = isEnabled ? '🟢' : '🔴';
            const statusText = isEnabled ? 'ACTIVE' : 'INACTIVE';
            const actionIcon = currentAction === 'kick' ? '👢' : '🗑️';

            return reply(
                `╔══════════════════════════╗\n` +
                `║  🔥 *NEZHA-ANTI-MENTION* ║\n` +
                `╚══════════════════════════╝\n\n` +
                `┌─────────────────────────┐\n` +
                `│ ${statusIcon} Status:  *${statusText}*\n` +
                `│ ${actionIcon} Action:  *${currentAction.toUpperCase()}*\n` +
                `│ 📊 Violations: *${violations}*\n` +
                `└─────────────────────────┘\n\n` +
                `🔧 *CELESTIAL COMMANDS*\n` +
                `━━━━━━━━━━━━━━━━━━━━━\n` +
                `▸ .agm on — Engage protection\n` +
                `▸ .agm off — Disengage protection\n` +
                `▸ .agm set delete — Delete offense\n` +
                `▸ .agm set kick — Purge the offender\n` +
                `▸ .agm status — View configuration\n` +
                `▸ .agm reset — Reset counter\n\n` +
                `🔍 *PROHIBITED ACTIONS*\n` +
                `━━━━━━━━━━━━━━━━━━━━━\n` +
                `✓ @everyone tags\n` +
                `✓ @group tags\n` +
                `✓ Mass tagging\n` +
                `✓ Mention exploits\n\n` +
                `_Admins and the Lotus Prince are exempt._`
            );
        }

        // ── ON ──
        if (action === 'on') {
            if (isEnabled) {
                return reply(
                    `╔══════════════════════════╗\n` +
                    `║  ⚠️ *ALREADY ENGAGED*     ║\n` +
                    `╚══════════════════════════╝\n\n` +
                    `Protection is already active!\n` +
                    `Current action: *${currentAction.toUpperCase()}*\n\n` +
                    `Use .agm set <delete|kick> to adjust protocol.`
                );
            }
            database.setGroup(from, 'antigroupmention', true);
            database.setGroup(from, 'antigroupmentionAction', 'delete');
            database.setGroup(from, 'antigroupmentionViolations', 0);
            return reply(
                `╔══════════════════════════╗\n` +
                `║  ✅ *PROTECTION ENGAGED*  ║\n` +
                `╚══════════════════════════╝\n\n` +
                `🛡️ Anti-mention protocols are now *ACTIVE*\n\n` +
                `┌─────────────────────────┐\n` +
                `│ 🟢 Status:  *ON*\n` +
                `│ 🗑️ Action:  *DELETE*\n` +
                `│ 👑 Admins:  *Exempt*\n` +
                `└─────────────────────────┘\n\n` +
                `Unauthorized tags will be erased.\n\n` +
                `_Use .agm set kick for more severe judgment._`
            );
        }

        // ── OFF ──
        if (action === 'off') {
            database.setGroup(from, 'antigroupmention', false);
            return reply(
                `╔══════════════════════════╗\n` +
                `║  🔴 *PROTECTION DISENGAGED* ║\n` +
                `╚══════════════════════════╝\n\n` +
                `Anti-mention protocols turned *OFF*.\n` +
                `The battlefield is now open for all.\n\n` +
                `_Use .agm on to reinforce defenses._`
            );
        }

        // ── SET ──
        if (action === 'set') {
            const setAction = args[1]?.toLowerCase();
            if (!setAction || !['delete', 'kick'].includes(setAction)) {
                return reply(
                    `╔══════════════════════════╗\n` +
                    `║  ⚙️ *SET PROTOCOL*        ║\n` +
                    `╚══════════════════════════╝\n\n` +
                    `Choose the Lotus Prince's judgment:\n\n` +
                    `┌─────────────────────────┐\n` +
                    `│ 🗑️ .agm set delete\n` +
                    `│    → Erase the evidence\n` +
                    `│\n` +
                    `│ 👢 .agm set kick\n` +
                    `│    → Purge the transgressor\n` +
                    `└─────────────────────────┘`
                );
            }

            database.setGroup(from, 'antigroupmentionAction', setAction);
            database.setGroup(from, 'antigroupmention', true);

            const icon = setAction === 'kick' ? '👢' : '🗑️';
            const desc = setAction === 'kick'
                ? 'Transgressors will be *purged* immediately!'
                : 'Offending messages will be *erased*.';

            return reply(
                `╔══════════════════════════╗\n` +
                `║  ✅ *PROTOCOL UPDATED*    ║\n` +
                `╚══════════════════════════╝\n\n` +
                `${icon} Judgment set to: *${setAction.toUpperCase()}*\n\n` +
                `${desc}\n\n` +
                `_Protection protocols activated._`
            );
        }

        // ── GET / STATUS ──
        if (action === 'get' || action === 'status') {
            const statusIcon = isEnabled ? '🟢' : '🔴';
            const statusText = isEnabled ? 'ACTIVE' : 'INACTIVE';
            const actionIcon = currentAction === 'kick' ? '👢' : '🗑️';
            const bar = isEnabled ? '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓' : '░░░░░░░░░░░░░░░░░░░░';

            return reply(
                `╔══════════════════════════╗\n` +
                `║  📊 *AGM CELESTIAL STATUS* ║\n` +
                `╚══════════════════════════╝\n\n` +
                `┌─────────────────────────┐\n` +
                `│ ${statusIcon} Status:     *${statusText}*\n` +
                `│ ${actionIcon} Action:     *${currentAction.toUpperCase()}*\n` +
                `│ 📈 Violations: *${violations}*\n` +
                `│ 👑 Exempted:   *Admins*\n` +
                `└─────────────────────────┘\n\n` +
                `Defense Level: [${bar}]\n\n` +
                `_Last update: ${new Date().toLocaleString()}_`
            );
        }

        // ── RESET ──
        if (action === 'reset') {
            database.setGroup(from, 'antigroupmentionViolations', 0);
            return reply(
                `╔══════════════════════════╗\n` +
                `║  🔄 *VIOLATIONS RESET*   ║\n` +
                `╚══════════════════════════╝\n\n` +
                `📊 The violation count has been returned to *0*.\n\n` +
                `_A fresh start for the battlefield._`
            );
        }
    }
};
