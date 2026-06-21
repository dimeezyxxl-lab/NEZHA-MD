/**
 * Speak — Project a Celestial Voice
 * Usage: .speak <text>
 */

module.exports = {
    name: 'speak',
    aliases: ['voice', 'vocalize', 'resonance'],
    description: 'Manifest text into divine vocalization using the Oracle\'s voice.',
    category: 'general',
    async execute({ args, reply, sock, msg, from }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply('❌ *No essence provided.* Please provide the text you wish the Oracle to vocalize.');
        }
        
        try {
            await reply('🎙️ _Vocalizing essence…_');
            const url = 'https://translate.google.com/translate_tts?ie=UTF-8&q=' + encodeURIComponent(text) + '&tl=en&client=tw-ob';
            const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            const buf = Buffer.from(await r.arrayBuffer());
            
            await sock.sendMessage(from, { 
                audio: buf, 
                mimetype: 'audio/mpeg', 
                ptt: true // Treated as a voice note
            }, { quoted: msg });
            
        } catch (e) { 
            return reply(`❌ *Vocalization failed:* _${e.message}_`); 
        }
    }
};
