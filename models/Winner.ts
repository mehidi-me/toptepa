// models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

interface UserAttributes {
    id: number;  // Include id as a required attribute
    user_id?: number
    name?: string;
    profilePicture?: string;
    totalTap?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class Winner extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number; 
    public user_id!: number; 
    public name?: string;
    public profilePicture?: string;
    public totalTap!: number;
}

Winner.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Make id the primary key
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profilePicture: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    totalTap: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Winner',
    timestamps: true,
});


export default Winner;
