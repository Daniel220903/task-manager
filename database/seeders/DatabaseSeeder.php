<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Poblar la base de datos con datos de prueba
     */
    public function run(): void
    {
        // USUARIO DE PRUEBA (con datos fijos para poder hacer login)
        $user = User::factory()->create([
            'name' => 'Usuario Demo',
            'email' => 'demo@taskmanager.com',
            'password' => bcrypt('password'), // Contraseña: password
        ]);

        // CATEGORÍAS para el usuario demo
        $categorias = [
            ['name' => 'Trabajo', 'color' => '#3B82F6'],
            ['name' => 'Personal', 'color' => '#10B981'],
            ['name' => 'Estudios', 'color' => '#F59E0B'],
            ['name' => 'Urgente', 'color' => '#EF4444'],
        ];

        foreach ($categorias as $categoria) {
            Category::factory()->create([
                'name' => $categoria['name'],
                'color' => $categoria['color'],
                'user_id' => $user->id,
            ]);
        }

        // Obtener las categorías creadas
        $categoriasCreadas = Category::where('user_id', $user->id)->get();

        // TAREAS para el usuario demo
        // 5 tareas pendientes
        Task::factory(5)->create([
            'user_id' => $user->id,
            'category_id' => $categoriasCreadas->random()->id,
            'status' => 'pending',
        ]);

        // 3 tareas completadas
        Task::factory(3)->create([
            'user_id' => $user->id,
            'category_id' => $categoriasCreadas->random()->id,
            'status' => 'completed',
        ]);

        // 2 tareas vencidas
        Task::factory(2)->overdue()->create([
            'user_id' => $user->id,
            'category_id' => $categoriasCreadas->random()->id,
        ]);

        // USUARIOS ADICIONALES (opcional, para probar que cada usuario solo ve sus datos)
        User::factory(2)
            ->has(Category::factory(3)) // Cada usuario tiene 3 categorías
            ->has(Task::factory(5)) // Cada usuario tiene 5 tareas
            ->create();
    }
}
