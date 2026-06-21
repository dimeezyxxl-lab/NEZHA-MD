/**
 * Travel — Embark on a Celestial Pilgrimage to new realms.
 */
const cloud = require('../../utils/cloudEconomy');
const { renderTravelCard } = require('../../utils/canvasRender');

module.exports = {
    name: 'travel',
    aliases: ['goto', 'fly', 'pilgrimage', 'journey'],
    description: 'Travel to a different celestial realm (canvas card)',
    category: 'economy',
    async execute({ sock, m, sender, reply, args }) {
        const id = (args[0] || '').toLowerCase();
        
        if (!id) {
            let msg = `🗺️ *CELESTIAL PILGRIMAGE — Choose your path*\n\n`;
            for (const [k, l] of Object.entries(cloud.LOCATIONS)) {
                msg += `*${l.name}*\n${cloud.SYMBOL} ${l.cost.toLocaleString()} • ${l.description}\n\`.travel ${k}\`\n\n`;
            }
            return reply(msg);
        }
        
        const loc = cloud.LOCATIONS[id];
        if (!loc) return reply(`❌ *Unknown Realm:* This location is not recorded in the celestial maps.`);
        
        const linked = await cloud.requireLinked(sender, reply);
        if (!linked) return;

        const ps = await cloud.getPlayerState(linked.uid);
        if (ps.location === id) return reply(`📍 *You are already present in ${loc.name}.*`);

        const w = await cloud.getWallet(linked.uid);
        if (w.wallet < loc.cost) return reply(`❌ *Insufficient Offering:* You need ${cloud.SYMBOL} ${loc.cost.toLocaleString()} to undertake this journey.`);

        const walletAfter = w.wallet - loc.cost;
        if (loc.cost) await cloud.updateWallet(linked.uid, { wallet: walletAfter });
        await cloud.setPlayerLocation(linked.uid, id);
        if (loc.cost) await cloud.logTx(linked.uid, `travel_${id}`, -loc.cost, { location: id });

        try {
            const buf = await renderTravelCard({
                from: ps.location,
                to: id,
                cost: loc.cost,
                walletAfter,
                description: loc.description,
            });
            await sock.sendMessage(m.key.remoteJid, {
                image: buf,
                caption: `✈️ *Pilgrimage Complete: Arrived at ${loc.name}*\n_${loc.description}_`,
            }, { quoted: m });
        } catch (e) {
            reply(`✈️ *Pilgrimage Complete: Arrived at ${loc.name}*\n_${loc.description}_`);
        }
    },
};
