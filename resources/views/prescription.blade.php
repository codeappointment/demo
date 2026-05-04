<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prescription</title>
    <link rel="stylesheet" href="views/prescription.css">

    @vite(['resources/css/prescription.css', 'resources/js/app.js', 'resources/css/popup.css', 'resources/js/popup.js'])


</head>

<body>

    @include('popupLayout')
    <div class="page">
        <div class="header">

            <div class="header-left">
                <p class="doctor-name" id="doctorName">অধ্যাপক ডাঃ আসিফ মোহাম্মদ সজীব ভুঁইয়া</p>
                <p class="doctor-qual" , id="qualification">এমবিবিএস (ঢাকা), বিসিএস (স্বাস্থ্য)...</p>
                <p class="doctor-affiliation" , id="affiliation">অধ্যাপক ও দক্ষিণ সিটি কর্পোরেশন মেয়র, ঢাকা দক্ষিণ, বাংলাদেশ</p>
                <div class="bmdc"><strong>BMDC No:</strong> <span id= "BMDC", class ="title" >A-10235</span></div>
            </div>

            <div class="header-center">
                <p class="specialist" id="specialist">Obstetritian & Gynaecologist, Infertility Specialist</p>
            </div>

            <div class="header-right">
                <p class="hospital-name" id="hospitalName">LABAID Specialized Hospital & Diagnostic Center</p>
                <p class="address" , id="address">Dhanmondi, House- -1 and, 6, Road No. 4 </p>
                <p class="schedule" , id="schedule">শনি, সোম, বুধ, বিকাল ৩ টা থেকে রাত ৯টা</p>
                <div class="contact-no"><strong>Contact:</strong> <span id= "contact", class ="contact" > 09666-710606</span></div>
            </div>

        </div>

        <div class="divider"></div>

        <div class="patient-row">
            <div class="field"><strong>Name:</strong> <span id ="patientName", class= "patient-name">Begum Futfute Akhter</span></div>
            <div class="field"><strong>Age:</strong> <span id= "age", class ="age" >67</span></div>
            <div class="field"><strong>Date:</strong> <span id ="date", class = "date">04/10/2025</span></div>
        </div>

        <div class="content">
            <div class="column column-left">
                <div class="sec-heading">C/C</div>
                <ul class="bullet-list">
                    <li>History of Covid-19</li>
                    <li>Dyspepsia</li>
                    <li>Gastric Acidity</li>
                    <li>Insomnia</li>
                    <li>Weakness</li>
                    <li>Malaise</li>
                </ul>

                <div class="obe-section">
                    <div class="label-small">O/E</div>
                    <div class="obe-line">Temp: Normal</div>
                    <div class="obe-line">Tab Maxpro 20mg</div>
                    <div class="obe-line">Pressure: 110/70</div>
                </div>

                <div class="obe-section">
                    <div class="label-small">Investigation advice:</div>
                    <ul class="investigation-list">
                        <li>CBC</li>
                        <li>SGPT</li>
                        <li>SGOT</li>
                        <li>Lipid Profile</li>
                        <li>Serum creatinine</li>
                    </ul>
                </div>
            </div>

            <div class="column">
                <div class="sec-heading">Rx</div>
                <ul class="rx-list">
                    <li>
                        <strong>Tab Bisol 5mg</strong>
                        <div class="note">1 0 1 | Continue</div>
                    </li>
                    <li>
                        <strong>Tab Comet 500mg</strong>
                        <div class="note">1 0 1 | Continue</div>
                    </li>
                    <li>
                        <strong>Tab RTV 5mg</strong>
                        <div class="note">1 0 1 | Continue</div>
                    </li>
                    <li>
                        <strong>Tab Maxpro 20mg</strong>
                        <div class="note">1 0 1 | 1.5 months</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>

</html>