"use client";

import { SessionProvider } from "next-auth/react";
import type { FC, ReactNode } from "react";

type ISessionProviderProps = {
	children?: ReactNode;
};

const SessionAppProvider: FC<ISessionProviderProps> = ({
	children,
}: ISessionProviderProps) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default SessionAppProvider;
