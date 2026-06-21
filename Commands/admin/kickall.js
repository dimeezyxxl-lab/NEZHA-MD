/**
 * .kickall — ask for confirmation before mass-removing all non-admins.
 * Confirmation handled by .confirmkick within 60 seconds.
 */
const pendingKicks = require('../../utils/pendingKicks');

module.exports = {
    name: 'kickall',
    description: 'Remove all non-admin members (requires .confirmkick within 60s)',
    category: 'admin',

    async execute({ sock, msg, reply, from, sender, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');

        try {
            const meta = await sock.groupMetadata(from);
            const nonAdmins = meta.participants.filter(p => !p.admin);
            const count = nonAdmins.length;

            if (count === 0) return reply('✅ The battlefield is already clear of non-administrative souls.');

            pendingKicks.set(from, sender);

            await reply(
                `⚠️ *Initiate Celestial Purge*\n\n` +
                `This action will remove *${count}* soul${count === 1 ? '' : 's'} from this realm.\n\n` +
                `Send *.confirmkick* within *60 seconds* to execute the divine mandate.\n` +
                `*Ignore this message to abort the purge.*`
            );
        } catch (err) {
            reply(`❌ A disturbance in the heavens: ${err.message}`);
        }
    }
};
