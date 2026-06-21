/**
 * Weather — Invoke Scrying of the Celestial Currents
 * Usage: .weather <city>
 */

const https = require('https');
const { renderWeatherCard } = require('../../utils/canvasRender');

function httpGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'curl/8' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

module.exports = {
    name: 'weather',
    aliases: ['wthr', 'forecast', 'scry'],
    description: 'Scry the Celestial Currents to forecast the skies.',
    category: 'utility',
    async execute({ sock, msg, from, reply, args }) {
        if (!args.length) {
            return reply(
                `🌤️ *Scrying of the Celestial Currents*\n\n` +
                `The Lotus Prince awaits the name of the realm to be scryed.\n\n` +
                `Usage: .weather <city name>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const city = args.join(' ');
        try {
            const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
            const raw = await httpGet(url);

            let data;
            try { data = JSON.parse(raw); } catch {
                return reply(`❌ _The currents are obscured; the realm "${city}" cannot be found._`);
            }
            if (!data?.current_condition?.[0]) {
                return reply(`❌ _The currents are obscured; the realm "${city}" cannot be found._`);
            }

            const cur  = data.current_condition[0];
            const area = data.nearest_area?.[0] || {};
            const cityName = area.areaName?.[0]?.value || city;
            const region   = area.region?.[0]?.value   || '';
            const country  = area.country?.[0]?.value  || '';
            const localTime = (cur.localObsDateTime || '').split(' ').slice(1).join(' ') || '';

            const buf = await renderWeatherCard({
                city: cityName,
                region,
                country,
                tempC:    parseInt(cur.temp_C, 10) || 0,
                feelsC:   parseInt(cur.FeelsLikeC, 10) || 0,
                condition: cur.weatherDesc?.[0]?.value || '',
                humidity: parseInt(cur.humidity, 10) || 0,
                windKph:  parseInt(cur.windspeedKmph, 10) || 0,
                uv:       parseInt(cur.uvIndex, 10) || 0,
                weatherCode: parseInt(cur.weatherCode, 10) || 0,
                localTime,
            });

            await sock.sendMessage(from, {
                image: buf,
                caption: `🌤️ *${cityName}* — ${cur.weatherDesc?.[0]?.value || ''} · ${cur.temp_C}°C\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
            }, { quoted: msg });
        } catch (err) {
            console.error('[weather]', err.message);
            reply('❌ _The scrying failed; the Lotus Prince encountered a disruption in the celestial currents._');
        }
    },
};
