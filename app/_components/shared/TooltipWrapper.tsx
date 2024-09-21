'use client';

import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from '@/components/ui/tooltip';
import { FC, ReactNode } from 'react';

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
                    <TooltipTrigger>
                        {triggerChildren}
                    </TooltipTrigger>
                    <TooltipContent>{contentText}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
};

export default TooltipWrapper;
