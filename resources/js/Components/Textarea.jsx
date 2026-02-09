import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Textarea(
    { 
        className = '', 
        isFocused = false,
        error = null,
        label = null,
        rows = 4,
        ...props 
    }, 
    ref
) {
    const textarea = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            textarea.current.focus();
        }
    }, [isFocused]);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            
            <textarea
                {...props}
                rows={rows}
                className={
                    'w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm ' +
                    (error ? 'border-red-500 ' : '') +
                    className
                }
                ref={textarea}
            />
            
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
});
