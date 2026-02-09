import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Badge from '@/Components/Badge';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ tasks, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

    // Función para aplicar filtros
    const handleFilter = () => {
        router.get(route('tasks.index'), {
            search: search,
            category: selectedCategory,
            status: selectedStatus,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Limpiar filtros
    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('');
        setSelectedStatus('');
        router.get(route('tasks.index'));
    };

    // Alternar estado de tarea (pendiente/completada)
    const toggleStatus = (taskId) => {
        router.patch(route('tasks.toggle-status', taskId), {}, {
            preserveScroll: true,
        });
    };

    // Eliminar tarea con confirmación
    const deleteTask = (taskId) => {
        if (confirm('¿Estás seguro de eliminar esta tarea?')) {
            router.delete(route('tasks.destroy', taskId));
        }
    };

    // Formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return 'Sin fecha';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    // Verificar si la tarea está vencida
    const isOverdue = (task) => {
        if (!task.due_date || task.status === 'completed') return false;
        return new Date(task.due_date) < new Date();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Mis Tareas
                    </h2>
                    <Link href={route('tasks.create')}>
                        <Button variant="primary">
                            + Nueva Tarea
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Tareas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Filtros */}
                    <Card className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Búsqueda */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Buscar tareas..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                />
                            </div>

                            {/* Filtro por categoría */}
                            <div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtro por estado */}
                            <div>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                                >
                                    <option value="">Todos los estados</option>
                                    <option value="pending">Pendientes</option>
                                    <option value="completed">Completadas</option>
                                </select>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex gap-2">
                                <Button 
                                    variant="primary" 
                                    onClick={handleFilter}
                                    className="flex-1"
                                >
                                    Filtrar
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={clearFilters}
                                >
                                    Limpiar
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Lista de tareas */}
                    {tasks.length === 0 ? (
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
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    No hay tareas
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Comienza creando una nueva tarea
                                </p>
                                <div className="mt-6">
                                    <Link href={route('tasks.create')}>
                                        <Button variant="primary">
                                            + Nueva Tarea
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {tasks.map(task => (
                                <Card key={task.id}>
                                    <div className="flex items-start justify-between">
                                        {/* Checkbox y contenido */}
                                        <div className="flex items-start space-x-4 flex-1">
                                            {/* Checkbox para marcar completada */}
                                            <input
                                                type="checkbox"
                                                checked={task.status === 'completed'}
                                                onChange={() => toggleStatus(task.id)}
                                                className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                            />

                                            {/* Información de la tarea */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                                        {task.title}
                                                    </h3>
                                                    
                                                    {/* Badge de estado */}
                                                    <Badge variant={task.status === 'completed' ? 'success' : 'warning'}>
                                                        {task.status === 'completed' ? 'Completada' : 'Pendiente'}
                                                    </Badge>

                                                    {/* Indicador de vencida */}
                                                    {isOverdue(task) && (
                                                        <Badge variant="danger">
                                                            Vencida
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Descripción */}
                                                {task.description && (
                                                    <p className="text-gray-600 text-sm mb-2">
                                                        {task.description}
                                                    </p>
                                                )}

                                                {/* Información adicional */}
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                    {/* Categoría */}
                                                    {task.category && (
                                                        <div className="flex items-center">
                                                            <span 
                                                                className="inline-block w-3 h-3 rounded-full mr-2"
                                                                style={{ backgroundColor: task.category.color }}
                                                            ></span>
                                                            <span>{task.category.name}</span>
                                                        </div>
                                                    )}

                                                    {/* Fecha límite */}
                                                    {task.due_date && (
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <span className={isOverdue(task) ? 'text-red-600 font-semibold' : ''}>
                                                                {formatDate(task.due_date)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Botones de acción */}
                                        <div className="flex gap-2 ml-4">
                                            <Link href={route('tasks.edit', task.id)}>
                                                <Button variant="outline" className="text-sm">
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="danger" 
                                                className="text-sm"
                                                onClick={() => deleteTask(task.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
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
