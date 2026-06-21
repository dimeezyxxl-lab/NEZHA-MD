/**
 * Instagram — Execute Celestial Archive Extraction
 * Usage: .instagram <url>
 */

const https = require('https');

module.exports = {
    name: 'instagram',
    aliases: ['ig', 'igdl', 'extract'],
    description: 'Extract media visions from the mortal archives of Instagram.',
    category: 'media',
    async execute({ sock, msg, from, reply, args }) {
        if (!args.length) {
            return reply(
                `📸 *Celestial Archive Extraction*\n\n` +
                `Usage: .instagram <post url>\n` +
                `Example: .instagram https://instagram.com/p/ABC123`
            );
        }

        const url = args[0];
        
        if (!url.includes('instagram.com')) {
            return reply('❌ *Invalid resonance:* Please provide a valid Instagram URL.');
        }

        try {
            await reply('⏳ *Summoning media from the mortal archives...*');
            
            const apiUrl = `https://api.lolhuman.xyz/api/instagram?apikey=free&url=${encodeURIComponent(url)}`;
            
            https.get(apiUrl, { timeout: 30000 }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', async () => {
                    try {
                        const result = JSON.parse(data);
                        if (result.status === 200 && result.result) {
                            const mediaUrl = Array.isArray(result.result) ? result.result[0] : result.result;
                            
                            if (mediaUrl.includes('.mp4')) {
                                await sock.sendMessage(from, {
                                    video: { url: mediaUrl },
                                    caption: '📸 *Extracted Celestial Vision (Video)*'
                                }, { quoted: msg });
                            } else {
                                await sock.sendMessage(from, {
                                    image: { url: mediaUrl },
                                    caption: '📸 *Extracted Celestial Vision (Photo)*'
                                }, { quoted: msg });
                            }
                        } else {
                            reply('❌ *Extraction failed:* The vision may be private or beyond the sanctuary’s reach.');
                        }
                    } catch (e) {
                        reply('❌ *Extraction resonance error:* The URL could not be processed.');
                    }
                });
            }).on('error', () => {
                reply('❌ *Archive connection failed:* The portal could not be reached.');
            });
        } catch (err) {
            reply('❌ *Manifestation error:* An error occurred during extraction.');
        }
    }
};
