// models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';
import bcrypt from 'bcryptjs';

interface UserAttributes {
    id: number;  // Include id as a required attribute
    phone: string;
    name?: string;
    fiverrName?: string;
    password: string;
    currentLevel: 'level1' | 'level2' | 'level3' | 'level4';
    totalScore?: number;
    tapCount?: {
        correctTap: number;
        missedTap: number;
        wrongTap: number;
    };
    themeColor?: string;
    profilePicture?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User2 extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;  // Mark id as public
    public phone!: string;
    public name?: string;
    public fiverrName?: string;
    public password!: string;
    public currentLevel!: 'level1' | 'level2' | 'level3' | 'level4';
    public totalScore!: number;
    public tapCount!: {
        correctTap: number;
        missedTap: number;
        wrongTap: number;
    };
    public themeColor!: string;
    public profilePicture?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User2.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Make id the primary key
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    fiverrName: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    currentLevel: {
        type: DataTypes.ENUM('level1', 'level2', 'level3', 'level4'),
        defaultValue: 'level1',
    },
    totalScore: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    tapCount: {
        type: DataTypes.JSON, // Use JSON type for tapCount
        defaultValue: { correctTap: 0, missedTap: 0, wrongTap: 0 },
    },
    themeColor: {
        type: DataTypes.STRING,
        defaultValue: '#1dbf73',
    },
    profilePicture: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'User2',
    timestamps: true,
});

export default User2;
