// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

function showChoices() {
    const rps = document.getElementById('rps').checked;
    const rpsls = document.getElementById('rpsls').checked;
    const opponent = document.getElementById('opponent').checked;
    if(opponent) {
        if(rps) {
            document.getElementById('rpsChoices').className = 'shown';
            document.getElementById('rpslsChoices').className = 'hidden';
        } else if(rpsls) {
            document.getElementById('rpsChoices').className = 'shown';
            document.getElementById('rpslsChoices').className = 'shown';
        } else {
            document.getElementById('rpsChoices').className = 'hidden';
            document.getElementById('rpslsChoices').className = 'hidden';
        }
    }
}

function play() {
    var rps = document.getElementById('rps').checked;
    var rpsls = document.getElementById('rpsls').checked;
    var opponent = document.getElementById('opponent').checked;
    var choice;
    var choices = document.getElementsByName('choice');
    for (var i = 0; i < choices.length; i++) {
        if(choices[i].checked) {
            choice = choices[i].value;
            break;
        }
    }
    if(!rps && !rpsls) {
        document.getElementById('results').innerText = 'try playing for real bro';
    } else if(rps && !opponent) {
        fetch(`app/rps/play`)
        .then((res) => {
            return res.json
        })
        .then((json) => {
            document.getElementById('results').innerText = `Choice: ${json.player}`;;
        })
    } else if (rpsls && !opponent) {        
        fetch(`/app/rpsls/play`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                document.getElementById('results').innerText = `Choice: ${json.player}`;
            })
    } else if (rps && opponent) {
        fetch(`/app/rps/play/${choice}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                document.getElementById('results').innerText = `Choice: ${json.player}\nOpponent: ${json.opponent}\nResult: ${json.result}`;
            })
    } else {
        fetch(`/app/rpsls/play/${choice}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                document.getElementById('results').innerText = `Choice: ${json.player}\nOpponent: ${json.opponent}\nResult: ${json.result}`;
            })
    }
    document.getElementById('results').className = 'shown';
    document.getElementById('result').className = 'shown';
    document.getElementById('result').innerText = "HI!";
}

function restart() {
    document.getElementById('results').className = 'hidden';
    document.getElementById('rpsChoices').className = 'hidden';
    document.getElementById('rpslsChoices').className = 'hidden';
    document.getElementById('rps').checked = 'true';
    document.getElementById('opponent').checked = 'false';
}