// $(document).ready(function() {
  var option = {
    time: 12,
    sessions: 4,
  };

  var homeTeam = {
    name: 'homer',
    addPlayer: function(number,playerName) {
      this.roster[number] = {name: playerName, score: 0, foul: 0}
    },
    roster: {
      "1": {name: 'Player 1', score: 0, foul: 0},
      "2": {name: 'Player 2', score: 0, foul: 0},
      "3": {name: 'Player 3', score: 0, foul: 0},
      "4": {name: 'Player 4', score: 0, foul: 0}
    },
    score: 0,
    teamFoul: 0,
    timeout: 5,
    timeout20s: 1
  };

  var awayTeam = {
    name: 'flyaway',
     addPlayer: function(number,playerName) {
      this.roster[number] = {name: playerName, score: 0, foul: 0}
    },
    roster: {
      "1": {name: 'Player 1', score: 0, foul: 0},
      "2": {name: 'Player 2', score: 0, foul: 0},
      "3": {name: 'Player 3', score: 0, foul: 0},
      "4": {name: 'Player 4', score: 0, foul: 0}
    },
    score: 0,
    teamFoul: 0,
    timeout: 5,
    timeout20s: 1
  };

  var currentSession = 1;
  var currentTime = '';
  var minLeft = option.time;
  var secLeft = 0;
  var msecLeft = 0;
  var timer;
  var shotSecLeft = 23;
  var shotTimer;
  var timeOutTimeLeft = 0;
  var timeOutTimer;


  //---------------------------- Timer System ----------------------------

  var secPresenter = function() {
    if (secLeft > 9) {
        $('#second').text(secLeft);
      } else {
        $('#second').text('0' + secLeft);
      }
  };

  var countDown = function () {
    if (minLeft > 0 && secLeft === 0 && msecLeft === 0) {
      $('#second').text('00');
      $('#msecond').text(msecLeft);
      msecLeft = 9;
      minLeft = minLeft - 1;
      secLeft = 59;
    } else if (secLeft === 59 && msecLeft === 9) {
      $('#minute').text(minLeft);
      $('#second').text(secLeft);
      $('#msecond').text(msecLeft);
      msecLeft = msecLeft - 1 ;
    } else if (minLeft >= 0 && secLeft > 0 && msecLeft === 0) {
      $('#msecond').text(msecLeft);
      secLeft = secLeft - 1;
      msecLeft = 9;
    } else if (minLeft >= 0 && msecLeft > 0) {
      secPresenter();
      $('#msecond').text(msecLeft);
      msecLeft = msecLeft - 1 ;
    } else if (minLeft === 0 && secLeft === 0 && msecLeft === 0) {
      $('#msecond').text(msecLeft);
      console.log('stop the timer');
      clearInterval(timer);
    }
  };

  var resumeTimer = function() {
    timer = setInterval(countDown, 100);
  };

  var pauseTimer = function() {
    clearInterval(timer);
  };

  var adjustTimer = function(element,amount) {
    if (element === 'min') {
      if ((minLeft + amount) >= 0) {
        minLeft = minLeft + amount;
        $('#minute').text(minLeft);
      }
    } else if (element === 'sec') {
      if (secLeft + amount > 60) {
        secLeft = (secLeft + amount) % 60;
      } else if (secLeft + amount < 0) {
        secLeft = 61 + ((secLeft + amount) % 60);
      } else {
        secLeft = secLeft + amount;
      } secPresenter();
    } else if (element === 'ms') {
      if (msecLeft + amount > 9) {
        msecLeft = (msecLeft + amount) % 10;
      } else if (msecLeft + amount < 0) {
        msecLeft = 10 +((msecLeft + amount) % 10);
      } else {
        msecLeft = msecLeft + amount;
      }
      $('#msecond').text(msecLeft);
    }
  };

  //-------------------------- Shot Clock System ---------------------------

  var shotClockPresenter = function() {
    if (shotSecLeft > 9) {
        $('#shot-clock').text(shotSecLeft);
      } else {
        $('#shot-clock').text('0' + shotSecLeft);
      }
    };

  var shotClock = function () {
    if (shotSecLeft === 0) {
      $('#shot-clock').text('00');
      shotSecLeft = 24;
    } else if (shotSecLeft > 0) {
      shotClockPresenter();
      shotSecLeft = shotSecLeft - 1;
    }
  };

  var adjustShotClock = function(amount) {
      if (shotSecLeft + amount > 24) {
        shotSecLeft = (shotSecLeft + amount) % 25;
      } else if (shotSecLeft + amount < 0) {
        shotSecLeft = 25 +((shotSecLeft + amount) % 25);
      } else {
        shotSecLeft = shotSecLeft + amount;
      }
      shotClockPresenter();
    };

  var resumeShotClock = function() {
    shotTimer = setInterval(shotClock, 1000);
  };

  var pauseShotClock = function() {
    clearInterval(shotTimer);
  };

  var resetShotClock = function() {
    pauseShotClock();
    shotSecLeft = 23;
    $('#shot-clock').text('24');
    resumeShotClock();
  };

  var resetShotClockLeft = function() {
    shotSecLeft = 23;
    $('#shot-clock').text('24');
  };
  //---------------------------- Scoring System ----------------------------

  var addScore = function(team,playerNum,num) {
    if (team === "home") {
      homeTeam.score = homeTeam.score + num;
      if (homeTeam.score > 9) {
        $('#home-score').text(homeTeam.score);
      } else {
        $('#home-score').text('0' + homeTeam.score);
      } 
      homeTeam['roster'][playerNum]['score'] = homeTeam['roster'][playerNum]['score'] + num;
      printWithTime('Team ' + homeTeam.name + ', player ' + homeTeam['roster'][playerNum]['name'] + ' scores a ' + num + ' pointer.');
    } else if (team === "away") {
      awayTeam.score = awayTeam.score + num;
      if (awayTeam.score > 9) {
        $('#away-score').text(awayTeam.score);
      } else {
        $('#away-score').text('0' + awayTeam.score);
      } 
      awayTeam['roster'][playerNum]['score'] = awayTeam['roster'][playerNum]['score'] + num;
      printWithTime('Team ' + awayTeam.name + ', player ' + awayTeam['roster'][playerNum]['name'] + ' scores a ' + num + ' pointer.');
    }
  };
  //---------------------------- Time Out System ----------------------------

  var timeOutCountDown = function() {
    if (timeOutTimeLeft === 0) {
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
  };

  var callTimeOut = function(team,time) {
     if (time === 60) {
      if (team === 'home') {
        homeTeam.timeout = homeTeam.timeout - 1;
        $('#home-time-out').text(homeTeam.timeout);
        printWithTime('Team ' + homeTeam.name + ' calls a 60s timeout.');
      } else if (team === 'away') {
        awayTeam.timeout = awayTeam.timeout - 1;
        $('#away-time-out').text(awayTeam.timeout);
        printWithTime('Team ' + awayTeam.name + ' calls a 60s timeout.');
      } 
     } else if (time === 20) {
      if (team === 'home') {
        homeTeam.timeout20s = homeTeam.timeout20s - 1;
        $('#home-20-timeout').text(homeTeam.timeout20s);
        printWithTime('Team ' + homeTeam.name + ' calls a 20s timeout.');
      } else if (team === 'away') {
        awayTeam.timeout20s = awayTeam.timeout20s - 1;
        $('#away-20-timeout').text(awayTeam.timeout20s);
        printWithTime('Team ' + awayTeam.name + ' calls a 20s timeout.');
      } 
     } 
    pauseShotClock();
    pauseTimer();
    timeOutTimeLeft = time;
    timeOutTimer = setInterval(timeOutCountDown, 100);
  };
  //--------------------------- Foul System ----------------------------

  var foul = function(team,playerNum) {
    if (team === "home") {
      homeTeam.teamFoul = homeTeam.teamFoul + 1;
      $('#home-team-foul').text(homeTeam.teamFoul);
      homeTeam['roster'][playerNum]['foul'] = homeTeam['roster'][playerNum]['foul'] + 1;
      printWithTime('Team ' + homeTeam.name + ', player ' + homeTeam['roster'][playerNum]['name'] + ' commits a personal foul. '
        + homeTeam['roster'][playerNum]['name'] + ' has commited ' + homeTeam['roster'][playerNum]['foul'] + ' personal fouls.');
    } else if (team === "away") {
      awayTeam.teamFoul = awayTeam.teamFoul + 1;
      $('#away-team-foul').text(awayTeam.teamFoul);
      awayTeam['roster'][playerNum]['foul'] = awayTeam['roster'][playerNum]['foul'] + 1;
      printWithTime('Team ' + awayTeam.name + ', player ' + awayTeam['roster'][playerNum]['name'] + ' commits a personal foul. '
        + awayTeam['roster'][playerNum]['name'] + ' has committed ' + awayTeam['roster'][playerNum]['foul'] + ' personal fouls.');
    }
  };

  //------------------------- Log Printing System ---------------------------

  var print = function(string){
    $('.match-log').append('<p>'+string+'</p>')
  };
  var printWithTime = function(string){
    var sec;
    if (secLeft > 9) {
        sec = secLeft;
      } else {
        sec = '0' + secLeft;
      }
    currentTime = '( Q' + currentSession + ' -- ' + minLeft + ':' + sec + ' ) ';
    $('.match-log').append('<p>'+currentTime+string+'</p>');

  };
  $(document).on('click', '#enter', function(){
    var customLog = $('#user-input').val();
    printWithTime(customLog);
    $('#user-input').val('');
    // clearUserInput();
  });

  //--------------------------- Overall Controls ----------------------------

  var resumeAll = function() {
    resumeTimer();
    resumeShotClock();
  };

  var pauseAll = function() {
    pauseTimer();
    pauseShotClock();
    printWithTime('Game is paused.')
  };
  
  //--------------------------- Control Buttons ------------------------------

  // scoring system
  var point = 0;

  $(document).on('click', '#home-3', function(){
    point = 3; 
    $('.home-roster-score').toggleClass('hide');
  });
  $(document).on('click', '#home-2', function(){
    point = 2; 
    $('.home-roster-score').toggleClass('hide');
  });
  $(document).on('click', '#home-1', function(){
    point = 1; 
    $('.home-roster-score').toggleClass('hide');
  });
  $(document).on('click', '#home-n1', function(){
    if (homeTeam.score > 0) {
      point = -1;
      $('.home-roster-score').toggleClass('hide');
    }
  });

  $(document).on('click', '#away-3', function(){
    point = 3;
    $('.away-roster-score').toggleClass('hide');
  });
  $(document).on('click', '#away-2', function(){
    point = 2;
    $('.away-roster-score').toggleClass('hide');
  });
  $(document).on('click', '#away-1', function(){
    point = 1;
    $('.away-roster-score').toggleClass('hide');
  });
  $(document).on('click', '#away-n1', function(){
    if (awayTeam.score > 0) {
      point = -1;
      $('.away-roster-score').toggleClass('hide');
    }
  });

  $(document).on('click', '.home-player-point', function(){
    var playerNum = $(this).text();
    addScore('home', playerNum, point);
    point = 0;
    setTimeout(function(){
      $('.home-roster-score').toggleClass('hide');
    }, 300);
  });

  $(document).on('click', '.away-player-point', function(){
    var playerNum = $(this).text();
    addScore('away', playerNum, point);
    point = 0;
    setTimeout(function(){
      $('.away-roster-score').toggleClass('hide');
    }, 300);
  });

  // time out system
  $(document).on('click', '#home-60s', function(){
    if (homeTeam.timeout > 0) {
      callTimeOut('home',60);
      if ($('#resume').hasClass('hide')) {
        toggleTimerButtons();
      }
    }
  });
  $(document).on('click', '#home-20s', function(){
    if (homeTeam.timeout20s > 0) {
      callTimeOut('home',20);
      if ($('#resume').hasClass('hide')) {
        toggleTimerButtons();
      }
    }
  });
  $(document).on('click', '#away-60s', function(){
    if (awayTeam.timeout > 0) {
      callTimeOut('away',60);
      if ($('#resume').hasClass('hide')) {
        toggleTimerButtons();
      }
    }
  });
  $(document).on('click', '#away-20s', function(){
    if (awayTeam.timeout20s > 0) {
      callTimeOut('away',20);
      if ($('#resume').hasClass('hide')) {
        toggleTimerButtons();
      }
    }
  });

  // foul system
  $(document).on('click', '#home-foul', function(){
    $('.home-roster-foul').toggleClass('hide');
  });
  $(document).on('click', '#away-foul', function(){
    $('.away-roster-foul').toggleClass('hide');
  });
  $(document).on('click', '.home-player-foul', function(){
    var playerNum = $(this).text();
    foul('home', playerNum);
    setTimeout(function(){
     $('.home-roster-foul').toggleClass('hide'); 
   }, 300);
  });
  $(document).on('click', '.away-player-foul', function(){
    var playerNum = $(this).text();
    foul('away', playerNum);
    setTimeout(function(){
     $('.away-roster-foul').toggleClass('hide'); 
   }, 300);
  });

  // timer system
  $(document).on('click', '#min-1', function(){
    adjustTimer('min',1);
  });
  $(document).on('click', '#min-n1', function(){
    adjustTimer('min',-1);
  });

  $(document).on('click', '#sec-1', function(){
    adjustTimer('sec',1)
  });
  $(document).on('click', '#sec-n1', function(){
    adjustTimer('sec',-1);
  });

  $(document).on('click', '#ms-1', function(){
    adjustTimer('ms',1);
  });
  $(document).on('click', '#ms-n1', function(){
    adjustTimer('ms',-1);
  });

  $(document).on('click', '#start', function(){
    resumeAll();
    $(this).toggleClass('hide');
    $('#pause').toggleClass('hide');
    $('#reset-shot-time').toggleClass('hide');
    $('#reset-shot').toggleClass('hide');
  });
  $(document).on('click', '#pause', function(){
    pauseAll();
    $(this).toggleClass('hide');
    $('#resume').toggleClass('hide');
    $('#reset-shot-time').toggleClass('hide');
    $('#reset-shot').toggleClass('hide');
  });
  $(document).on('click', '#resume', function(){
    resumeAll();
    $(this).toggleClass('hide');
    $('#pause').toggleClass('hide');
    $('#reset-shot-time').toggleClass('hide');
    $('#reset-shot').toggleClass('hide');
  });
  var toggleTimerButtons = function(){
    $('#resume').toggleClass('hide');
    $('#pause').toggleClass('hide');
    $('#reset-shot-time').toggleClass('hide');
    $('#reset-shot').toggleClass('hide');
  }

  $(document).on('click', '#reset-shot', function(){
    resetShotClock();
  });
  $(document).on('click', '#reset-shot-time', function(){
    resetShotClockLeft();
  });
  $(document).on('click', '#shotclock-1', function(){
    adjustShotClock(1);
  });
  $(document).on('click', '#shotclock-n1', function(){
    adjustShotClock(-1);
  });

//--------------------------- Set Up Game ------------------------------

  $(document).on('click', '#add-home-player', function() {
    $(this).parent().prepend('<div class="set-home-player"> \
                <input type="text" class="col-xs-3 home-player-no" placeholder="No"> \
                <input type="text" class="col-xs-9 home-player-name" placeholder="Name"> \
              </div>')
  });

  $(document).on('click', '#add-away-player', function() {
    $(this).parent().prepend('<div class="set-away-player"> \
                <input type="text" class="col-xs-3 away-player-no" placeholder="No"> \
                <input type="text" class="col-xs-9 away-player-name" placeholder="Name"> \
              </div>')
  });

// })