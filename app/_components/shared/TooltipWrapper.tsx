"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { type FC, type ReactNode } from "react";

interface ITooltipWrapperProps {
	triggerChildren?: ReactNode;
	contentText: string;
}

const TooltipWrapper: FC<ITooltipWrapperProps> = ({
	triggerChildren,
	contentText,
}: ITooltipWrapperProps) => {
	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>{triggerChildren}</TooltipTrigger>
					<TooltipContent>{contentText}</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
};

export default TooltipWrapper;
