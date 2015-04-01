// $(document).ready(function() {
  var option = {
    time: 12,
    sessions: 4,
  }

  var homeTeam = {
    name: 'Home',
    players: [],
    score: 0,
    teamFoul: 0,
    timeout: 5
  }

  var awayTeam = {
    name: 'Home',
    players: [],
    score: 0,
    teamFoul: 0,
    timeout: 5
  }

  var minLeft = option.time;
  var secLeft = 0;
  var msecLeft = 0;
  var timer;
  var shotSecLeft = 24;
  var shotTimer;
  var timeOutTimeLeft = 0;
  var timeOutTimer;

  //---------------------------- Timer System ----------------------------

  var countDown = function () {
    if (minLeft > 0 && secLeft == 0 && msecLeft == 0) {
      $('#second').text('00');
      $('#msecond').text(msecLeft);
      msecLeft = 9;
      minLeft = minLeft - 1;
      secLeft = 59;
    } else if (secLeft == 59 && msecLeft == 9) {
      $('#minute').text(minLeft);
      $('#second').text(secLeft);
      $('#msecond').text(msecLeft);
      msecLeft = msecLeft - 1 ;
    } else if (minLeft >= 0 && secLeft > 0 && msecLeft == 0) {
      $('#msecond').text(msecLeft);
      secLeft = secLeft - 1;
      msecLeft = 9;
    } else if (minLeft >= 0 && msecLeft > 0) {
      if (secLeft > 9) {
        $('#second').text(secLeft);
      } else {
        $('#second').text('0' + secLeft);
      }
      $('#msecond').text(msecLeft);
      msecLeft = msecLeft - 1 ;
    } else if (minLeft == 0 && secLeft == 0 && msecLeft == 0) {
      $('#msecond').text(msecLeft);
      console.log('stop the timer');
      clearInterval(timer);
    }
  }

  var resumeTimer = function() {
    timer = setInterval(countDown, 100);
  }

  var pauseTimer = function() {
    clearInterval(timer);
  }

  //-------------------------- Shot Clock System ---------------------------

  var shotClock = function () {
    if (shotSecLeft == 0) {
      $('#shot-clock').text('00')
      shotSecLeft = 24;
    } else if (shotSecLeft > 0) {
      if (shotSecLeft > 9) {
        $('#shot-clock').text(shotSecLeft);
        shotSecLeft = shotSecLeft - 1;
      } else {
        $('#shot-clock').text('0' + shotSecLeft);
        shotSecLeft = shotSecLeft - 1;
      }
    }
  }

  var resumeShotClock = function() {
    shotTimer = setInterval(shotClock, 1000);
  }

  var pauseShotClock = function() {
    clearInterval(shotTimer);
  }

  var resetShotClock = function() {
    pauseShotClock();
    shotSecLeft = 23;
    $('#shot-clock').text('24');
    resumeShotClock();
  }

  var resetShotClockLeft = function() {
    shotSecLeft = 23;
    $('#shot-clock').text('24');
  }
  //---------------------------- Scoring System ----------------------------

  var addScore = function(team,point) {
    if (team == "home") {
      homeTeam.score = homeTeam.score + point;
      if (homeTeam.score > 9) {
        $('#home-score').text(homeTeam.score);
      } else {
        $('#home-score').text('0' + homeTeam.score);
      }
    } else if (team == "away") {
      awayTeam.score = awayTeam.score + point;
      if (awayTeam.score > 9) {
        $('#away-score').text(awayTeam.score);
      } else {
        $('#away-score').text('0' + awayTeam.score);
      }
    }
  }
  //---------------------------- Time Out System ----------------------------

  var timeOutCountDown = function() {
    if (timeOutTimeLeft == 0) {
      console.log("stop time out");
      clearInterval(timeOutTimer);
      $('#shot-clock').text('0');
      setTimeout(function(){
        if (shotSecLeft < 24) {
          if (shotSecLeft > 8) {
            $('#shot-clock').text(shotSecLeft+1);
          } else {
            $('#shot-clock').text('0' + (shotSecLeft+1));
          } 
        } else {
            $('#shot-clock').text(shotSecLeft);
        }        
      },1000);
    } else {
      $('#shot-clock').text(timeOutTimeLeft);
      timeOutTimeLeft = timeOutTimeLeft -1;
    }
  }

  var callTimeOut = function(team,time) {
    if (team == 'home') {
      homeTeam.timeout = homeTeam.timeout - 1;
      $('#home-time-out').text(homeTeam.timeout);
    } else if (team == 'away') {
      awayTeam.timeout = awayTeam.timeout - 1;
      $('#away-time-out').text(awayTeam.timeout);
    }
    pauseShotClock();
    pauseTimer();
    timeOutTimeLeft = time;
    timeOutTimer = setInterval(timeOutCountDown, 1000);
  }
  //--------------------------- Team Foul System ----------------------------


  //--------------------------- Overall Controls ----------------------------

  var resumeAll = function() {
    resumeTimer();
    resumeShotClock();
  }

  var pauseAll = function() {
    pauseTimer();
    pauseShotClock();
  }
  
// })