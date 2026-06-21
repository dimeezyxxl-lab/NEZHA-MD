'use strict';
const database     = require('../../utils/database');
const eventManager = require('../../lib/eventManager');

module.exports = {
    name: 'introcard',
    aliases: ['intro', 'introset'],
    description: 'Beautiful intro card for new group members (shows group PP)',
    category: 'admin',

    async execute({ sock, from, sender, reply, args, isGroup, isAdmin, isOwner, phoneNumber }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        if (!isOwner && !isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');

        const sub = (args[0] || '').toLowerCase();

        // ── .introcard on/off ──────────────────────────────────────────────
        if (sub === 'on') {
            database.setGroup(from, 'introcard', true);
            return reply(
                `╭─❒ ◈ 𝙉𝙀𝙕𝙃𝘼 ❒\n` +
                `│ ✅ *Intro Card Protocols Engaged*\n` +
                `│ New souls shall be greeted by the Lotus Prince.\n` +
                `╰─🔥 𝙫𝙚𝙧𝙞𝙛𝙞𝙚𝙙 𝙗𝙮 𝙇𝙤𝙩𝙪𝙨 𝙋ʳⁱⁿᶜᵉ`
            );
        }

        if (sub === 'off') {
            database.setGroup(from, 'introcard', false);
            return reply(
                `╭─❒ ◈ 𝙉𝙀𝙕𝙃𝘼 ❒\n` +
                `│ ❌ *Intro Card Protocols Disengaged*\n` +
                `╰─🔥 𝙫𝙚𝙧𝙞𝙛𝙞𝙚𝙙 𝙗𝙮 𝙇𝙤𝙩𝙪𝙨 𝙋ʳⁱⁿᶜᵉ`
            );
        }

        // ── .introcard msg <text> ──────────────────────────────────────────
        if (sub === 'msg') {
            const customMsg = args.slice(1).join(' ').trim();
            if (!customMsg) return reply('🚩 Please provide a greeting message.\nUse @user and @group as placeholders.');
            database.setGroup(from, 'introcardMessage', customMsg);
            return reply(
                `╭─❒ ◈ 𝙉𝙀𝙕𝙃𝘼 ❒\n` +
                `│ ✅ *Intro Message Set*\n` +
                `│ ${customMsg}\n` +
                `╰─🔥 𝙫𝙚𝙧𝙞𝙛𝙞𝙚𝙙 𝙗𝙮 𝙇𝙤𝙩𝙪𝙨 𝙋ʳⁱⁿᶜᵉ`
            );
        }

        // ── .introcard title <text> ────────────────────────────────────────
        if (sub === 'title') {
            const title = args.slice(1).join(' ').trim();
            if (!title) return reply('❌ Please provide a title.');
            database.setGroup(from, 'introcardTitle', title);
            return reply(`✅ Intro card title set to: *${title}*`);
        }

        // ── .introcard color <light|dark|fire|ocean|royal> ────────────────
        if (sub === 'color' || sub === 'theme') {
            const theme = args[1]?.toLowerCase();
            const valid = ['light', 'dark', 'fire', 'ocean', 'royal'];
            if (!theme || !valid.includes(theme))
                return reply(`❌ Choose a celestial theme: ${valid.join(', ')}`);
            database.setGroup(from, 'introcardTheme', theme);
            return reply(`✅ Intro card theme set to: *${theme}*`);
        }

        // ── .introcard reset ───────────────────────────────────────────────
        if (sub === 'reset') {
            database.setGroup(from, 'introcardMessage', null);
            database.setGroup(from, 'introcardTitle',   null);
            database.setGroup(from, 'introcardTheme',   null);
            return reply('✅ Intro card reset to celestial defaults.');
        }

        // ── .introcard preview / test ──────────────────────────────────────
        if (sub === 'preview' || sub === 'test') {
            try {
                const prev = database.getGroup(from).introcard;
                if (!prev) database.setGroup(from, 'introcard', true);
                await eventManager.handleGroupParticipantsEvent(sock, phoneNumber, {
                    id: from,
                    participants: [sender],
                    action: 'add',
                    author: sender,
                });
                if (!prev) database.setGroup(from, 'introcard', false);
            } catch (e) {
                return reply(`❌ A disturbance in the heavens: ${e.message}`);
            }
            return;
        }

        // ── Show status / help ─────────────────────────────────────────────
        const grp = database.getGroup(from);
        return reply(
            `╭─❒ ◈ 𝙉𝙀𝙕𝙃𝘼 — 𝗜𝗡𝗧𝗥𝗢 𝗖𝗔𝗥𝗗 ❒\n` +
            `│\n` +
            `│ 📌 *Status:* ${grp.introcard ? '✅ ON' : '❌ OFF'}\n` +
            `│ 🎨 *Theme:*  ${grp.introcardTheme || 'default'}\n` +
            `│ 📝 *Msg:*    ${grp.introcardMessage || 'default'}\n` +
            `│\n` +
            `│ ⚙️ *Celestial Commands:*\n` +
            `│ • .introcard on/off\n` +
            `│ • .introcard msg <text>  (@user @group)\n` +
            `│ • .introcard title <text>\n` +
            `│ • .introcard color <themes...>\n` +
            `│ • .introcard preview\n` +
            `│ • .introcard reset\n` +
            `╰─🔥 𝙫𝙚𝙧𝙞𝙛𝙞𝙚𝙙 𝙗𝙮 𝙇𝙤𝙩𝙪𝙨 𝙋ʳⁱⁿᶜᵉ`
        );
    },
};
