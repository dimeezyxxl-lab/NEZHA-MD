/**
 * Wordcount — Invoke Script of Analytical Insight
 * Usage: .wordcount <text>
 */

module.exports = {
    name: 'wordcount',
    aliases: ['wc', 'charcount', 'analyze', 'insight'],
    description: 'Deconstruct the architecture of your prose with the Script of Analytical Insight.',
    category: 'utility',
    async execute({ reply, args, msg }) {
        let text = args.join(' ');
        
        // If no text, check if the Lotus Prince should analyze a quoted vision
        if (!text && msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            const q = msg.message.extendedTextMessage.contextInfo.quotedMessage;
            text = q.conversation || q.extendedTextMessage?.text || '';
        }
        
        if (!text) {
            return reply(
                `📊 *Script of Analytical Insight*\n\n` +
                `The Lotus Prince awaits the text you wish to deconstruct.\n\n` +
                `Usage: .wordcount <text>\n` +
                `Or reply to a message with .wordcount\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const lines = text.split('\n').length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        
        reply(
            `📊 *Analytical Insight Manifested*\n\n` +
            `📝 Words: *${words}*\n` +
            `🔤 Characters: *${chars}*\n` +
            `🔡 Chars (no spaces): *${charsNoSpace}*\n` +
            `📄 Lines: *${lines}*\n` +
            `💬 Sentences: *${sentences}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
