<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DrugController extends Controller
{
    public function index1()
    {
        $brands = DB::connection('sqlite_drugs')
            ->table('drugs')
            ->limit(10)
            ->pluck('company');

        return view('welcome2', compact('brands'));
    }

    public function index2()
    {
        $brands = DB::connection('sqlite_drugs')
            ->table('drugs')
            ->limit(10)
            ->pluck('company');

        // Add this temporary line to see if PHP actually found anything
        // dd($brands); 

        return view('welcome2', compact('brands'));
    }

    public function index()
    {
        $brands = DB::connection('sqlite_drugs')
            ->table('drugs')
            ->limit(10)
            ->pluck('company');

        // If the page turns black and shows data here, the query is working.
        // If it shows an error here, the database connection is the problem.
        // dd($brands);

        return view('welcome2', compact('brands'));
    }
}
