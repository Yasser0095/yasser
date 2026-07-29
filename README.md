
# دردشة - Dardasha Chat Pro v2.0

موقع محادثات متكامل بالعربي مع:
✅ تسجيل دخول بالإيميل (JWT)
✅ محادثات فردية وجماعية
✅ إنشاء مجموعات
✅ مكالمات صوت وفيديو WebRTC
✅ بث جماعي Live Broadcast
✅ قاعدة بيانات MongoDB / Supabase جاهزة

## التشغيل السريع

1. السيرفر:
cd server
npm install
npm start
-> http://localhost:3000

2. قاعدة البيانات:
- اختر MongoDB Atlas أو Supabase
- انسخ الملف من database/ وشغله

3. العميل:
افتح client/index.html أو سيعمل تلقائيا من السيرفر

## كيف تعمل المميزات الجديدة
- **الصوت/الفيديو:** WebRTC + Socket.io signaling (peer to peer)
- **المجموعات:** POST /api/groups {name, members}
- **البث:** زر "بدء بث جماعي" يشارك الكاميرا مع كل أعضاء الغرفة
- **تسجيل الدخول:** يعمل حاليا Mock، اربطه بـ Firebase Auth أو Supabase Auth بسهولة

## للنشر
- ارفع السيرفر على Render / Railway
- العميل على Vercel
- قاعدة البيانات على MongoDB Atlas

المطور: لك
