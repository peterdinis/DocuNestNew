import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

        const handleInput = () => {
            if (textareaRef.current) {
                // Reset height to auto to calculate the correct scrollHeight
                textareaRef.current.style.height = 'auto';
                // Set the height to match the scroll height
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        };

        React.useEffect(() => {
            if (textareaRef.current) {
                handleInput(); // Adjust height on mount in case there's pre-filled content
            }
        }, []);

        return (
            <textarea
                className={cn(
                    'flex min-h-[60px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={(el) => {
                    textareaRef.current = el;
                    if (typeof ref === 'function') {
                        ref(el);
                    } else if (ref) {
                        ref.current = el;
                    }
                }}
                onInput={handleInput}
                {...props}
            />
        );
    },
);
Textarea.displayName = 'Textarea';

export { Textarea };