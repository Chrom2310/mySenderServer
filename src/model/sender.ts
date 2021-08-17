import { Schema, model } from 'mongoose';

interface ISample {
    [key: string]: string;
}

export interface ISender {
    endPointId: string;
    messages: ISample,
    send: boolean;
}

const schemaEmail = new Schema<ISender>({
    endPointId: {type: String, required :true},
    send: {type: Boolean, required :true},
    messages: {type: Object, required: true},
})

const EmailModel = model<ISender>('Email', schemaEmail);

export default EmailModel;