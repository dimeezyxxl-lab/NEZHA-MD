/**
 * AntiBot Command — Admin Only
 *
 * The Lotus Prince scans the battlefield for unauthorized mechanical entities.
 *
 * Usage:
 *   .antibot on     — enable, warn first then kick on 2nd hit
 *   .antibot kick   — enable, kick immediately on first hit
 *   .antibot warn   — enable, warn only (no kick)
 *   .antibot off    — disable
 *   .antibot status — show current settings
 *   .antibot scan   — scan group for suspected bots now
 */

const database = require('../../utils/database');

// Multi-device JID: number:device@s.whatsapp.net where device > 0
function isMdBotJid(jid) {
    const m = String(jid).match(/^(\d+):(\d+)@s\.whatsapp\.net$/);
    return m && parseInt(m[2], 10) > 0;
}

module.exports = {
    name: 'antibot',
    aliases: ['nobot', 'antibots'],
    description: 'Detect and remove unauthorized mechanical entities',
    category: 'admin',

    async execute({ sock, reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');

        const action = (args[0] || '').toLowerCase();
        const grp = database.getGroup(from);
        const isEnabled = grp.antibot || false;
        const currentMode = grp.antibotMode || 'kick';

        if (!action || !['on', 'off', 'kick', 'warn', 'status', 'scan'].includes(action)) {
            return reply(
                `╔══════════════════════════╗\n` +
                `║      🔥 *NEZHA-ANTI*      ║\n` +
                `╚══════════════════════════╝\n\n` +
                `Status: ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                `Mode: *${currentMode.toUpperCase()}*\n\n` +
                `*Usage:*\n` +
                `▸ .antibot on     — enable (warn → kick)\n` +
                `▸ .antibot kick   — instant purge on detection\n` +
                `▸ .antibot warn   — warn only, no purge\n` +
                `▸ .antibot off    — disable protection\n` +
                `▸ .antibot scan   — purge bots now\n` +
                `▸ .antibot status — check protection status\n\n` +
                `*Detection Protocol:*\n` +
                `✓ Multi-device JID identification\n` +
                `✓ Command prefix interference\n` +
                `✓ Known bot response patterns\n\n` +
                `_Admins and the Lotus Prince are exempt._`
            );
        }

        if (action === 'status') {
            return reply(
                `🔥 *Anti-Bot Celestial Status*\n\n` +
                `Status: ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                `Mode: *${currentMode.toUpperCase()}*\n\n` +
                `_${isEnabled
                    ? currentMode === 'kick'
                        ? 'Bots are warned on 1st strike, purged on 2nd.'
                        : 'Bots will only be warned.'
                    : 'Activate with .antibot on or .antibot kick'
                }_`
            );
        }

        if (action === 'off') {
            database.setGroup(from, 'antibot', false);
            return reply('❌ *Protection protocols disengaged.*');
        }

        if (action === 'on' || action === 'kick' || action === 'warn') {
            const mode = action === 'warn' ? 'warn' : 'kick';
            database.setGroup(from, 'antibot', true);
            database.setGroup(from, 'antibotMode', mode);
            return reply(
                `✅ *Protection protocols engaged*\n\n` +
                `Mode: *${mode.toUpperCase()}*\n\n` +
                `_${mode === 'kick'
                    ? '🦾 Bots warned on 1st strike, purged on 2nd.'
                    : '⚠️ Bots will receive a warning only.'
                }_`
            );
        }

        if (action === 'scan') {
            await reply('🔍 *The Lotus Prince is scanning the battlefield...*');
            try {
                const meta = await sock.groupMetadata(from);
                const botSelf = sock.user?.id;
                const botPhone = (botSelf || '').split('@')[0].split(':')[0].replace(/\D/g, '');
                const botJids = new Set([botSelf, `${botPhone}@s.whatsapp.net`].filter(Boolean));

                const botIsAdmin = meta.participants.some(p => {
                    const pPhone = String(p.id).split('@')[0].split(':')[0].replace(/\D/g, '');
                    return (botJids.has(p.id) || pPhone === botPhone) && p.admin;
                });

                const adminSet = new Set(
                    meta.participants.filter(p => p.admin).map(p => p.id)
                );

                const detected = meta.participants.filter(p => {
                    if (botJids.has(p.id)) return false;
                    if (adminSet.has(p.id)) return false;
                    return isMdBotJid(p.id);
                });

                if (!detected.length) {
                    return reply(
                        `✅ *The battlefield is pure!*\n\n` +
                        `Scanned ${meta.participants.length} souls.\n` +
                        `_No unauthorized entities detected._`
                    );
                }

                const list = detected.map(p => `• @${p.id.split('@')[0]}`).join('\n');
                if (!botIsAdmin) {
                    return reply(
                        `🤖 *${detected.length} mechanical entities found:*\n\n${list}\n\n` +
                        `❌ I require administrative authority to purge these entities.\n` +
                        `_Promote the Lotus Prince, then try again._`
                    );
                }

                await reply(
                    `🤖 *${detected.length} mechanical entities detected:*\n\n${list}\n\n` +
                    `_Purging now..._`
                );

                let removed = 0;
                for (const bot of detected) {
                    try {
                        await sock.groupParticipantsUpdate(from, [bot.id], 'remove');
                        removed++;
                        await new Promise(r => setTimeout(r, 600));
                    } catch (_) {}
                }

                return reply(`✅ Successfully purged *${removed}/${detected.length}* entities from the battlefield.`);
            } catch (err) {
                return reply(`❌ The scan encountered a disturbance: ${err.message}`);
            }
        }
    },
};
