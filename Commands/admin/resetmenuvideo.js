'use strict';
const fs   = require('fs');
const path = require('path');
const VIDEO_PATH = path.resolve(__dirname, '..', '..', 'assets', 'menuvideo.mp4');

module.exports = {
    name: 'resetmenuvideo',
    aliases: ['clearmenuvideo', 'unsetmenuvideo'],
    description: 'Remove the custom menu video',
    category: 'admin',
    async execute({ reply, isOwner }) {
        if (!isOwner) return reply('🛡️ *Celestial Decree!*\n\n❌ Only the Supreme Master may alter the visual manifestations of the Lotus Prince.');
        
        try {
            if (fs.existsSync(VIDEO_PATH)) {
                fs.unlinkSync(VIDEO_PATH);
                return reply('🔥 The celestial video manifestation has been purged.');
            }
            return reply('ℹ️ No custom video manifestation is currently active.');
        } catch (e) {
            return reply('❌ A disturbance in the heavens: ' + e.message);
        }
    }
};
