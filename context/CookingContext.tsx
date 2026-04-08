'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MeasurementUnit } from '@/types/recipe';

interface CookingContextValue {
	servingMultiplier: number;
	setServingMultiplier: (n: number) => void;
	scaleIngredient: (qty: number) => number;

	unitSystem: 'metric' | 'imperial';
	setUnitSystem: (s: 'metric' | 'imperial') => void;
	convertUnit: (qty: number, unit: MeasurementUnit) => string;

	theme: 'light' | 'dark';
	toggleTheme: () => void;
}

const CookingContext = createContext<CookingContextValue | undefined>(undefined);

export function CookingProvider({ children }: { children: React.ReactNode }) {
	const [servingMultiplier, setServingMultiplier] = useState(1);
	const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const savedMultiplier = localStorage.getItem('multiplier');
		const savedUnit = localStorage.getItem('unitSystem');
		const savedTheme = localStorage.getItem('theme');

		if (savedMultiplier) setServingMultiplier(Number(savedMultiplier));
		if (savedUnit === 'imperial' || savedUnit === 'metric') setUnitSystem(savedUnit);
		if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme);
	}, []);

	useEffect(() => {
		localStorage.setItem('multiplier', String(servingMultiplier));
	}, [servingMultiplier]);

	useEffect(() => {
		localStorage.setItem('unitSystem', unitSystem);
	}, [unitSystem]);

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	const scaleIngredient = (qty: number) => {
		return Number((qty * servingMultiplier).toFixed(2));
	};

	const convertUnit = (qty: number, unit: MeasurementUnit) => {
		if (unitSystem === 'metric') {
			return `${qty} ${unit}`;
		}

		const conversions: Record<MeasurementUnit, number> = {
			g: 0.0353,
			kg: 2.2046,
			ml: 0.0338,
			l: 33.814,
			tsp: 1,
			tbsp: 1,
			cup: 1,
			piece: 1,
			pinch: 1,
			'to taste': 1,
		};

		const converted = qty * conversions[unit];

		return `${Number(converted.toFixed(2))} ${unit}`;
	};

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<CookingContext.Provider
			value={{
				servingMultiplier,
				setServingMultiplier,
				scaleIngredient,
				unitSystem,
				setUnitSystem,
				convertUnit,
				theme,
				toggleTheme,
			}}
		>
			{children}
		</CookingContext.Provider>
	);
}

export function useCooking() {
	const context = useContext(CookingContext);

	if (!context) {
		throw new Error('useCooking must be used within CookingProvider');
	}

	return context;
}
