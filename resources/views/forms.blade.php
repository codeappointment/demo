<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>

    @vite (['resources/css/forms.css', 'resources/css/popup.css', 'resources/js/welcome2.js'])
</head>

<body class="container">


    <button id="openPopupBtn">Open Input Popup</button>

    <p>Result: <span id="displayText"></span></p>

    @include('popupLayout')



    <div class="header">
        <div class="header-left">
            <p type="text" id = "input-name" class="doctor-name" placeholder="ডাঃ Add your name"> Doctor name</p>
            <p type="text" id = "input-address" class="doctor-address" placeholder="ডাঃ Add your address">
            <input type="text" class="doctor-age" placeholder="ডাঃ Add your age">
            <input type="text" class="doctor-sex" placeholder="ডাঃ Add your sex">
        </div>
        <div class="header-right">
            <div class="name">Dr. Zubayer Ahmed</div>
            <div class="reg">BMDC Reg No. A-58221</div>
            <div class="designation">Assistant Professor</div>
        </div>
    </div>

    <h1 class="label">Simple Calculator</h1>
    <div class="page">

        <hr class="top-bar">
        <div class="form-container" style="display: flex; gap: 20px;">
            <div id="sidebar" style="border-left: 2px solid black; height: 2400px;"></div>


            <form id="calculator-form" action="{{ route('forms') }}" method="POST">
                @csrf

                <input type="number" id="id_num1" name="post_num1" required placeholder="Enter first number"
                    value="{{ old('id_num1', $id_num1 ?? '') }}" class="input">

                <button class="button" type="submit">Calculate</button>
                <div class="result"> <br>
                    {{$result}}
                </div>
            </form>


        </div>

    </div>
</body>

</html>