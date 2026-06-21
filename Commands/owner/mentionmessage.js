/**
 * MentionMessage — Invoke Echo of the Lotus Prince
 * Usage: .mentionmessage [set/off/clear/status]
 */

const database = require('../../utils/database');

module.exports = {
    name: 'mentionmessage',
    aliases: ['mmessage', 'mentionmsg', 'mmsg', 'mentionreply', 'echo'],
    description: 'Invoke an Echo of the Lotus Prince when you are called in a sanctuary.',
    category: 'owner',

    async execute({ reply, args, phoneNumber, sender, isOwner, isMod }) {
        if (!isOwner && !isMod) return reply('❌ _This manifestation is reserved for the Prince and his chosen attendants._');

        const userPhone = sender.split('@')[0].split(':')[0].replace(/\D/g, '');
        const action = (args[0] || '').toLowerCase();
        const current = database.getMentionMessage(phoneNumber, userPhone);

        if (!action || action === 'status') {
            return reply(
                `╔══════════════════════════╗\n` +
                `║  💬 *LOTUS ECHO STATUS*   ║\n` +
                `╚══════════════════════════╝\n\n` +
                `Manifestation: ${current?.enabled ? '✅ ACTIVE' : '❌ DORMANT'}\n` +
                `Echo Message: ${current?.message ? `_"${current.message}"_` : '_(not yet inscribed)_'}\n\n` +
                `*Ritual Usage:*\n` +
                `▸ .mentionmessage set <text>\n` +
                `▸ .mentionmessage off\n` +
                `▸ .mentionmessage clear\n` +
                `▸ .mentionmessage status\n\n` +
                `_Whenever a soul calls out to you, the bot shall manifest this Echo in your stead._`
            );
        }

        if (action === 'off' || action === 'disable') {
            database.setMentionMessage(phoneNumber, { enabled: false, message: current?.message || '' }, userPhone);
            return reply('❌ *LOTUS ECHO DORMANT*');
        }

        if (action === 'clear') {
            database.setMentionMessage(phoneNumber, { enabled: false, message: '' }, userPhone);
            return reply('🗑️ *LOTUS ECHO ERASURE COMPLETE*');
        }

        if (action === 'set' || action === 'on') {
            const message = args.slice(1).join(' ').trim();
            if (!message) return reply('❌ _The Echo lacks content!_\n\n_Example:_ `.mentionmessage set I am currently meditating.`');
            database.setMentionMessage(phoneNumber, { enabled: true, message }, userPhone);
            return reply(
                `✅ *LOTUS ECHO ACTIVATED*\n\n` +
                `Echo Message: _"${message}"_\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        return reply('❓ _Ritual Usage: .mentionmessage set <your message> | .mentionmessage off_');
    },
};
