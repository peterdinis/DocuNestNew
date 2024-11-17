"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type FC, useEffect, useState } from "react";

const ThemeButton: FC = () => {
	const [mounted, setMounted] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(resolvedTheme === "light" ? "dark" : "light");
		setIsActive(!isActive);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div
			onClick={toggleTheme}
			className={`relative flex h-8 w-16 cursor-pointer items-center rounded-full bg-teal-500 p-1 dark:bg-gray-700`}
		>
			<Moon className="h-[17px] w-[17px] fill-white"></Moon>
			<div
				className={`shadow-customShadow-md absolute h-6 w-6 rounded-full bg-white ${
					isActive
						? "translate-x-0 transition-transform"
						: "translate-x-8 transition-transform"
				}`}
			></div>
			<Sun className="ml-auto h-[17px] w-[17px] fill-white"></Sun>
		</div>
	);
};

export default ThemeButton;
