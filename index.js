const mineflayer = require('mineflayer');
const express = require('express');

// Web Server để giữ Render online
const app = express();
app.get('/', (req, res) => res.send('Bot Minecraft 1.20.1 đang treo 24/7 thành công!'));
app.listen(3000, () => console.log('Web Server ready!'));

// Cấu hình Bot
function startBot() {
    console.log('Đang kết nối tới server monlight.play.hosting:14045...');

    const bot = mineflayer.createBot({
        host: 'monlight.play.hosting',
        port: 14045,
        username: 'Bot_Treo_247',
        version: '1.20.1'
    });

    bot.on('spawn', () => {
        console.log('✅ Bot đã vào server 1.20.1 thành công!');

        // Tự động gõ lệnh /register
        setTimeout(() => {
            bot.chat('/register phongkaka11 phongkaka11');
            console.log('🔑 Đã gửi lệnh: /register phongkaka11 phongkaka11');
        }, 1500);

        // Nhảy chống AFK mỗi 30s
        setInterval(() => {
            if (bot && bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 1000);
            }
        }, 30000);
    });

    bot.on('error', err => console.log('❌ Lỗi Bot:', err.message));
    bot.on('end', () => {
        console.log('⚠️ Mất kết nối! Đang thử vào lại sau 10 giây...');
        setTimeout(startBot, 10000);
    });
}

startBot();
