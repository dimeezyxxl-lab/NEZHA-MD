/**
 * MentionReact — Invoke Lotus Seal Presence
 * Usage: .mentionreact [set/off/status]
 */

const database = require('../../utils/database');

module.exports = {
    name: 'mentionreact',
    aliases: ['mreact', 'mentionreaction', 'lotusseal', 'seal'],
    description: 'Bestow the Lotus Seal upon any inquiry that calls your name.',
    category: 'owner',

    async execute({ reply, args, phoneNumber, sender, isOwner, isMod }) {
        if (!isOwner && !isMod) return reply('❌ _This divine marking is reserved for the Prince and his chosen attendants._');

        const userPhone = sender.split('@')[0].split(':')[0].replace(/\D/g, '');
        const action = (args[0] || '').toLowerCase();
        const current = database.getMentionReact(phoneNumber, userPhone);

        if (!action || action === 'status') {
            return reply(
                `╔══════════════════════════╗\n` +
                `║   ⚡ *LOTUS SEAL STATUS*   ║\n` +
                `╚══════════════════════════╝\n\n` +
                `Status: ${current?.enabled ? `✅ ACTIVE  —  ${current.emoji}` : '❌ DORMANT'}\n\n` +
                `*Ritual Usage:*\n` +
                `▸ .mentionreact set 🔥\n` +
                `▸ .mentionreact off\n` +
                `▸ .mentionreact status\n\n` +
                `_Whenever a soul calls out to you, the bot shall manifest your Lotus Seal upon their missive._`
            );
        }

        if (action === 'off' || action === 'disable') {
            database.setMentionReact(phoneNumber, { enabled: false, emoji: current?.emoji || '👀' }, userPhone);
            return reply('❌ *LOTUS SEAL DORMANT*');
        }

        if (action === 'set' || action === 'on') {
            const emoji = args[1]?.trim();
            if (!emoji) return reply('❌ _The Seal requires a symbol!_\n\n_Example:_ `.mentionreact set 🔥`');
            database.setMentionReact(phoneNumber, { enabled: true, emoji }, userPhone);
            return reply(
                `✅ *LOTUS SEAL AWAKENED: ${emoji}*\n\n` +
                `_The divine mark ${emoji} shall henceforth be bestowed upon all who summon you._\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        // Shortcut support
        const emoji = args[0]?.trim();
        if (emoji && emoji.length < 3) { // rudimentary emoji check
            database.setMentionReact(phoneNumber, { enabled: true, emoji }, userPhone);
            return reply(`✅ *LOTUS SEAL AWAKENED: ${emoji}*`);
        }

        return reply('❓ _Ritual Usage: .mentionreact set <emoji> | .mentionreact off_');
    },
};
