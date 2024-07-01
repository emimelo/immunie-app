'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUser } from '@/services/api';
import { IUser } from '@/interfaces';
import Header from '@/components/Header';
import Form from '@/components/Form';
import formatDateValid from '@/utils/formatDateValid';

export default function Home() {
	const [user, setUser] = useState<IUser>({} as IUser);

	useEffect(() => {
		getUser('6682a72f3a4657fc92726953').then((user) => {
			setUser(user);
		});
	}, []);

	return (
		<>
			<Header />
			<main className="my-[40px] lg:my-[60px]">
				<div className="container p-6 mx-auto">
					<div className="flex flex-col items-center w-full text-center gap-8">
						<div className="border-4 border-green-600 rounded flex justify-center w-[200px] h-[200px]">
							<Image
								src={user.image_url? user.image_url : '/user.jpg'}
								alt="user image"
								width={200}
								height={200}
								className="object-cover object-top"
							/>
						</div>
						<div>
							<span className="font-semibold text-neutral-700">
								Nome
							</span>
							<h3 className="text-3xl">
								{user.name? user.name : 'Seu Nome'} {user.last_name? user.last_name : ''}
							</h3>
						</div>
						<div>
							<span className="font-semibold text-neutral-700">
								Acesso Válido até
							</span>
							<h3 className="text-2xl text-green-600">
								{formatDateValid(user.updatedAt)}
							</h3>
						</div>
					</div>
				</div>
				<Form user={user} setUser={setUser} />
			</main>
		</>
	);
}
