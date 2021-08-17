import { Schema, model } from 'mongoose';

export interface ISample {
    [key: string]: string | null;
}

export interface IEndPoint {
    userId: string;
    name: string;
    typeSend: 'email' | 'telegram';
    sample: ISample;
    token: string;
}

const schemaEndPoint = new Schema<IEndPoint>({
    userId: {type: String, required :true},
    name: {type: String, required :true},
    typeSend: {type: String, required :true},
    sample: {type: Object, required: true},
    token: {type: String, required :true},
})

const endPointModel = model<IEndPoint>('Sender', schemaEndPoint);

export default endPointModel;