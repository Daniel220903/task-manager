<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'color' => ['required', 'string', 'regex:/^#([A-Fa-f0-9]{6})$/'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la categoría es obligatorio',
            'name.max' => 'El nombre no puede tener más de 100 caracteres',
            'color.required' => 'El color es obligatorio',
            'color.regex' => 'El color debe ser un código hexadecimal válido (ej: #3B82F6)',
        ];
    }
}
