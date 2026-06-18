<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="ওষুধ লিখ | Oshudh Likho">
    <meta property="og:description"
        content="Oshudh Likho is free online prescription app to generate printed prescription">
    <meta property="og:image"
        content="https://firebasestorage.googleapis.com/v0/b/prescription-f0a87.firebasestorage.app/o/preveiw.PNG?alt=media&token=dea62f14-5c7f-43e2-a396-e69e467349d1">
    <meta property="og:url" content="https://oshudhlikho.com/">
    <meta property="og:type" content="website">
    <title>ওষুধ লিখ | Oshudh Likho</title>
    <link rel="stylesheet" href="views/prescription.css">
    <script>
        window.investigations = @json($investigations);
        window.brands = @json($brands);
        window.complaints = @json($complaints);
        window.doses = @json($doses);
        window.advices = @json($advices);
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    @vite(['resources/css/prescription.css', 'resources/css/popup.css'])

    @vite(['resources/js/prescription.js', 'resources/js/app.js', 'resources/js/adviceDatabase.js', 'resources/js/complaints.js', 'resources/js/dosesDatabase.js', 'resources/js/drugDatabase.js', 'resources/js/firebaseAuth.js', 'resources/js/firebaseUsers.js', 'resources/js/investigationDatabase.js', 'resources/js/signin.js'])
</head>

<body>
    <div class="authHolder">
        <button class ="authBbtn", id = "signinBtn">Sign in</button>

    </div>
    <button class ="download", id = "download">
        Download
    </button>


    <div class="headerController", id="headerController">
        <button class ="hideHeader", id = "hideHeader">
            Hide Header
        </button>
        <div class="heihtHolder">
            <strong class ="headerHeight", id = "headerHeight">
                Header height
            </strong>
            <div class="heightController">
                <button id="increase">&#9650;</button>
                <button id="decrease">&#9660;</button>
            </div>
        </div>
        <button class ="saveSetting", id = "saveSetting" style="visibility: hidden">
            Save settings
        </button>
    </div>


    <div class="savedHolder" id="savedHolder" style="visibility: hidden">
        <button class ="saveTemplateBtn", id = "saveTemplateBtn">
            Save Template
        </button>
        <strong class="templateListHeader">My Templates</strong>
        <div class="templateList" id="templateList">
            {{-- 
            <li class="selectable">Fever drugs</li>
            <li class="selectable">Pneumonia drugs</li>
            <li class="selectable">cardiac drugs</li> --}}

        </div>
    </div>
    <div id="toast-container"></div>

    @include('popupLayout')
    @include('signinAlert')
    @include('alertPopup')
    @include('drugEditWindow')
    @include('loadingMessage')
    <div class="page", id = "page">

        <div class="header" id="header">

            <div class="header-left">
                <p class="doctor-name" id="doctorName">loading...</p>
                <p class="doctor-qual" id="qualification"></p>
                <p class="doctor-affiliation" id="affiliation"></p>
                <div class="bmdc"><strong>BMDC No:</strong> <span id="BMDC" class="title"></span></div>
            </div>

            <div class="header-center">
                <p class="specialist" id="specialist"></p>
            </div>

            <div class="header-right">
                <p class="hospital-name" id="hospitalName"></p>
                <p class="address" id="address"></p>
                <p class="schedule" id="schedule"></p>
                <div class="contact-no"><strong>Contact:</strong> <span id="contact" class="contact"></span></div>
            </div>

        </div>

        <div class="divider" id="divider"></div>

        <div class="patient-row">
            <div class="field"><strong>Name:</strong> <span id="patientName" class="patient-name">Click to add patient
                    name</span></div>
            <div class="field"><strong>Age:</strong> <span id="age" class="age">Click to add age</span></div>
            <div class="field"><strong>Gender:</strong> <span id="gender" class="age">Click to add gender</span>
            </div>
            <div class="field"><strong>Date:</strong>
                <div id="date" class="date">04/10/2025</div>
            </div>
        </div>

        <div class="content">
            <div class="column column-left">
                <div class="cc-section">
                    <div class="sec-heading">Chief Complaints</div>
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
                    <div class="label-small">Examination Findings</div>
                    <div class="cc-input"><input id="oeinput" class="oeinput"
                            placeholder="Add new findings"></input><span id="addoe" class="add-cc">+</span>
                    </div>

                    <ul class="bullet-list" id='oeList'>
                        <li>Temp: <input id="temp" class="oeinput" placeholder="℉"></input><span>&#xd7;</span>
                        </li>
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
                <strong class="diagnosis">Diagnosis:</strong>
                <input class="advinput" id="diagnosis" placeholder="Diagnosis or D/D"></input>
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
                            {{-- generative advice suggestion from database --}}
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
