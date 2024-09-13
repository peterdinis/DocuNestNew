import axios from 'axios';

export type RegisterUser = {
    name: string;
    email: string;
    password: string;
};

export const registerUser = async (data: RegisterUser) => {
    return await axios.post('/api/register', data);
};
