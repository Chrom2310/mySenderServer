import EndPointModel, { IEndPoint, ISample } from '../model/endPoint';
import jsonwebtoken from 'jsonwebtoken';

interface IEP {
    userId: string;
    name: string;
    typeSend: 'email' | 'telegram';
    sample: ISample;
}

export async function createEndPoint(endPoint: IEP) : Promise<IEndPoint> {
    const token = jsonwebtoken.sign({name: endPoint.name, userId: endPoint.userId}, 'endpoint');
    const ep =  new EndPointModel({...endPoint, token});
    await ep.save();
    console.log(ep);
    return JSON.parse(JSON.stringify(ep));
}

export async function searchEndPoint(token: string, nameEndPoint: string) {
    console.log('token', token);
    console.log('nameEndPoint', nameEndPoint);
    const endPoint = await EndPointModel.findOne({
        token,
        name: nameEndPoint,
    }).exec();
    console.log('endPoint', endPoint);
    if (endPoint){
        return endPoint;
    } else throw 'endPoint не существует';
}