import EndPointModel, { IEndPoint, ISample } from '../model/endPoint';
import Sender, { ISender } from '../model/sender';

interface ISend {
    endPointId: string;
    messages: ISample,
}

export async function createSender(sender: ISend): Promise<ISender> {
    const {endPointId, messages} = sender;
    const s =  new Sender({
        endPointId,
        messages,
        send: false,
    })
    await s.save();
    return JSON.parse(
        JSON.stringify(s),
    )
}