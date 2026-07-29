
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET","POST"] }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Mock Database (استبدلها بـ MongoDB / Supabase)
let users = [];
let messages = [];
let groups = [];

// Auth - تسجيل دخول بالإيميل
app.post('/api/register', (req,res)=>{
  const { email, password, name } = req.body;
  const exists = users.find(u=>u.email===email);
  if(exists) return res.status(400).json({error:'الإيميل موجود مسبقاً'});
  const user = { id: Date.now().toString(), email, name, password, avatar: name[0] };
  users.push(user);
  res.json({ user, token: 'mock-jwt-'+user.id });
});
app.post('/api/login', (req,res)=>{
  const { email, password } = req.body;
  const user = users.find(u=>u.email===email);
  if(!user) return res.status(404).json({error:'المستخدم غير موجود'});
  res.json({ user, token: 'mock-jwt-'+user.id });
});

// Groups API - إنشاء مجموعة
app.post('/api/groups', (req,res)=>{
  const { name, members, createdBy } = req.body;
  const group = { id: Date.now().toString(), name, members, createdBy, createdAt: new Date() };
  groups.push(group);
  io.emit('group_created', group);
  res.json(group);
});
app.get('/api/groups', (req,res)=> res.json(groups));

// Socket.io Logic
io.on('connection', (socket)=>{
  console.log('مستخدم متصل:', socket.id);

  socket.on('join_room', (roomId)=>{
    socket.join(roomId);
    console.log(`انضم للغرفة ${roomId}`);
  });

  socket.on('send_message', (data)=>{
    messages.push(data);
    io.to(data.roomId).emit('receive_message', data);
  });

  // مكالمات صوت وفيديو - WebRTC Signaling
  socket.on('call_user', ({to, offer, type})=>{
    io.to(to).emit('incoming_call', { from: socket.id, offer, type });
  });
  socket.on('answer_call', ({to, answer})=>{
    io.to(to).emit('call_answered', { from: socket.id, answer });
  });
  socket.on('ice_candidate', ({to, candidate})=>{
    io.to(to).emit('ice_candidate', { from: socket.id, candidate });
  });
  socket.on('end_call', ({to})=>{
    io.to(to).emit('call_ended');
  });

  // البث الجماعي
  socket.on('start_broadcast', ({roomId, broadcasterId})=>{
    socket.to(roomId).emit('broadcast_started', { broadcasterId });
  });
  socket.on('join_broadcast', ({roomId})=>{
    socket.to(roomId).emit('viewer_joined', { viewerId: socket.id });
  });

  socket.on('disconnect', ()=>{
    console.log('مستخدم قطع:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> console.log(`🚀 Dardasha Server يعمل على http://localhost:${PORT}`));
