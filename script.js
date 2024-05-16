$(document).ready(function() {
    $('button#start-btn').click(() => $('#main').show() );

    $('input[name="mathRequire"]').change(checkMathReq);
    $('input[name="previousCourse"]').change(checkPrevCourse);
    $('input[name="previousExp"]').change(checkPrevExp);
    $('select[name="lastCourse"]').change(checkLastCouse);
    $('input[name="apScore"]').change(checkAPGrade);
    $('#topics-110').find('select').change(check110Topics);
    $('input[name^="p_121p"]').change(check121Problem);

});

function checkMathReq(event) {
    $('input[name="previousCourse"]').prop('checked', 0);
    let resp = $('input[name="mathRequire"]:checked').val();
    console.log(resp);
    if (resp == 'No') {
        showQuestion(event, $(event.target), $('#result-101'));
    } else {
        showQuestion(event, $(event.target), $('#prevCourse'));
    }
}



function checkPrevCourse(event) {
    $('input[name="previousExp"]').prop('checked', 0);
    $('select[name="lastCourse"]').prop('selectedIndex', 0);
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
        $('select[name="110vars"]').prop('selectedIndex', 0);
        $('select[name="110types"]').prop('selectedIndex', 0);
        $('select[name="110funcs"]').prop('selectedIndex', 0);
        $('select[name="110loops"]').prop('selectedIndex', 0);
        $('select[name="110conds"]').prop('selectedIndex', 0);
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
            $('input[name="apScore"]').prop('checked', 0);
            showQuestion(event, $(event.target), $('#apScore'));
            break;
        case 'CSC-101':
            showQuestion(event, $(event.target), $('#result-110-exp'));
            break;
        case 'CSC-110':
            showQuestion(event, $(event.target), $('#result-110-exp'));
            break;
        default:
            $('select[name="110vars"]').prop('selectedIndex', 0);
            $('select[name="110types"]').prop('selectedIndex', 0);
            $('select[name="110funcs"]').prop('selectedIndex', 0);
            $('select[name="110loops"]').prop('selectedIndex', 0);
            $('select[name="110conds"]').prop('selectedIndex', 0);
            showQuestion(event, $(event.target), $('#topics-110'));
            break;
    }
}


function checkAPGrade(event) {

    let grade = $('input[name="apScore"]:checked').val();
    console.log(grade);
    switch (grade) {
        case '4':
        case '5':
          showQuestion(event, $(event.target), $('#result-120'));
          break;
        case 'X':
            $('select[name="110vars"]').prop('selectedIndex', 0);
            $('select[name="110types"]').prop('selectedIndex', 0);
            $('select[name="110funcs"]').prop('selectedIndex', 0);
            $('select[name="110loops"]').prop('selectedIndex', 0);
            $('select[name="110conds"]').prop('selectedIndex', 0);
            showQuestion(event, $(event.target), $('#topics-110'));
            break;
        default:
            $('select[name="110vars"]').prop('selectedIndex', 0);
            $('select[name="110types"]').prop('selectedIndex', 0);
            $('select[name="110funcs"]').prop('selectedIndex', 0);
            $('select[name="110loops"]').prop('selectedIndex', 0);
            $('select[name="110conds"]').prop('selectedIndex', 0);
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
        }
    }
}

function showNextQuestion(event, prev) {
    showQuestion(event, prev, prev.parents('.question').next('.question'));
}

