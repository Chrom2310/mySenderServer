import UserModel, { IUser } from "../model/user";
import md5 from 'md5';
import jsonwebtoken from 'jsonwebtoken';

interface IReturnUser {
    _id: string,
    login: string,
    lastName: string,
    firstName: string,
}

interface IUserLogin {
    user: IReturnUser,
    token: string,
}

export function createUser(user: IUser, md5Password: boolean): IUser {
    if (md5Password) {
        return {
            _id: user._id,
            login: user.login,
            lastName: user.lastName,
            firstName: user.firstName,
            password: md5(user.password),
        }
    }
    return {
        _id: user._id,
        login: user.login,
        lastName: user.lastName,
        firstName: user.firstName,
        password: user.password,
    }
}

export async function createUserModel(user: IUser) {
    const validUser = await UserModel.find({login: user.login}).exec();
    if (validUser.length === 0) {
        const m = new UserModel(user);
        await m.save();
        return returnUser(m);
    } else {
        throw "недоступный login";
    }
}

export async function userLogin(login: string, password: string): Promise<IUserLogin> {
    const user = await UserModel.findOne({
        login,
        password: md5(password),
    })
    if (user) {
        return {
            user: returnUser(user),
            token: userToken(user._id),
        }
    }else throw "неверный логин или пароль";
}

export function userToken(userId: string): string {
    const uniqueId = jsonwebtoken.sign({id: userId}, 'userId');
    return uniqueId;
}



export function returnUser(user: IUser): IReturnUser {
    return {
      _id: user._id,
      login: user.login,
      lastName: user.lastName,
      firstName: user.firstName,
    }
}

export async function getUser(token: string): Promise<IReturnUser> {
    const uToken = jsonwebtoken.decode(token);
      // @ts-ignore
    if (uToken.id){
          // @ts-ignore
        const user = await UserModel.findById(uToken.id);
          // @ts-ignore
        return returnUser(user);
    }
    throw "неверный token"; 
}