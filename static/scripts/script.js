// Selectors variables
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .continue");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const textfield_list = document.querySelector(".textfield_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const continue_quiz = result_box.querySelector(".buttons .continue");
const quit_quiz = result_box.querySelector(".buttons .quit");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// Configuration variables
let timeValue =  180;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;



// Start quiz
start_btn.onclick = ()=>{
    window.localStorage.clear()
    info_box.classList.add("activeInfo"); //show info box
}

// Exit quiz
exit_btn.onclick = ()=>{
    window.localStorage.clear()
    info_box.classList.remove("activeInfo"); //hide info box
}

// QuitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

// Show questions from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ items[index].numb + ". " + items[index].question +'</span>';
    let textfield_tag = '<div class="input-box"><input type="text" class="input" value='+items[index].value+'></input></div>'
    que_text.innerHTML = que_tag; 
    textfield_list.innerHTML = textfield_tag ; 
    next_btn.classList.add("show"); 
}

// Continue and Restart quiz button
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(180); 
    startTimerLine(0); 
}


// Continue Quiz button clicked
continue_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    timeValue = 180; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
}

// Next Button
next_btn.onclick = ()=>{
    if(que_count <= items.length){ 
        const input = document.querySelector(".input");
        const float_pattern = /^[-+]?[0-9]+\.[0-9]+$/; 
        if (input.value.match(float_pattern)){
            window.localStorage.setItem(items[que_count].name,input.value)     
           
            if(que_count < items.length - 1){ 
                que_count++; 
                que_numb++; 
                showQuetions(que_count); 
                queCounter(que_numb);
                clearInterval(counter);
                clearInterval(counterLine); 
                startTimer(timeValue);
                startTimerLine(widthValue); 
                timeText.textContent = "Time Left"; 
            }else{
                clearInterval(counter); 
                clearInterval(counterLine); 
                showResult(); 
            }

        }else{
            alert('Error, por favor escribir número decimal')
        }
    }
    
   
}

// Show Results
function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 


    let data = {
        "CRIM": parseFloat(window.localStorage.getItem('CRIM')),
        "ZN": parseFloat(window.localStorage.getItem('ZN')),
        "INDUS" : parseFloat(window.localStorage.getItem('INDUS')),
        "CHAS" : parseFloat(window.localStorage.getItem('CHAS')),
        "NOX": parseFloat(window.localStorage.getItem('NOX')),
        "RM" : parseFloat(window.localStorage.getItem('RM')),
        "AGE" : parseFloat(window.localStorage.getItem('AGE')),
        "DIS": parseFloat(window.localStorage.getItem('DIS')),
        "RAD" : parseFloat(window.localStorage.getItem('RAD')),
        "TAX": parseFloat(window.localStorage.getItem('TAX')),
        "PTRATIO" : parseFloat(window.localStorage.getItem('PTRATIO')),
        "B" : parseFloat(window.localStorage.getItem('B')),
        "LSTAT" : parseFloat(window.localStorage.getItem('LSTAT'))
    }


     let fetchJsonRequest = {
        cache: "no-cache",
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data)
    }

    const result = fetch('https://api-prediction-price-house.herokuapp.com/api/regression/v1/predict/price',fetchJsonRequest).
    then((response) => {
        response.json().then((result) => {

            const scoreText = result_box.querySelector(".score_text");
    
            let precioLineal = '<span>Precio por Regresión Lineal:  <p>$'+ result["price of predict lineal regression"] +'</p> </span>';
            let precioRidge = '<span>Precio por Regresión Lineal:  <p>$'+ result["price of predict ridge regression"] +'</p> </span>';
    
            let divprecio = '<div>'+precioLineal+''+precioRidge+'</div>'
            scoreText.innerHTML = divprecio;  

        })
    
    }) 
    //
}


// Start Time of Item
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off";
            
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
           
        }
    }
}

// Start Time Line
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

// Question Number
function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ items.length +'</p> Items</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}

