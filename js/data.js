

window.onload = function () {
    var clock = {
        currentTime: null,

        startClock: function () {
            var today = new Date();
            this.currentTime = today;
        }
    };

    var alarmList = JSON.parse(localStorage.getItem('alarmList')) || [],
        alarmObj = {
            hours: null, mins: null
        };

    function initialize() {

        clock.startClock();
        //document.getElementById('currentAnalog').innerHTML = clock.startClock();
        //document.getElementById('currentDigital').innerHTML = clock.startClock();

        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var currentDay = days[clock.currentTime.getDay()],
            currentDate = clock.currentTime.getDate(),
            currentMonth = months[clock.currentTime.getMonth()],
            currentYear = clock.currentTime.getFullYear(),
            currentHours = clock.currentTime.getHours(),
            currentMints = clock.currentTime.getMinutes(),
            currentSecs = clock.currentTime.getSeconds();
        document.getElementById('today').innerHTML = currentDay + ' , ' + currentMonth + ' ' + currentDate + ' ' + currentYear;

        document.getElementById('digital-clock').innerHTML = currentHours + ' : ' + currentMints + ' : ' + currentSecs;

        setInterval(function () {
            clock.startClock();
            currentDay = days[clock.currentTime.getDay()];
            currentDate = clock.currentTime.getDate();
            currentMonth = months[clock.currentTime.getMonth()];
            currentYear = clock.currentTime.getFullYear();
            currentHours = clock.currentTime.getHours();
            currentMints = clock.currentTime.getMinutes();
            currentSecs = clock.currentTime.getSeconds();
            document.getElementById('today').innerHTML = currentDay + ' , ' + currentMonth + ' ' + currentDate + ' ' + currentYear;

            document.getElementById('digital-clock').innerHTML = currentHours + ' : ' + currentMints + ' : ' + currentSecs;
        }, 1000);

        activateAnalog();
        registerClickEvents();
    }


    function activateAnalog() {
        var digital = document.getElementById('currentDigital'), analogue = document.getElementById('currentAnalog');
        digital.style.display = 'none';
        analogue.style.display = 'block';
    }

    function activateDigital() {
        var digital = document.getElementById('currentDigital'), analogue = document.getElementById('currentAnalog');
        digital.style.display = 'block';
        analogue.style.display = 'none';
    }

    function openClockPage() {
        document.getElementById('clock-screen').style.display = 'block';
        document.getElementById('alarm-screen').style.display = 'none';
        document.getElementById('add-alarm-screen').style.display = 'none';
    }

    function openAlarmMenu() {
        document.getElementById('menu-container').style.display = 'block';

    }

    function openSetAlarmPage() {
        document.getElementById('clock-screen').style.display = 'none';
        document.getElementById('alarm-screen').style.display = 'none';
        document.getElementById('add-alarm-screen').style.display = 'block';
    }

    function openAlarmListPage() {
        document.getElementById('menu-container').style.display = 'none';
        document.getElementById('clock-screen').style.display = 'none';
        document.getElementById('alarm-screen').style.display = 'block';
        document.getElementById('add-alarm-screen').style.display = 'none';

        generateList();
    }

    function openClockPage() {
        document.getElementById('menu-container').style.display = 'none';
        document.getElementById('clock-screen').style.display = 'block';
        document.getElementById('alarm-screen').style.display = 'none';
        document.getElementById('add-alarm-screen').style.display = 'none';
    }

    function saveAlarm() {
        var hours = document.getElementById('alarm-hour').value,
            mins = document.getElementById('alarm-mins').value,
            amPm = document.querySelector('input[name="optradio"]:checked').value,
            days = document.getElementsByClassName('days'),
            repeatingDays = [];

        for (var i = 0; i < days.length; i++) {
            // And stick the checked ones onto an array...
            if (days[i].checked) {
                repeatingDays.push(days[i].value);
            }
        }
        alarmObj = {
            hours: hours,
            mins: mins,
            amPm: amPm,
            repeatingDays: repeatingDays
        }
        alarmList.push(alarmObj);
        document.getElementById('alarm-hour').value = '';
        document.getElementById('alarm-mins').value = '';
        document.querySelector('input[name="optradio"]:checked').value = 'am'
    }

    function generateList() {
        localStorage.setItem('alarmList', JSON.stringify(alarmList));
        if (alarmList.length) {
            var e = "<hr/>";

            for (var y = 0; y < alarmList.length; y++) {
                e += '<div class="list-of-alarm alarm-"' + y + '>' + alarmList[y].hours + ' : ' + alarmList[y].mins + ' ' + alarmList[y].amPm.toUpperCase() + "</div>";
                if (alarmList[y].repeatingDays.length) {
                    e += '<div class="repeating-days">' + alarmList[y].repeatingDays + '</div>'
                }
                e += "<span class='delete-edit-buttons' data-index='" + y + "'><span class='edit-button' id='edit-button' data-index='" + y + "'> Edit </span><span class='delete-button' id='delete-button' data-index='" + y + "'> Delete</span></span></span><hr/> "
            }
            document.getElementById("alarm-list").innerHTML = e;
        } else {
            document.getElementById("alarm-list-no-alarm").style.display = 'block';
        }

        attachEventListenersForEditAndDelete();


    }

    function attachEventListenersForEditAndDelete() {
        var editButton = document.getElementsByClassName('edit-button'), deleteButton = document.getElementsByClassName('delete-button');
        for (var i = 0; i < editButton.length; i++) {
            editButton[i].addEventListener('click', editAlarm, false);
            deleteButton[i].addEventListener('click', deleteAlarm, false);
        }
    }

    function editAlarm(event, data) {
        var currentAlarm = event.target.getAttribute('data-index');

    }

    function deleteAlarm(event, data) {
        var currentAlarm = event.target.getAttribute('data-index');
        alarmList = alarmList.splice(Number(currentAlarm), 0);
        generateList();

    }




    function registerClickEvents() {
        document.getElementById("digital-label").addEventListener("click", function () {
            activateDigital();
        });

        document.getElementById("analog-label").addEventListener("click", function () {
            activateAnalog();
        });

        document.getElementById("menu").addEventListener("click", function () {
            openAlarmMenu();
        });

        document.getElementById("alarm-menu-title").addEventListener("click", function (event) {
            openAlarmListPage();
            event.stopPropagation()
        });

        document.getElementById("clock-menu-title").addEventListener("click", function (event) {
            openClockPage();
            event.stopPropagation()
        });


        document.getElementById('add-alarm-button').addEventListener("click", function () {
            openSetAlarmPage();
        });

        document.getElementById('save-alarm').addEventListener("click", function () {
            saveAlarm();
            openAlarmListPage();
        });


    }



    initialize();

}