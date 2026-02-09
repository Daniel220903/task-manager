<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    /**
     * Determinar si el usuario puede ver la lista de tareas
     */
    public function viewAny(User $user): bool
    {
        // Cualquier usuario autenticado puede ver sus tareas
        return true;
    }

    /**
     * Determinar si el usuario puede ver esta tarea específica
     */
    public function view(User $user, Task $task): bool
    {
        // Solo si la tarea le pertenece
        return $task->user_id === $user->id;
    }

    /**
     * Determinar si el usuario puede crear tareas
     */
    public function create(User $user): bool
    {
        // Cualquier usuario autenticado puede crear
        return true;
    }

    /**
     * Determinar si el usuario puede actualizar esta tarea
     */
    public function update(User $user, Task $task): bool
    {
        // Solo si la tarea le pertenece
        return $task->user_id === $user->id;
    }

    /**
     * Determinar si el usuario puede eliminar esta tarea
     */
    public function delete(User $user, Task $task): bool
    {
        // Solo si la tarea le pertenece
        return $task->user_id === $user->id;
    }
}
