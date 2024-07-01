"use client";

import Image from 'next/image';

const Header = () => {
	return (
		<header className="flex w-full justify-center border-b border-emerald-950">
			<div className="container p-6 lg:p-0 lg:py-6">
				<Image
					src="/logo.svg"
					alt="Passe Verde Logo"
					width={300}
					height={56}
					className="w-full max-w-[448px] mx-auto"
				/>
			</div>
		</header>
	);
};

export default Header;
