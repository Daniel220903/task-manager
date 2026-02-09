import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Input from '@/Components/Input';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        color: '#3B82F6', // Color por defecto (azul)
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    };

    // Colores predefinidos para selección rápida
    const presetColors = [
        { name: 'Azul', value: '#3B82F6' },
        { name: 'Rojo', value: '#EF4444' },
        { name: 'Verde', value: '#10B981' },
        { name: 'Naranja', value: '#F59E0B' },
        { name: 'Púrpura', value: '#8B5CF6' },
        { name: 'Rosa', value: '#EC4899' },
        { name: 'Turquesa', value: '#14B8A6' },
        { name: 'Índigo', value: '#6366F1' },
        { name: 'Amarillo', value: '#EAB308' },
        { name: 'Gris', value: '#6B7280' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Nueva Categoría
                </h2>
            }
        >
            <Head title="Nueva Categoría" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Nombre */}
                            <Input
                                label="Nombre de la categoría *"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                placeholder="Ej: Trabajo, Personal, Estudios"
                                isFocused
                            />

                            {/* Selector de color */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Color *
                                </label>
                                
                                {/* Preview del color seleccionado */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div 
                                        className="w-16 h-16 rounded-lg border-2 border-gray-300"
                                        style={{ backgroundColor: data.color }}
                                    ></div>
                                    <div>
                                        <p className="text-sm text-gray-600">Color seleccionado:</p>
                                        <p className="font-mono text-sm font-semibold">{data.color}</p>
                                    </div>
                                </div>

                                {/* Grid de colores predefinidos */}
                                <div className="grid grid-cols-5 gap-3 mb-4">
                                    {presetColors.map(color => (
                                        <button
                                            key={color.value}
                                            type="button"
                                            onClick={() => setData('color', color.value)}
                                            className={`w-full h-12 rounded-lg transition-all ${
                                                data.color === color.value 
                                                    ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' 
                                                    : 'hover:scale-105'
                                            }`}
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                        ></button>
                                    ))}
                                </div>

                                {/* Input de color manual */}
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">
                                        O elige un color personalizado:
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={data.color}
                                            onChange={(e) => setData('color', e.target.value)}
                                            className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={data.color}
                                            onChange={(e) => setData('color', e.target.value)}
                                            placeholder="#3B82F6"
                                            className="flex-1"
                                        />
                                    </div>
                                </div>

                                {errors.color && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.color}
                                    </p>
                                )}
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end gap-4">
                                <Link href={route('categories.index')}>
                                    <Button variant="outline" type="button">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Guardando...' : 'Crear Categoría'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
