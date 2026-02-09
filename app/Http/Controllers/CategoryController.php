<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Constructor: autorizar automáticamente usando CategoryPolicy
     */
    public function __construct()
    {
        $this->authorizeResource(Category::class, 'category');
    }

    public function index()
    {
        $categories = Category::where('user_id', auth()->id())
            ->withCount('tasks')
            ->orderBy('name')
            ->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(StoreCategoryRequest $request)
    {
        Category::create([
            'name' => $request->name,
            'color' => $request->color,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('categories.index')
            ->with('success', 'Categoría creada exitosamente');
    }

    public function edit(Category $category)
    {
        // Autorización automática por Policy
        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        // Autorización automática por Policy
        $category->update([
            'name' => $request->name,
            'color' => $request->color,
        ]);

        return redirect()->route('categories.index')
            ->with('success', 'Categoría actualizada exitosamente');
    }

    public function destroy(Category $category)
    {
        // Autorización automática por Policy
        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Categoría eliminada exitosamente');
    }
}
