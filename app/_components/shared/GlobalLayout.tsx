"use client";

import type { FC, ReactNode } from "react";
import Sidebar from "./Sidebar";

interface IGlobalLayoutProps {
	children?: ReactNode;
}

const GlobalLayout: FC<IGlobalLayoutProps> = ({ children }) => {
	return (
		<>
			<div className="dark:bg-dark dark:text-light flex min-h-screen">
				<Sidebar />
				<div className="flex-1 overflow-auto">{children}</div>
			</div>
		</>
	);
};

export default GlobalLayout;
