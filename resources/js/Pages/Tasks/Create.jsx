import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';
import Select from '@/Components/Select';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ categories }) {
    // useForm de Inertia maneja el estado y envío del formulario
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        due_date: '',
        status: 'pending',
        category_id: '',
    });

    // Enviar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Nueva Tarea
                </h2>
            }
        >
            <Head title="Nueva Tarea" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Título */}
                            <Input
                                label="Título *"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                error={errors.title}
                                placeholder="Ej: Completar informe mensual"
                                isFocused
                            />

                            {/* Descripción */}
                            <Textarea
                                label="Descripción"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                error={errors.description}
                                placeholder="Detalles adicionales de la tarea..."
                                rows={4}
                            />

                            {/* Fecha límite */}
                            <Input
                                label="Fecha límite"
                                type="date"
                                value={data.due_date}
                                onChange={(e) => setData('due_date', e.target.value)}
                                error={errors.due_date}
                                min={new Date().toISOString().split('T')[0]}
                            />

                            {/* Categoría */}
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

                            {/* Estado */}
                            <Select
                                label="Estado *"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                error={errors.status}
                            >
                                <option value="pending">Pendiente</option>
                                <option value="completed">Completada</option>
                            </Select>

                            {/* Botones */}
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
                                    {processing ? 'Guardando...' : 'Crear Tarea'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
