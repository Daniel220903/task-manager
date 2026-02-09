<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory para generar categorías de prueba
 */
class CategoryFactory extends Factory
{
    /**
     * Define los valores por defecto del modelo
     */
    public function definition(): array
    {
        $categoryNames = [
            'Trabajo',
            'Personal',
            'Estudios',
            'Hogar',
            'Salud',
            'Finanzas',
            'Proyectos',
            'Urgente',
        ];

        $colors = [
            '#3B82F6', // Azul
            '#EF4444', // Rojo
            '#10B981', // Verde
            '#F59E0B', // Naranja
            '#8B5CF6', // Púrpura
            '#EC4899', // Rosa
            '#14B8A6', // Turquesa
            '#6366F1', // Índigo
        ];

        return [
            'name' => fake()->randomElement($categoryNames),
            'color' => fake()->randomElement($colors),
            'user_id' => User::factory(), // Crea un usuario automáticamente
        ];
    }
}
