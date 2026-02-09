<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Constructor: autorizar automáticamente usando TaskPolicy
     */
    public function __construct()
    {
        $this->authorizeResource(Task::class, 'task');
    }

    /**
     * Mostrar lista de tareas del usuario autenticado
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $categoryId = $request->input('category');
        $status = $request->input('status');

        $query = Task::where('user_id', auth()->id())
            ->with('category');

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        if ($status) {
            $query->where('status', $status);
        }

        $tasks = $query->orderBy('created_at', 'desc')->get();
        $categories = Category::where('user_id', auth()->id())->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $categoryId,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        $categories = Category::where('user_id', auth()->id())->get();

        return Inertia::render('Tasks/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreTaskRequest $request)
    {
        Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => $request->status ?? 'pending',
            'category_id' => $request->category_id,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('tasks.index')
            ->with('success', 'Tarea creada exitosamente');
    }

    public function show(Task $task)
    {
        // Autorización automática por Policy
        $task->load('category');

        return Inertia::render('Tasks/Show', [
            'task' => $task,
        ]);
    }

    public function edit(Task $task)
    {
        // Autorización automática por Policy
        $categories = Category::where('user_id', auth()->id())->get();

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'categories' => $categories,
        ]);
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        // Autorización automática por Policy
        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'status' => $request->status,
            'category_id' => $request->category_id,
        ]);

        return redirect()->route('tasks.index')
            ->with('success', 'Tarea actualizada exitosamente');
    }

    public function destroy(Task $task)
    {
        // Autorización automática por Policy
        $task->delete();

        return redirect()->route('tasks.index')
            ->with('success', 'Tarea eliminada exitosamente');
    }

    public function toggleStatus(Task $task)
    {
        // Autorización automática por Policy
        $task->update([
            'status' => $task->status === 'pending' ? 'completed' : 'pending',
        ]);

        return back()->with('success', 'Estado actualizado');
    }
}
