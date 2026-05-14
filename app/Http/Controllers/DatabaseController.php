<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DatabaseController extends Controller
{
    public function dbLoader()
    {
        // $brands = DB::connection('sqlite_drugs')
        //     ->table('drugs')
        //     ->limit(10)
        //     ->pluck('company');

        $brands = DB::connection('sqlite_drugs')
            ->table('drugs')
            ->get()
            ->map(function ($drug) {
                return $drug->drug_form . ' ' .
                    $drug->drug_brand . ' ' .
                    $drug->drug_strength;
            });


        return view('welcome2', compact('brands'));
    }

    public function drugLoader()
    {
        // $brands = DB::connection('sqlite_drugs')
        //     ->table('drugs')
        //     ->limit(10)
        //     ->pluck('company');

        $brands = DB::connection('sqlite_drugs')
            ->table('drugs')
            ->get()
            ->map(function ($drug) {
                return $drug->drug_form . ' ' .
                    $drug->drug_brand . ' ' .
                    $drug->drug_strength;
            });


        return view('prescription', compact('brands'));
    }

    public function investigationLoader()
    {
        $investigations = DB::connection('investigations')
            ->table('test_names')
            ->get()
            ->map(function ($tests) {
                return $tests->tests;
            });


        return view('prescription', compact('investigations'));
    }
}
