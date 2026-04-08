'use client';

import './globals.css';
import Link from 'next/link';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { CookingProvider, useCooking } from '@/context/CookingContext';
import { useAppSelector } from '@/hooks/useRedux';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { setSavedIds } from '@/store/cookbookSlice';

function NavBar() {
	const { theme, toggleTheme } = useCooking();
	const saved = useAppSelector((s) => s.cookbook.savedIds.length);

	return (
		<nav className="flex justify-between p-4 border">
			<div className="flex gap-4">
				<Link href="/">Home</Link>
				<Link href="/recipes">Browse</Link>
				<Link href="/cookbook">Cookbook ({saved})</Link>
				<Link href="/manage">Manage</Link>
			</div>

			<button onClick={toggleTheme} className="border px-2">
				Theme: {theme}
			</button>
		</nav>
	);
}

function InitCookbook() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const saved = localStorage.getItem('cookbook');
		if (saved) {
			dispatch(setSavedIds(JSON.parse(saved)));
		}
	}, [dispatch]);

	return null;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Provider store={store}>
					<CookingProvider>
						<InitCookbook />
						<NavBar />
						<div className="p-4">{children}</div>
					</CookingProvider>
				</Provider>
			</body>
		</html>
	);
}
