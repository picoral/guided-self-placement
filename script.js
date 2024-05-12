$(document).ready(function() {
    $('button#start-btn').click(() => $('#main').show() );

    $('input[name="mathRequire"]').change(checkMathReq);
    $('input[name="section"]').change(checkSection);
    $('input[name="wantNoExp"]').change(checkWantNoExp);
    $('input[name="previousCourse"]').change(checkPrevCourse);
    $('input[name="previousExp"]').change(checkPrevExp);
    $('select[name="lastCourse"]').change(checkLastCouse);
    $('input[name="apScore"]').change(checkAPGrade);
    $('#topics-110').find('select').change(check110Topics);

    $('input[name^="p_121p"]').change(check121Problem);

});

function checkMathReq(event) {
    let resp = $('input[name="mathRequire"]:checked').val();
    console.log(resp);
    if (resp == 'No') {
        showQuestion(event, $(event.target), $('#result-101'));
    } else {
        showQuestion(event, $(event.target), $('#section1pm2pm'));
    }
}

function checkSection(event) {
    let resp = $('input[name="section"]:checked').val();
    console.log(resp);
    if (resp == '2pm') {
        showQuestion(event, $(event.target), $('#result-110-2pm'));
    } else {
        showQuestion(event, $(event.target), $('#wantPrevExpClass'));
    }
}

function checkWantNoExp(event) {
    let resp = $('input[name="wantNoExp"]:checked').val();
    console.log(resp);
    if (resp == 'Yes') {
        showQuestion(event, $(event.target), $('#result-110-noexp'));
    } else {
        showQuestion(event, $(event.target), $('#prevCourse'));
    }
}

function checkPrevCourse(event) {
    let resp = $('input[name="previousCourse"]:checked').val();
    console.log(resp);
    if (resp == 'Yes') {
        showQuestion(event, $(event.target), $('#lastCourse'));
    } else {
        showNextQuestion(event, $(event.target));
    }
}

function checkPrevExp(event) {
    let resp = $('input[name="previousExp"]:checked').val();
    console.log(resp);
    if (resp == 'No') {
        showQuestion(event, $(event.target), $('#result-110-noexp'));
    } else {
        showQuestion(event, $(event.target), $('#topics-110'));
    }
}

function checkLastCouse(event) {
    $('.gradeCheck').prop("checked", false);
    $('.gradeCheck').hide();

    let course = $('select[name="lastCourse"]').val();
    console.log(course);
    switch(course) {
        case 'AP-A':
            showQuestion(event, $(event.target), $('#apScore'));
            break;
        case 'CSC-101':
            showQuestion(event, $(event.target), $('#result-110-exp'));
            break;
        case 'CSC-110':
            showQuestion(event, $(event.target), $('#result-110-exp'));
            break;
        // case 'ECS':
        // case 'AP-P':
        //     showQuestion(event, $(event.target), $('#result-adv'))
        //     break;
        default:
            showQuestion(event, $(event.target), $('#topics-110'));
            break;
    }
}


function checkAPGrade(event) {
    $('input[name="142Score"]').prop("checked", false);
    $('input[name="ibScore"]').prop("checked", false);

    let grade = $('input[name="apScore"]:checked').val();
    console.log(grade);
    switch (grade) {
        case '3':
          showQuestion(event, $(event.target), $('#topics-110'));
          break;
        case '4':
          showQuestion(event, $(event.target), $('#topics-110'));
          break;
        case '5':
          showQuestion(event, $(event.target), $('#result-120'));
          break;
        case 'X':
            showQuestion(event, $(event.target), $('#topics-110'));
            break;
        default:
            showQuestion(event, $(event.target), $('#topics-110'));
            break;
    }
}


function check110Topics(event) {
    let topics = $('#topics-110').find('select');
    console.log(topics);

    let responses = topics.get().map(x => $(x).val());
    if (responses.every(x => x >= 3)) {
        showQuestion(event, $(event.target), $('#result-110-exp-topics'));
    } else if (responses.every(x => x)) {
        showQuestion(event, $(event.target), $('#result-110-topics'));
    } else {
        showQuestion(event, $(event.target), null);
    }
}



function showQuestion(event, prev, target) {
    // hide all later questions
    prev.parents('.question').nextAll('.question').hide();

    // hide results
    $('.result').hide();

    if (target) {
        target.show();
        target.children().show();

        //// Smoothly scroll to this element that was just revealed
        $("html, body").animate({ scrollTop: $(document).height()}, "fast", "linear");

        if (target.hasClass('result')) {
            $('#result-hidden').text(target.attr('id'));
            saveData(event)
        }
    }
}

function showNextQuestion(event, prev) {
    showQuestion(event, prev, prev.parents('.question').next('.question'));
}


function saveData(e) {
    const action = "https://script.google.com/macros/s/AKfycbxRVJ8KIzKBiNzI71b1L3cVv0idoR8lpec0Zpkk-mJJvTw18Nr_rlcB31Hc-2nk07Zyqg/exec"

    e.preventDefault();
    const data = new FormData($('#main').get()[0]);
    fetch(action, {method: 'POST', body: data,})
}