import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ categories }) {
    
    // Eliminar categoría con confirmación
    const deleteCategory = (categoryId, taskCount) => {
        if (taskCount > 0) {
            if (!confirm(`Esta categoría tiene ${taskCount} tarea(s) asociada(s). Las tareas quedarán sin categoría. ¿Continuar?`)) {
                return;
            }
        } else {
            if (!confirm('¿Estás seguro de eliminar esta categoría?')) {
                return;
            }
        }
        
        router.delete(route('categories.destroy', categoryId));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Categorías
                    </h2>
                    <Link href={route('categories.create')}>
                        <Button variant="primary">
                            + Nueva Categoría
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Categorías" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Estado vacío */}
                    {categories.length === 0 ? (
                        <Card>
                            <div className="text-center py-12">
                                <svg 
                                    className="mx-auto h-12 w-12 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" 
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    No hay categorías
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Comienza creando una nueva categoría para organizar tus tareas
                                </p>
                                <div className="mt-6">
                                    <Link href={route('categories.create')}>
                                        <Button variant="primary">
                                            + Nueva Categoría
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        /* Grid de categorías */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map(category => (
                                <Card key={category.id}>
                                    <div className="flex items-start justify-between">
                                        {/* Información de la categoría */}
                                        <div className="flex items-start space-x-3 flex-1">
                                            {/* Círculo de color */}
                                            <div 
                                                className="w-10 h-10 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: category.color }}
                                            ></div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                    {category.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {category.tasks_count} {category.tasks_count === 1 ? 'tarea' : 'tareas'}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {category.color}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="mt-4 flex gap-2">
                                        <Link href={route('categories.edit', category.id)} className="flex-1">
                                            <Button variant="outline" className="w-full">
                                                Editar
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => deleteCategory(category.id, category.tasks_count)}
                                            className="flex-1"
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
