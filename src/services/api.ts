import axios from 'axios';
import formidable from 'formidable';

import {
	IUser,
	IUserPostBody,
	IUserPostResponse,
	IUserUpdateBody
} from '@/interfaces';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const createUser = async ({
	body
}: {
	body: IUserPostBody;
}): Promise<IUserPostResponse> => {
	const { data } = await api.post('/api/user', body);

    if (data.status !== 200) {
        throw new Error('Failed to create user');
    }

	return data;
};

export const getUserAll = async (): Promise<IUser[]> => {
	const response = await api.get('/api/user');

	if (response.status !== 200) {
		throw new Error('Failed to get user data');
	}

	return response.data;
};

export const getUser = async (id: string): Promise<IUser> => {
	const response = await api.get(`/api/user/${id}`);

	if (response.status !== 200) {
		throw new Error('Failed to get user data');
	}

	return response.data;
};

export const updateUser = async ({
	body,
	id
}: {
	body: IUserUpdateBody;
	id: string;
}): Promise<IUser> => {
	const response = await api.patch(`/api/user/${id}`, body);

	if (response.status !== 200) {
		throw new Error('Failed to update value');
	}

	return response.data;
};

export const deleteUser = async (id: string): Promise<IUser> => {
    const response = await api.delete(`/api/user/${id}`);

    if (response.status !== 200) {
        throw new Error('Failed to delete value');
    }

    return response.data;
};
