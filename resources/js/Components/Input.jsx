import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Input(
    { 
        type = 'text', 
        className = '', 
        isFocused = false, 
        error = null,
        label = null,
        ...props 
    }, 
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <div className="w-full">
            {/* Label opcional */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            
            {/* Input */}
            <input
                {...props}
                type={type}
                className={
                    'w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm ' +
                    (error ? 'border-red-500 ' : '') +
                    className
                }
                ref={input}
            />
            
            {/* Mensaje de error */}
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
});
