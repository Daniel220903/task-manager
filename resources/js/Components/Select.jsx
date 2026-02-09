import { forwardRef } from 'react';

export default forwardRef(function Select(
    { 
        className = '', 
        error = null,
        label = null,
        children,
        ...props 
    }, 
    ref
) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            
            <select
                {...props}
                className={
                    'w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm ' +
                    (error ? 'border-red-500 ' : '') +
                    className
                }
                ref={ref}
            >
                {children}
            </select>
            
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
});
