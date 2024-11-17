"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { type FC, type ReactNode, useEffect } from "react";
import Loading from "../shared/Loading";

interface ISessionCheckHelperProps {
	children?: ReactNode;
}

const SessionCheckHelper: FC<ISessionCheckHelperProps> = ({
	children,
}: ISessionCheckHelperProps) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (status === "loading") return;

		if (!session && pathname !== "/" && pathname !== "/register") {
			router.push("/login");
		}
	}, [session, status, router, pathname]);

	if (status === "loading") {
		return <Loading />;
	}

	if (session || pathname === "/" || pathname === "/register") {
		return <>{children}</>;
	}

	return children;
};

export default SessionCheckHelper;
