<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <dialog id="drugEdit" , class="signinAlert">
        <div class="popup-content">
            <label id="editlabel" class="form-label">Enter text:</label>
            <div class = "nameSection", style="display: block, width: 100%">
                <input type="text" class="editInput" id="editInput" placeholder="Type something...">
                <div class="editsuggestionList" id="editsuggestionList">
                    {{-- generative drug suggestion-list --}}
                </div>
            </div>
            <div id="drugEditSection">

                <select class="duration" , id="durationEdit" type="text" style="width: 30px" placeholder="5"></select>
                <select id="editDayWeekMonth" class="dayWeekMonth kalpurush" name="days">
                    <option value="select">দিন/মাস</option>
                    <option value="দিন">দিন</option>
                    <option value="সপ্তাহ">সপ্তাহ</option>
                    <option value="মাস">মাস</option>
                    <option value="বছর">বছর</option>
                    <option value="চলবে">চলবে</option>
                </select>
                <form style="display: flex" id="editMealRelation" , class="mealRelation">
                    <input type="radio" id="editbm" class="bm" name="editmealTime" value="খাবার আগে">
                    <label for="basic">খাবার আগে</label><br>

                    <input type="radio" id="editam" class="am" name="editmealTime" value="খাবার পরে">
                    <label for="pro">খাবার পরে</label><br>
                </form>
                <input type="text" center placeholder="Additional suggestion" class="suggestion" ,
                    id="editSuggestion"></input>
            </div>
            <div class = "button-holder">
                <button id="cancelEdit" class="cancel-button">Cancel</button>
                <button id="confirmEdit" class="confirm-button">Confirm</button>


            </div>
        </div>
    </dialog>
    <title>Document</title>
    </head>

    <body>

    </body>

</html>
