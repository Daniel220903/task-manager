<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory para generar tareas de prueba
 */
class TaskFactory extends Factory
{
    /**
     * Define los valores por defecto del modelo
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4), // Genera título de 4 palabras
            'description' => fake()->paragraph(3), // Genera 3 párrafos
            'due_date' => fake()->dateTimeBetween('now', '+30 days'), // Fecha entre hoy y 30 días
            'status' => fake()->randomElement(['pending', 'completed']),
            'category_id' => Category::factory(), // Crea una categoría automáticamente
            'user_id' => User::factory(), // Crea un usuario automáticamente
        ];
    }

    /**
     * Estado: tarea pendiente
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Estado: tarea completada
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }

    /**
     * Estado: tarea vencida (fecha en el pasado)
     */
    public function overdue(): static
    {
        return $this->state(fn (array $attributes) => [
            'due_date' => fake()->dateTimeBetween('-30 days', '-1 day'),
            'status' => 'pending',
        ]);
    }
}
