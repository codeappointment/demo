<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prescription</title>
    <link rel="stylesheet" href="views/prescription.css">
    <script>
        window.investigations = @json($investigations);
        window.brands = @json($brands);
        window.complaints = @json($complaints);
        window.doses = @json($doses);
        window.advices = @json($advices);
    </script>
    @vite(['resources/css/prescription.css', 'resources/js/app.js', 'resources/css/popup.css', 'resources/js/popup.js'])
    @vite(['resources/js/drugDatabase.js'])
    @vite(['resources/js/investigationDatabase.js'])
    @vite(['resources/js/complaints.js'])
    @vite(['resources/js/dosesDatabase.js'])
    @vite(['resources/js/adviceDatabase.js'])
</head>

<body>

    @include('popupLayout')
    <div class="page">
        <div class="header">

            <div class="header-left">
                <p class="doctor-name" id="doctorName">অধ্যাপক ডাঃ আসিফ মোহাম্মদ সজীব ভুঁইয়া</p>
                <p class="doctor-qual" id="qualification">এমবিবিএস (ঢাকা), বিসিএস (স্বাস্থ্য)...</p>
                <p class="doctor-affiliation" id="affiliation">অধ্যাপক ও দক্ষিণ সিটি কর্পোরেশন মেয়র, ঢাকা দক্ষিণ,
                    বাংলাদেশ</p>
                <div class="bmdc"><strong>BMDC No:</strong> <span id="BMDC" class="title">A-10235</span></div>
            </div>

            <div class="header-center">
                <p class="specialist" id="specialist">Obstetritian & Gynaecologist, Infertility Specialist</p>
            </div>

            <div class="header-right">
                <p class="hospital-name" id="hospitalName">LABAID Specialized Hospital & Diagnostic Center</p>
                <p class="address" id="address">Dhanmondi, House- -1 and, 6, Road No. 4 </p>
                <p class="schedule" id="schedule">শনি, সোম, বুধ, বিকাল ৩ টা থেকে রাত ৯টা</p>
                <div class="contact-no"><strong>Contact:</strong> <span id="contact" class="contact">
                        09666-710606</span></div>
            </div>

        </div>

        <div class="divider"></div>

        <div class="patient-row">
            <div class="field"><strong>Name:</strong> <span id="patientName" class="patient-name">Begum Futfute
                    Akhter</span></div>
            <div class="field"><strong>Age:</strong> <span id="age" class="age">67</span></div>
            <div class="field"><strong>Date:</strong> <span id="date" class="date">04/10/2025</span></div>
        </div>

        <div class="content">
            <div class="column column-left">
                <div class="cc-section">
                    <div class="sec-heading">C/C</div>
                    <div class="cc-input"><input id="ccinput" class="ccinput"
                            placeholder="Add complaints"></input><span id="addcc" , class="add-cc">+</span></div>
                    <div class="ccsuggestionList" id="ccsuggestionList">
                        {{-- generative suggestion-list --}}
                    </div>
                    <ul class="bullet-list" , id='ccList'>
                        <li>Fever for three days<span>&#xd7;</span></li>
                        <li>Caugh<span>&#xd7;</span></li>
                        <li>Nausea<span>&#xd7;</span></li>
                    </ul>
                </div>
                <div class="obe-section">
                    <div class="label-small">O/E</div>
                    <div class="cc-input"><input id="oeinput" class="oeinput"
                            placeholder="Add new findings"></input><span id="addoe" class="add-cc">+</span>
                    </div>

                    <ul class="bullet-list" id='oeList'>
                        <li>Temp: <input id="temp" class="oeinput" placeholder="℉"></input><span>&#xd7;</span></li>
                        <li>BP: <input id="bp" class="oeinput" placeholder="mmHg"></input><span>&#xd7;</span>
                        </li>
                        <li>Pulse: <input id="pulse" class="oeinput"></input><span>&#xd7;</span></li>
                        <li>Resp: <input id="resp" class="oeinput"></input><span>&#xd7;</span></li>
                        <li>Anaemia: <input id="anaemia" class="oeinput"></input><span>&#xd7;</span></li>
                        <li>Cyanosis: <input id="cyanosis" class="oeinput"></input><span>&#xd7;</span></li>
                        <li>Heart: <input id="heart" class="oeinput"></input><span>&#xd7;</span></li>
                        <li>Lung: <input id="lung" class="oeinput"></input><span>&#xd7;</span></li>

                    </ul>
                </div>

                <div class="obe-section">
                    <div class="label-small">Investigation advice:</div>
                    <div class="cc-input"><input id="advinput" class="advinput" ,
                            placeholder="Add new investigations"></input><span id="addadv" class="add-cc">+</span>
                    </div>
                    <div class="invsuggestionList" id="invsuggestionList">
                        {{-- generative suggestion-list --}}
                    </div>
                    <ul class="bullet-list" id="advList">

                        <li><input type="checkbox" id="checkbox" name="checkbox">CBC</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">Serum Creatinine</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">Serum Electrolyte</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">Fasting Blood Sugar</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">2HABF</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">Lipit Profile</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">SGPT</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">SGOT</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">Urine R/E</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">Lipid Profile</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">Chest X-ray P/A view</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">USG whole abdomen</input></li>
                        <li><input type="checkbox" id="checkbox" name="checkbox">USG Pregnancy Profile</input></li>

                    </ul>
                </div>
            </div>

            <div class="column">
                <div class="sec-heading">Rx</div>
                <ul class="rx-list" id="rxList">
                    {{-- generative treatment list --}}
                </ul>

                {{-- drug input layout --}}
                <div class="durgInputLayout" , id="durgInputLayout">
                    <div>
                        <div class = "nameSection", style="display: block, width: 100%">
                            <input class="drugName" , id="drugName" required type="text" style="width: auto"
                                placeholder="Tab Napa 500mg"></input>
                            <div class="suggestion-list" id="suggestionList">
                                {{-- generative drug suggestion-list --}}
                            </div>
                        </div>
                    </div>
                    <div>
                        {{-- dose --}}
                        <input type="text" center placeholder="1+0+1" class="dose" , id="dose"
                            required></input>

                        <div class="doses-list" id="dosesList">
                            {{-- generative dose suggestion-list --}}
                        </div>
                        {{-- duration generative list 1-30 --}}
                        <select class="duration" , id="duration" type="text" style="width: 30px"
                            placeholder="5"></select>

                        <select id="dayWeekMonth" class="dayWeekMonth kalpurush" name="days">
                            <option value="select">দিন/মাস</option>
                            <option value="দিন">দিন</option>
                            <option value="সপ্তাহ">সপ্তাহ</option>
                            <option value="মাস">মাস</option>
                            <option value="বছর">বছর</option>
                            <option value="চলবে">চলবে</option>
                        </select>
                        <form style="display: flex" id="mealRelation" , class="mealRelation">
                            <input type="radio" id="bm" class="bm" name="mealTime" value="খাবার আগে">
                            <label for="basic">খাবার আগে</label><br>

                            <input type="radio" id="am" class="am" name="mealTime" value="খাবার পরে">
                            <label for="pro">খাবার পরে</label><br>
                        </form>
                        <input type="text" center placeholder="Additional suggestion" class="suggestion" ,
                            id="suggestion"></input>
                        <button class="addDrug" id="addDrug">Add Drug</button>

                    </div>
                    <p class ="alert" id = "alert">*Missing filed*</p>
                </div>

                <div class = "additionalHeader" id = "additionalHeader">
                    <span>উপদেশঃ</span>

                    <div class="underline">

                    </div>
                    <ul class="bullet-list kalpurush" id="adviceList" style="display: none">
                        {{-- generative advice list --}}
                    </ul>
                    <div class="adviceHolder">
                        <input class = "adviceInput" id = "adviceInput" placeholder="নিয়মিত ওষুধ খাবেন..."></input>

                        <div class="adviceSiggestionList" id="adviceSiggestionList">
                            {{-- generative advice suggestion --}}
                        </div>
                        <button class="addDrug" id="addAdvice">Add</button>
                    </div>
                </div>
                {{-- end of drug input layout --}}
            </div>
        </div>
    </div>
</body>

</html>
