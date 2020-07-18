import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(req: Request, res: Response) {
    const user = createUser({
        email: 'diego@rocketseat.com', 
        password: '123456',
        techs: ["node", "react"],
        experience: [{company: 'Voith', duration: 10}, {company: 'Andritz', duration: 3}],
        diverse: ['teste', {title: 'Harvard', fusion: false}],
        words: ['sun', 'moon'],
    });

    return res.json({message: 'Hello World!'});
}