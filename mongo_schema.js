
// MongoDB Schema - ضع هذا في MongoDB Atlas أو Local

// 1. Users Collection
{
  _id: ObjectId,
  name: String,
  email: { type: String, unique: true },
  password: String (hashed),
  avatar: String,
  status: "online" | "offline",
  lastSeen: Date,
  createdAt: Date
}

// 2. Messages Collection
{
  _id: ObjectId,
  roomId: String, // userId أو groupId
  senderId: String,
  type: "text" | "image" | "file" | "voice" | "video_call",
  content: String,
  fileUrl: String,
  readBy: [userId],
  createdAt: Date
}

// 3. Groups Collection
{
  _id: ObjectId,
  name: String,
  avatar: String,
  members: [userId],
  admins: [userId],
  createdBy: userId,
  createdAt: Date,
  lastMessage: ObjectId
}

// 4. Broadcasts Collection - البث الجماعي
{
  _id: ObjectId,
  title: String,
  broadcasterId: userId,
  roomId: String,
  viewers: [userId],
  isLive: Boolean,
  startedAt: Date
}
