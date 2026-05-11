<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DrugController extends Controller
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


        // return view('welcome2', compact('brands'));
    }
    public function welcome2()
    {
        $brands = $this->dbLoader();

        return view('welcome2', compact('brands'));
    }

    public function prescription()
    {
        $brands = $this->dbLoader();

        return view('prescription', compact('brands'));
    }
}
