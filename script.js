$(document).ready(function() {
    $('button#start-btn').click(() => $('#main').show() );
    

    $('input[name="mathRequire"]').change(checkMathReq);
    $('input[name="previousCourse"]').change(checkPrevCourse);
    $('input[name="previousExp"]').change(checkPrevExp);
    $('select[name="lastCourse"]').change(checkLastCouse);
    $('input[name="apScore"]').change(checkAPGrade);
    $('#topics-110').find('select').change(check110Topics);

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
        case 'CSC-110-fail':
            showQuestion(event, $(event.target), $('#result-110-retake'));
            break;
        case 'CSC-110-pass':
            showQuestion(event, $(event.target), $('#result-120-from110'));
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
          showQuestion(event, $(event.target), $('#result-120-ap'));
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


function download(thisId) {
  var content = 'Computer Science guided self-placement results\n';
  content += '---------------------------------------------------------\n\n';
  
  let respMath = $('input[name="mathRequire"]:checked').val();
  content += 'Do you have the math requirement or have you successfuly completed CSC 101 (with a grade of C or higher)?\n';
  content += respMath + "\n";
  
  let respPrevious = $('input[name="previousCourse"]:checked').val();
  if (respPrevious) {
    content += 'Have you taken a previous computer science course?\n';
    content += respPrevious + "\n";
  }
  
  let respExp = $('input[name="previousExp"]:checked').val();
  if (respExp) {
    content += 'Do you have previous programming experience outside of a course?\n'
    content += respExp + "\n";
  }
  
  let course = $('select[name="lastCourse"]').val();
  if (course) {
    content += 'What is the most recent computer science course you have completed?\n'
    content += course + "\n";
  }
  
  
  let grade = $('input[name="apScore"]:checked').val();
  if (grade) {
    content += 'What was your score on the AP Computer Science A exam?\n'
    content += grade + "\n";
  }
  
  
  let topics = $('#topics-110').find('select');
  let responses = topics.get().map(x => $(x).val());
  if (responses[0]) {
    content += '\nHow familiar and comfortable are you with each of the following programming topics/constructs?\n';
    content += '\nVariables and assignment statements\n'
    switch (responses[0]) {
        case '0':
          content += 'I have never heard of this.';
          break;
        case '1':
          content += "I have heard of this but don't know what it is or don't understand it.";
          break;
        case '2':
          content += 'I know what this is but I am not comfortable using it in programming.';
          break;
        case '3':
          content += 'I am somewhat comfortable using this in programming.';
          break;
        case '4':
          content += 'I am entirely comfortable using this in programming.';
          break;
    }
    
    content += '\n\nData types\n'
    switch (responses[1]) {
        case '0':
          content += 'I have never heard of this.';
          break;
        case '1':
          content += "I have heard of this but don't know what it is or don't understand it.";
          break;
        case '2':
          content += 'I know what this is but I am not comfortable using it in programming.';
          break;
        case '3':
          content += 'I am somewhat comfortable using this in programming.';
          break;
        case '4':
          content += 'I am entirely comfortable using this in programming.';
          break;
    }
    
    content += '\n\nLoops\n'
    switch (responses[2]) {
        case '0':
          content += 'I have never heard of this.';
          break;
        case '1':
          content += "I have heard of this but don't know what it is or don't understand it.";
          break;
        case '2':
          content += 'I know what this is but I am not comfortable using it in programming.';
          break;
        case '3':
          content += 'I am somewhat comfortable using this in programming.';
          break;
        case '4':
          content += 'I am entirely comfortable using this in programming.';
          break;
    }
    
    content += '\n\nConditionals\n'
    switch (responses[3]) {
        case '0':
          content += 'I have never heard of this.';
          break;
        case '1':
          content += "I have heard of this but don't know what it is or don't understand it.";
          break;
        case '2':
          content += 'I know what this is but I am not comfortable using it in programming.';
          break;
        case '3':
          content += 'I am somewhat comfortable using this in programming.';
          break;
        case '4':
          content += 'I am entirely comfortable using this in programming.';
          break;
    }
    
    content += '\n\nFunctions and/or methods\n'
    switch (responses[4]) {
        case '1':
          content += 'I have never heard of this.';
          break;
        case '2':
          content += "I have heard of this but don't know what it is or don't understand it.";
          break;
        case '3':
          content += 'I know what this is but I am not comfortable using it in programming.';
          break;
        case '4':
          content += 'I am somewhat comfortable using this in programming.';
          break;
        case '5':
          content += 'I am entirely comfortable using this in programming.';
          break;
    }
  }
  
  
  content += '\n\nResult:\n\n'
  content += document.getElementById(thisId).innerText;
  
  
  var file = new File([content],
          'csc-placement-results.txt', {
          type: 'text/plain',
        })
        
  const link = document.createElement('a')
  const url = URL.createObjectURL(file)

  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
