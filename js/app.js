// $(document).ready(function() {
  var option = {
    time: 12,
    sessions: 4,
    homeName: 'Home',
    awayName: 'Away',
    homePlayers: [],
    awayPlayers: []
  }
  var minLeft = option.time;
  var secLeft = 0;
  var msecLeft = 0;
  var timer;
  var homeScore = 0;
  var awayScore = 0;
  var shotSecLeft = 24;

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
      shotSecLeft = 24;
      
    }
  }

  //---------------------------- Scoring System ----------------------------

  var addScore = function(team,point) {
    if (team == "home") {
      homeScore = homeScore + point;
      if (homeScore > 9) {
        $('#home-score').text(homeScore);
      } else {
        $('#home-score').text('0' + homeScore);
      }
    } else if (team == "away") {
      awayScore = awayScore + point;
      if (awayScore > 9) {
        $('#away-score').text(awayScore);
      } else {
        $('#away-score').text('0' + awayScore);
      }
    }
  }

// })