<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    @vite(['resources/css/welcome2.css', 'resources/js/welcome2.js'])
</head>

<body>

    <div class="container">
        <button class="button", id = "button">Click Me</button>
        <span>
            <?php
            echo date('l');

            use Illuminate\Support\Facades\DB;

            // for ($i = 0; $i < 10; $i++) { { {
            //            $brand= (DB::connection('sqlite_drugs')->table('drugs')->get('company')[$i]);
            //             echo "<br>";
            //             {{ print_r($brand); }}

            //         }
            //     }
            // }


            // $brands = DB::connection('sqlite_drugs')
            //     ->table('drugs')
            //     ->limit(10)
            //     ->pluck('company');

            // echo "<pre>";
            // echo json_encode($brands, JSON_PRETTY_PRINT);
            // echo "</pre>";

            
            // {{ print_r(DB::connection('sqlite_drugs')->table('drugs')->get('company')->first()); }}



            $brands = DB::connection('sqlite_drugs')
                ->table('drugs')
                ->limit(10)
                ->pluck('company');


            ?>
            <script>
                let brands = JSON.parse('@json($brands)');
                console.log(brands);
                document.getElementById('button').innerText = brands;
            </script>
            

        </span>
    </div>

</body>

</html>