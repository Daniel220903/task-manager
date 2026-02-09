export default function Button({ 
    type = 'button', 
    className = '', 
    disabled = false, 
    children, 
    variant = 'primary',
    ...props 
}) {
    // Estilos base para todos los botones
    const baseStyles = 'inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs uppercase tracking-widest transition ease-in-out duration-150 disabled:opacity-50';
    
    // Variantes de color
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 border-transparent focus:bg-blue-700 active:bg-blue-900 focus:ring-2 focus:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 border-transparent focus:bg-gray-700 active:bg-gray-900 focus:ring-2 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent focus:bg-red-700 active:bg-red-900 focus:ring-2 focus:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 border-transparent focus:bg-green-700 active:bg-green-900 focus:ring-2 focus:ring-green-500',
        outline: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500',
    };

    return (
        <button
            {...props}
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
