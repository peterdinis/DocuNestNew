'use client';

import { CopiedValue, CopyFn } from '@/app/_types/hookTypes';
import { useToast } from '@/app/_hooks/use-toast';
import { useCallback, useState } from 'react';

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const { toast } = useToast();
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);
    const copy: CopyFn = useCallback(
        async (text) => {
            if (!navigator?.clipboard) {
                console.warn('Clipboard not supported');
                return false;
            }

            try {
                await navigator.clipboard.writeText(text);
                setCopiedText(text);
                toast({
                    title: 'Copied',
                    duration: 2000,
                    className: 'bg-green-800 text-white font-bold',
                });
                return true;
            } catch (error) {
                toast({
                    title: 'Failed to copy value',
                    duration: 2000,
                    className: 'bg-green-800 text-white font-bold',
                });
                setCopiedText(null);
                return false;
            }
        },
        [toast],
    );

    return [copiedText, copy];
}
