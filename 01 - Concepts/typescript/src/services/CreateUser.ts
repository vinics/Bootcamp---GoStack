interface Experience {
    company: string;
    duration: number;
}

interface User {
    name?: string;
    email: string;
    password: string;
    techs: Array<string>;
    experience: Array<Experience>;
    diverse: Array<string | object>;
    words: string[];
}

export default function CreateUser({name = '', email, password}: User) {
    const user = {name, email, password};

    return user;
}