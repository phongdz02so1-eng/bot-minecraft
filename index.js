const mineflayer = require('mineflayer');
const express = require('express');

// Web Server giữ Render online 24/7
const app = express();
app.get('/', (req, res) => res.send('Bot Minecraft 1.20.1 đang chạy!'));
app.listen(3000, () => console.log('Web Server ready!'));

// Cấu hình Bot dùng IP số trực tiếp
function startBot() {
    console.log('Đang kết nối tới IP trực tiếp 62.141.62.27:14045...');

    const bot = mineflayer.createBot({
        host: '62.141.62.27', // IP trực tiếp
        port: 14045,          // Port chính
        username: 'Bot_Treo_247',
        version: '1.20.1'
    });

    bot.on('spawn', () => {
        console.log('✅ Bot đã vào game bằng IP số thành công!');

        // 1. Tự động gõ /register (dành cho nick mới)
        setTimeout(() => {
            bot.chat('/register phongkaka11 phongkaka11');
            console.log('🔑 Đã gửi lệnh: /register phongkaka11 phongkaka11');
        }, 1500);

        // 2. Tự động gõ /login phongkaka11 (dành cho nick đã đăng ký từ trước)
        setTimeout(() => {
            bot.chat('/login phongkaka11');
            console.log('🔑 Đã gửi lệnh: /login phongkaka11');
        }, 2500);

        // Tự nhảy chống AFK mỗi 30 giây
        setInterval(() => {
            if (bot && bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 1000);
            }
        }, 30000);
    });

    bot.on('error', err => console.log('❌ Lỗi Bot:', err.message));

    bot.on('end', () => {
        console.log('⚠️ Mất kết nối! Thử vào lại sau 10 giây...');
        setTimeout(startBot, 10000);
    });
}

startBot();
