import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor'], default: 'student' }
  },
  { timestamps: true }
);

// ✅ EXPORT DEFAULT (this is what fixes your error)
const User = mongoose.model('User', userSchema);
export default User;
