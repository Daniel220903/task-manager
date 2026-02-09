export default function Card({ children, className = '', padding = true }) {
    return (
        <div 
            className={
                'bg-white overflow-hidden shadow-sm rounded-lg ' +
                (padding ? 'p-6 ' : '') +
                className
            }
        >
            {children}
        </div>
    );
}
