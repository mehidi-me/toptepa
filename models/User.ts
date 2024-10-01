import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    fiverrName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    currentLevel: {
        type: String,
        enum: ['level1', 'level2', 'level3', 'level4'],
        default: 'level1',
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    tapCount: {
        correctTap: {
            type: Number,
            default: 0,
        },
        missedTap: {
            type: Number,
            default: 0,
        },
        wrongTap: {
            type: Number,
            default: 0,
        },
    },
    themeColor: {
        type: String,
        default: '#1dbf73',
    },
    profilePicture: {
        type: String,
    },
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export default models.User || model('User', UserSchema);
