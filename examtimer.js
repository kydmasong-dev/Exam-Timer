// JavaScript source code
    var readmins = 0;
    var writehrs = 0;
    var writemins = 0;
    var target = 0;
    var paused = false;
    var tstatus = "";
    // Decode and validate URL, then prepopulate form
    var hashParams = window.location.hash.substr(1).split('&');
    for (var i = 0; i < hashParams.length; i++) {
                    var p = hashParams[i].split('=');
    if (p[0] == "uos" || p[0] == "examtype" || p[0] == "readmins" || p[0] == "writehrs" || p[0] == "writemins" || p[0] == "optionalinfo") {
        eval("var ff=document.examinfo." + p[0] + ";");
    ff.value = decodeURIComponent(p[1]);
    document.getElementById('error').innerHTML = "Exam details were pre-filled from the URL. Please check them before continuing.";
                    }
                }
    // Define some basic helpers for the alarm
    function oscstop() {
        osc.disconnect(audioctx.destination);
    oscon = false;
                    if (beepcount > 1) {
        beepcount--;
    setTimeout(beep, beepdelay);
                    }
                }
    function beep() {
                    if (oscon == false) {
        osc.connect(audioctx.destination);
    oscon = true;
    setTimeout(oscstop, beeplength);
                    }
                }
    function alarm(x) {
        beepcount = x;
    beep();
                }
    // Clear all form fields
    function clearinfo() {
        document.examinfo.uos.value = "";
    document.examinfo.examtype.value = "";
    document.examinfo.readmins.value = "";
    document.examinfo.writehrs.value = "";
    document.examinfo.writemins.value = "";
    document.examinfo.optionalinfo.value = "";
    document.getElementById('error').innerHTML = "";
    encodeURL();
                }
    // Validation part 1: check all fields are complete
    function validateinfo() {
                    if (document.examinfo.uos.value == "" || document.examinfo.examtype.value == "" || document.examinfo.readmins.value == "" || document.examinfo.writehrs.value == "" || document.examinfo.writemins.value == "") {
        document.getElementById('error').innerHTML = "Error: all fields must be completed. For times, enter 0 if not needed.";
                    } else {
        vn1();
                    }
                }
    // Validation part 2: check all times are numbers
    function vn1() {
        readmins = document.examinfo.readmins.value;
    writehrs = document.examinfo.writehrs.value;
    writemins = document.examinfo.writemins.value;
    if (isNaN(readmins) == true || isNaN(writehrs) == true || isNaN(writemins) == true) {
        document.getElementById('error').innerHTML = "Error: all times must be numbers";
                    } else {
        vn2();
                    }
                }
    // Validation part 3: check all times are valid
    function vn2() {
                    if (readmins != Math.floor(Math.abs(readmins)) || writehrs != Math.floor(Math.abs(writehrs)) || writemins != Math.floor(Math.abs(writemins))) {
        document.getElementById('error').innerHTML = "Error: all times must be non-negative whole numbers";
                    } else {
        readytogo();
                    }
                }
    // Helper function to hide and show bits of the interface
    function phase(id) {
                    var e = document.getElementById(id);
    if (e.style.display == 'none') {
        e.style.display = 'block';
                    } else {
        e.style.display = 'none';
                    }
                }
    // Grammar helper for 1 minute / 2 minutes etc
    function pluralise(x) {
                    if (x == 1) {
                        return "";
                    } else {
                        return "s";
                    }
                }
    // Helper to get today's date as a nice text string
    function todaysdate(){
                var d = new Date();
    var dow=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var mth=["January","February","March","April","May","June","July","August","September","October","November","December"];
    return dow[d.getDay()]+" "+d.getDate()+" "+mth[d.getMonth()]+" "+d.getFullYear();
                }

    function encodeURL(){
        // Encode all exam details to URL and push it to the address bar - to be called prior to exam only
        newurl = (document.location.toString()).split("#")[0] + "#uos=" + encodeURIComponent(document.examinfo.uos.value) + "&examtype=" + encodeURIComponent(document.examinfo.examtype.value) + "&readmins=" + encodeURIComponent(document.examinfo.readmins.value) + "&writehrs=" + encodeURIComponent(document.examinfo.writehrs.value) + "&writemins=" + encodeURIComponent(document.examinfo.writemins.value) + "&optionalinfo=" + encodeURIComponent(document.examinfo.optionalinfo.value);
    window.history.pushState({ }, document.title, newurl);
                }

    function updateURL(){
        // Encode all exam details to URL and push it to the address bar - only call this function when details change in-exam
        newurl = (document.location.toString()).split("#")[0] + "#uos=" + encodeURIComponent(document.examinfo.uos.value) + "&examtype=" + encodeURIComponent(document.examinfo.examtype.value) + "&readmins=" + encodeURIComponent(document.examinfo.readmins.value) + "&writehrs=" + encodeURIComponent(document.examinfo.writehrs.value) + "&writemins=" + encodeURIComponent(document.examinfo.writemins.value) + "&optionalinfo=" + encodeURIComponent(document.addinfoform.addinfo.value);
    window.history.pushState({ }, document.title, newurl);
                }

    function gofullscreen() {
                  if ((document.fullScreenElement && document.fullScreenElement !== null ) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
                      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
                      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                      }
    responsivesize();
                  }
                }

    // Advance to second screen showing exam details.
    function readytogo() {
        responsivesize();
    // Normalise times greater than 60 to their proper times in hours and minutes
    readmins = Number(readmins);
    writehrs = Number(writehrs);
    writemins = Number(writemins);
                    if (writemins > 59) {
        writehrs += Math.floor(writemins / 60);
    writemins = writemins % 60;
                    }
    // Populate the screen with exam details from form
    var uosval = document.examinfo.uos.value; uosval = uosval.replace(/\r?\n/g, '<br />');
    document.getElementById('uos').innerHTML = uosval;
    document.getElementById('examtype').innerHTML = todaysdate()+" - "+document.examinfo.examtype.value;
    document.title = document.examinfo.uos.value + " - " + document.examinfo.examtype.value;
    document.getElementById('readmins').innerHTML = readmins + " minute" + pluralise(readmins);
    document.getElementById('writehrs').innerHTML = writehrs + " hour" + pluralise(writehrs);
    document.getElementById('writemins').innerHTML = writemins + " minute" + pluralise(writemins);
    var optinf = document.examinfo.optionalinfo.value;
    document.getElementById('addinfo').innerHTML = optinf;
    optinf = optinf.replace(/\r?\n/g, '<br />');
    document.getElementById('optionalinfo').innerHTML = optinf;

    gofullscreen();
    responsivesize();
    encodeURL();

    phase("getinfo");
    phase("prepare");
    prereading();
                }
    // Go back to exam setup page
    function back() {
        phase("getinfo");
    phase("prepare");
    document.getElementById('uos').innerHTML = "Examination";
    document.getElementById('examtype').innerHTML = "Setup Page";
    responsivesize();
                }
    // Start reading time
    function startreading() {
        // Set up webAudio oscillator for alarm
        audioctx = new (window.AudioContext || window.webkitAudioContext)();
    osc = audioctx.createOscillator();
    oscon = false;
    beepcount = 0;
    beeplength = 40;
    beepdelay = 110;
    osc.type = 'sine';
    osc.frequency.value = 880;
    osc.start();
    // Prepare for reading time
    tstatus = "Reading";
    phase("prepare");
    phase("exam");
    window.onbeforeunload = function() {return "";};
    clearTimeout(pretick);
    if (readmins == 0) {
        startwriting();
                    } else {
        target = new Date().getTime() + (readmins * 60000) + 1000;
    xtimeends("Reading");
    alarm(3);
    readingtime();
                    }
                }
    // Update display of the current time
    function updatecurtime() {
                    var ctime = new Date();
    var eth = ctime.getHours();
    var etm = ctime.getMinutes();
    var ets = ctime.getSeconds();
    var ampm = "am";
                    if (eth > 11) {
        ampm = "pm";
    eth = eth % 12;
                    }
    ;if (eth == 0) {
        eth = 12;
                    }
    if (paused == false) {document.getElementById('curtime').innerHTML = "Current Time: " + eth + ":" + (10 > etm ? "0" : "") + etm + ":" + (10 > ets ? "0" : "") + ets + ampm;}
                }
    // Update display of the current time during the pre-reading screen
    function prereading() {
                    var ctime = new Date();
    var eth = ctime.getHours();
    var etm = ctime.getMinutes();
    var ets = ctime.getSeconds();
    var ampm = "am";
                    if (eth > 11) {
        ampm = "pm";
    eth = eth % 12;
                    }
    ;if (eth == 0) {
        eth = 12;
                    }
                    document.getElementById('pretime').innerHTML = "Current Time: " + eth + ":" + (10 > etm ? "0" : "") + etm + ":" + (10 > ets ? "0" : "") + ets + ampm;
    pretick = setTimeout(prereading, 50)
                }
    // Compute and display the time at which reading or writing time ends
    function xtimeends(text) {
                    var endtime = new Date();
    endtime.setTime(target);
    var eth = endtime.getHours();
    var etm = endtime.getMinutes();
    var ets = endtime.getSeconds();
    var ampm = "am";
                    if (eth > 11) {
        ampm = "pm";
    eth = eth % 12;
                    }
    ;if (eth == 0) {
        eth = 12;
                    }
                    document.getElementById('message').innerHTML = text + " time ends at " + eth + ":" + (10 > etm ? "0" : "") + etm + ":" + (10 > ets ? "0" : "") + ets + ampm;
                }
    // Main reading time loop - update display with countdown timer
    function readingtime() {
                    var now = new Date().getTime();
    var diff = target - now;
    if (paused == true) {diff = diff + (now - pausedat);}
    // Timer shows red in last 1 minute of reading time
    if (diff < 60000) {document.getElementById('timer').style.color = "e64626";}
    else {document.getElementById('timer').style.color = "424242"}
                // When reading time is finished exit loop and start writing time
    if (diff < 0) {
        startwriting();
                    } else {
                        var mins = Math.floor(diff / 60000);
    diff -= (mins * 60000);
    var secs = Math.floor(diff / 1000);
    updatecurtime();
                        document.getElementById('timer').innerHTML = "0:" + (10 > mins ? "0" : "") + mins + ":" + (10 > secs ? "0" : "") + secs;
    if (paused == false) {readtick = setTimeout(readingtime, 50)};
                    }
                }
    // Start writing time
    function startwriting() {
        tstatus = "Writing";
    document.getElementById('curtime').style.color = "424242";
    target = new Date().getTime() + (writehrs * 3600000) + (writemins * 60000) + 1000;
    xtimeends("Writing");
    alarm(3);
    writingtime();
                }
    // Main writing time loop - update display with countdown timer
    function writingtime() {
                    var now = new Date().getTime();
    var diff = target - now;
    if (paused == true) {diff = diff + (now - pausedat);}
    // Timer shows red in last 10 minutes of writing time
    if (diff < 600000) {document.getElementById('timer').style.color = "e64626";}
    else {document.getElementById('timer').style.color = "424242"}
                // When writing time is finished exit loop and display exam finished message
    if (diff < 0) {
        document.getElementById('message').innerHTML = "The exam has finished, stop writing and put your pencils down. You are still under exam conditions so please remain silent and stay seated at your desks.";
    phase("control");
    alarm(16);
    flashtimer();
                    } else {
                        var hrs = Math.floor(diff / 3600000);
    diff -= (hrs * 3600000);
    var mins = Math.floor(diff / 60000);
    diff -= (mins * 60000);
    var secs = Math.floor(diff / 1000);
    updatecurtime();
                        document.getElementById('timer').innerHTML = hrs + ":" + (10 > mins ? "0" : "") + mins + ":" + (10 > secs ? "0" : "") + secs;
    if (paused == false) {writetick = setTimeout(writingtime, 50)};
                    }
                }
    // Helper function to flash the timer when the exam has finished
    function flashtimer() {
        document.getElementById('timer').innerHTML = "0:00:00";
    document.getElementById('curtime').innerHTML = "";
    if (document.getElementById('timer').style.color == "white") {
        document.getElementById('timer').style.color = "e64626";
                    } else {
        document.getElementById('timer').style.color = "white";
                    }
    setTimeout(flashtimer, 666);
                }
    // Pause or unpause the timer when the pause button is clicked
    function pauseplay() {
                    if (paused == false) {
        paused = true;
    // Store the time at which the timer was paused
    pausedat = new Date().getTime();
    // Switch the pause button to a play button
    document.getElementById('pause').innerHTML = "&#9654";
    document.getElementById('curtime').innerHTML = "&nbsp;"
    document.getElementById('message').innerHTML = tstatus + " time paused";
    // Actually stop the relevant timer
    if (tstatus == "Reading") {
        clearTimeout(readtick);
                        }
    if (tstatus == "Writing") {
        clearTimeout(writetick);
                        }
    alarm(2);
                    } else {
        paused = false;
    // Switch the play button to a pause button again
    document.getElementById('pause').innerHTML = "&#10074;&#10074;";
    // Compute the new reading/writing end time and update timer accordingly
    var now = new Date().getTime();
    var diff = now - pausedat;
    target += diff;
    // Return to either reading or writing time as before
    if (tstatus == "Reading") {
        xtimeends("Reading");
    readingtime();
                        }
    if (tstatus == "Writing") {
        xtimeends("Writing");
    writingtime();
                        }
    alarm(3);
                    }
                }
    // Add 1 minute
    function more() {
        target = target + 60000;
    if (paused == false) {
                    if (tstatus == "Reading") {xtimeends("Reading");}
    if (tstatus == "Writing") {xtimeends("Writing");}
                  }
    else {
                  if (tstatus == "Reading") {readingtime();}
    if (tstatus == "Writing") {writingtime();}
                  }
    alarm(1);
                }
    // Subtract 1 minute - this is a little bit complicated because of the way pausing works. Needs refactoring.
    function less() {
                if (paused == false) {
        target = target - 60000;
    if (tstatus == "Reading") {xtimeends("Reading");}
    if (tstatus == "Writing") {xtimeends("Writing");}
                  }
    else {
                  var now = new Date().getTime();
    var sincepaused = now - pausedat;
    var diff = target - now;
    if (diff < (60000 - sincepaused)) {target = target - diff - sincepaused;}
    else {target = target - 60000;}
    if (tstatus == "Reading") {readingtime();}
    if (tstatus == "Writing") {writingtime();}
                  }
    alarm(1);
                }