<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DatabaseController extends Controller
{

    public function drugLoader()
    {
        // drug database loader
        $brands = DB::connection('sqlite_drugs')
            ->table('drugs')
            ->get()
            ->map(function ($drug) {
                return $drug->drug_form . ' ' .
                    $drug->drug_brand . ' ' .
                    $drug->drug_strength;
            });

        // investigation database loader
        $investigations = DB::connection('investigations')
            ->table('test_names')
            ->pluck('tests');

        $complaints = DB::connection('investigations')
            ->table('complaints')
            ->pluck('complaints');

        $doses = DB::connection('investigations')
            ->table('doses')
            ->pluck('doses');
        $advices = DB::connection('investigations')
            ->table('advices')
            ->pluck('advices');

        // 3. Pass both to the view
        return view('prescription', compact('brands', 'investigations', 'complaints', 'doses', 'advices'));
    }
}
