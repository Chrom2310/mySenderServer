import { Schema, model } from 'mongoose';
// import { connect } from './connect';

export interface IUser {
    _id: string;
    login: string;
    lastName: string;
    firstName: string;
    password: string;
}

const schemaUser = new Schema<IUser>({
    login: {type: String, required: true},
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    password: {type: String, required: true},
});

// console.log('connect', connect)

const UserModel = model<IUser>('User', schemaUser);

export default UserModel;