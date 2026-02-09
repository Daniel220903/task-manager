import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Select from '@/Components/Select';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ task, categories }) {
    // Inicializar formulario con datos existentes
    const { data, setData, put, processing, errors } = useForm({
        title: task.title || '',
        description: task.description || '',
        due_date: task.due_date || '',
        status: task.status || 'pending',
        category_id: task.category_id || '',
    });

    // Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('tasks.update', task.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar Tarea
                </h2>
            }
        >
            <Head title="Editar Tarea" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <Input
                                label="Título *"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                error={errors.title}
                                isFocused
                            />

                            <Textarea
                                label="Descripción"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                error={errors.description}
                                rows={4}
                            />

                            <Input
                                label="Fecha límite"
                                type="date"
                                value={data.due_date}
                                onChange={(e) => setData('due_date', e.target.value)}
                                error={errors.due_date}
                            />

                            <Select
                                label="Categoría"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                error={errors.category_id}
                            >
                                <option value="">Sin categoría</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Select>

                            <Select
                                label="Estado *"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                error={errors.status}
                            >
                                <option value="pending">Pendiente</option>
                                <option value="completed">Completada</option>
                            </Select>

                            <div className="flex justify-end gap-4">
                                <Link href={route('tasks.index')}>
                                    <Button variant="outline" type="button">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Actualizando...' : 'Actualizar Tarea'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
