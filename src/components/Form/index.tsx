import { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';
import Image from 'next/image';
import { IUser } from '@/interfaces';
import { updateUser } from '@/services/api';

interface FormComponentProps {
	user: IUser;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const Form = ({ user, setUser }: FormComponentProps) => {
	const [uploading, setUploading] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [selectedImage, setSelectedImage] = useState<string>('');
	const [formData, setFormData] = useState<{ [key: string]: string }>({
		name: user.name,
		last_name: user.last_name
	});

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setSelectedImage(URL.createObjectURL(file));
		}
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value
		}));
	};

	const clearForm = () => {
		setSelectedImage('');
		setFormData({
			name: '',
			last_name: ''
		});
	};

	const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setUploading(true);
		try {
			let imageUrl = user.image_url;
			if (selectedFile) {
				const storageRef = ref(
					storage,
					`images/${Date.now()}_${selectedFile.name}`
				);
				const snapshot = await uploadBytes(storageRef, selectedFile);
				imageUrl = await getDownloadURL(snapshot.ref);
			}

			const updatedUser = {
				name: formData.name !== '' ? formData.name : user.name,
				last_name:
					formData.last_name !== ''
						? formData.last_name
						: user.last_name,
				image_url: imageUrl
			};

			updateUser({
				body: {
					...updatedUser
				},
				id: '6682a72f3a4657fc92726953'
			}).then((res) => {
				setUser(res);
			});
		} catch (error) {
			console.error('Error updating user:', error);
		}
		setUploading(false);
		clearForm();
	};

	return (
		<form onSubmit={handleUpload}>
			<div className="container p-6 mx-auto max-w-[448px]">
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-3xl text-center font-semibold leading-7 text-gray-900">
							Editar Perfil
						</h2>
						<div className="mt-10 gap-x-6 gap-y-8 flex flex-col">
							<div className="sm:col-span-4">
								<label
									htmlFor="name"
									className="block font-medium"
								>
									Nome
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
										<input
											type="text"
											name="name"
											id="name"
											value={formData.name}
											className="block flex-1 border-0 bg-transparent px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
											placeholder="Seu Nome"
											onChange={handleInputChange}
										/>
									</div>
								</div>
							</div>
							<div className="sm:col-span-4">
								<label
									htmlFor="last_name"
									className="block font-medium"
								>
									Sobrenome
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
										<input
											type="text"
											name="last_name"
											id="last_name"
											value={formData.last_name}
											className="block flex-1 border-0 bg-transparent px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
											placeholder="Seu Sobrenome"
											onChange={handleInputChange}
										/>
									</div>
								</div>
							</div>
							<div className="col-span-full">
								<label
									htmlFor="cover-photo"
									className="block font-medium"
								>
									Imagem de perfil
								</label>
								<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
									{selectedImage ? (
										<Image
											src={selectedImage}
											alt="user image"
											className="object-cover"
											width={200}
											height={200}
										/>
									) : (
										<div className="text-center">
											<div className="mt-4 flex leading-6 text-gray-600">
												<label
													htmlFor="image_url"
													className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 hover:text-green-500"
												>
													<span>Upload a file</span>
													<input
														id="image_url"
														name="image_url"
														type="file"
														className="sr-only"
														hidden
														onChange={
															handleFileChange
														}
													/>
												</label>
												<p className="pl-1">
													or drag and drop
												</p>
											</div>
											<p className="text-xs leading-5 text-gray-600">
												PNG, JPG, GIF up to 10MB
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						onClick={clearForm}
						type="button"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Cancelar
					</button>
					<button
						type="submit"
						className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						disabled={uploading}
					>
						{uploading ? 'Carregando...' : 'Salvar'}
					</button>
				</div>
			</div>
		</form>
	);
};

export default Form;
