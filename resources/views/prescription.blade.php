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
                <p class="doctor-name" id="doctorName">ডাঃ যুবায়ের আহমেদ রুমি কামাল</p>
                <p class="specialist" id="specialist">মেডিসিন ও হৃদরোগ বিশেষজ্ঞ</p>
                <p class="doctor-qual">এমবিবিএস (ঢাকা), বিসিএস (স্বাস্থ্য)...</p>
                <p class="doctor-affiliation">সহকারী অধ্যাপক,.... মেডিকেল কলেজ</p>
                <p class="title">BMDC no: A-58221</p>


                <!--
                // Auto-resize the doctor-qual textarea
                const doctorQual = document.querySelector('.doctor-qual');
                const doctorAffiliation = document.querySelector('.doctor-affiliation');

                doctorQual.onclick = () => {
                    
                };

                // #dynamically set height based on content in textareas
                // doctorQual.addEventListener('input', () => {
                //     doctorQual.style.height = '0'; // Reset height
                //     doctorQual.style.padding = 0; // Reset padding
                //     doctorQual.style.height = doctorQual.scrollHeight + 'px'; // Set to scroll height
                // });

                // doctorAffiliation.addEventListener('input', () => {
                //     doctorAffiliation.style.height = '0'; // Reset height
                //     doctorAffiliation.style.padding = 0; // Reset padding
                //     doctorAffiliation.style.height = doctorAffiliation.scrollHeight +
                //         'px'; // Set to scroll height
                // });
                 </script> -->
            </div>
            <div class="header-right">
                <div class="name">Lab Aid Hospital & Diagnostic Center</div>
                <div class="reg">BMDC Reg No. A-58221</div>
                <div class="designation">Assistant Professor</div>
            </div>
        </div>

        <div class="divider"></div>

        <div class="patient-row">
            <div class="field"><strong>Name:</strong> <span>Begum Ruhun Naher</span></div>
            <div class="field"><strong>Age:</strong> <span>67</span></div>
            <div class="field"><strong>Date:</strong> <span>04/10/2025</span></div>
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

        <div class="footer">
            <span>Medicine prescription</span>
        </div>
    </div>
</body>

</html>