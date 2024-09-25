import dynamic from 'next/dynamic';
import { FC, useMemo } from 'react';
import { Quill } from 'react-quill';
import MagicUrl from 'quill-magic-url';
import QuillCursors from 'quill-cursors';
import 'react-quill/dist/quill.snow.css';
import 'quill-paste-smart';
import 'quill-color-picker-enhance/dist/index.css';
import Loading from '../../shared/Loading';

// Register Quill modules
Quill.register('modules/magicUrl', MagicUrl);
Quill.register('modules/cursors', QuillCursors);

// QuillEditor component
interface QuillEditorProps {
    value: string;
    readOnly: boolean;
    onChange: (content: string) => void;
}

const QuillEditor: FC<QuillEditorProps> = ({ value, readOnly, onChange }) => {
    const ReactQuill = useMemo(
        () =>
            dynamic(() => import('react-quill'), {
                ssr: false, // Disable server-side rendering for Quill
                loading: () => <Loading />,
            }),
        [],
    );

    return (
        <ReactQuill
            theme='snow'
            modules={modules} // Pass modules with syntax enabled
            formats={formats}
            value={value}
            readOnly={readOnly}
            preserveWhitespace={true}
            onChange={onChange}
        />
    );
};

export default QuillEditor;

// quill-config.js or quill-config.ts
export const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video', 'code-block'], // Include 'code-block' in the toolbar
        [{ script: 'sub' }, { script: 'super' }],
        ['clean'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
    ],

    history: {
        delay: 2000,
    },

    magicUrl: {
        urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(tel:[\S]+)/g,
        globalRegularExpression: /(https?:\/\/|www\.|tel:)[\S]+/g,
    },

    clipboard: {
        matchVisual: true,
        allowed: {
            tags: [
                'a',
                'b',
                'strong',
                'u',
                's',
                'i',
                'p',
                'br',
                'ul',
                'ol',
                'li',
                'span',
                'code',
                'pre', // Allow 'code' and 'pre' for code blocks
            ],
            attributes: ['href', 'rel', 'target', 'class'],
        },
        customButtons: [
            {
                module: 'quillEmbeds',
                allowedTags: ['embed'],
                allowedAttr: ['width', 'height'],
            },
        ],
        theme: 'snow-quill-color-picker-enhance',
        keepSelection: true,
        substituteBlockElements: true,
        magicPasteLinks: true,
        removeConsecutiveSubstitutionTags: true,
        cursors: true,
        table: true,
        tableUI: true,
        imageCompress: {
            quality: 0.7,
            maxWidth: 1000,
            maxHeight: 1000,
            imageType: 'image/jpeg',
            debug: true,
            suppressErrorLogging: false,
            handleOnPaste: true,
        },
        form: {
            htmlField: 'html',
            deltaField: 'delta',
            textField: 'text',
            submitKey: {
                key: 'S',
                shortKey: true,
            },
            updateOnBlur: true,
            updateOnChange: false,
        },
    },
};

export const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'video',
    'background',
    'code-block', // Ensure 'code-block' is in the formats array
];
