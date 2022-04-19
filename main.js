const questionh3=document.querySelector(".question")
const UsersAnswer= document.getElementById("answer")
const optionscreen=document.querySelector(".optionscreen")
const valuesForm= document.querySelectorAll("#ValuesForm .inputfield")
const SignsToUse = document.querySelectorAll("#SignsToUse input")
const sbtn = document.querySelector("#startbtn")
const game = document.querySelectorAll(".game")
const scorediv= document.querySelectorAll(".current-score")
const nextbtn=document.querySelector(".nextbtn")
const finishbtn=document.querySelector('[data-type="finish"]')
const resultpage=document.querySelector('.finalresult')
let signs=[]
let questions=[]
let index=0


sbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    index=1
    nextbtn.dataset.type="next"
    valuesarray=Array.from(valuesForm)
    .filter(element => (element.name !== 'submit') )
    .reduce((acc,input)=>({...acc,[input.id]:input.value}),{});
    for (let i=0;i<SignsToUse.length;i++){
        if(SignsToUse[i].checked==true){
            signs.push(SignsToUse[i].value)
        }
    }
    createQuestionnaire(questions)
    startgame()
    let NumQuestions=valuesarray.NumberOfQuestions
    let Range=valuesarray.RangeOfNumbers
})


function startgame(){
    
    optionscreen.classList.add('hide')
    game[0].classList.remove('hide')
    scorediv[0].classList.remove('hide')
    updatescore()
    insertQuestion(index)
    nextbtn.addEventListener("click",()=>{

        if (index==valuesarray.NumberOfQuestions-1){
            nextbtn.textContent="finish"
            nextbtn.dataset.type="finish"
        }
        if (checkAnswer(UsersAnswer.value,index)){
            questions[0].score++
        }
        index++
        
        if (index<=valuesarray.NumberOfQuestions){
            updatescore(index)
            insertQuestion(index)
            UsersAnswer.value=""
        }
        if (index>valuesarray.NumberOfQuestions){
            displayFinalResult()
            
        }
        })
}

function insertQuestion(index){
    questionh3.textContent=questions[index].Question
}
function checkAnswer(UsersAnswer,index){
    if (questions[index].Answer==UsersAnswer){
        questions[index].Correct=true
        }

    return questions[index].Correct
}

function updatescore(index){
    scorediv[0].textContent=`Current Score = ${questions[0].score} / ${questions[0].totalquestions}`

}

function displayFinalResult(){
        game[0].classList.add('hide')
        questions.forEach((question)=>{
        if(question.Question){
            scorediv[0].textContent=`final Score = ${questions[0].score} / ${questions[0].totalquestions}`
            const questioncarddiv= document.createElement('div')
            questioncarddiv.classList.add('question-card')
            if (question.Correct==false){
                questioncarddiv.classList.add('wrong');
            }
            if (question.Correct==true){
                questioncarddiv.classList.add('correct');
            }
            const questionele= document.createElement('h3')
            questionele.classList.add('result-question')
            const answerele= document.createElement('p')
            answerele.classList.add('answer')
            questionele.textContent=question.Question
            answerele.textContent=question.Answer
            resultpage.append(questioncarddiv)
            questioncarddiv.append(questionele)
            questioncarddiv.append(answerele)
    }
    })
    
}
function createQuestionnaire(questiondict){
    let playerdata={
        score:0,
        totalquestions:valuesarray.NumberOfQuestions,
    }
    questiondict.push(playerdata)
    for (let i=0;i<valuesarray.NumberOfQuestions;i++){
        let query1=Math.floor(Math.random() * (valuesarray.RangeOfNumbers-1))+1
        let query2=Math.floor(Math.random() * (valuesarray.RangeOfNumbers-1))+1
        let sign=signs[Math.floor((Math.random()*signs.length))]
        let answer= eval(query1+sign+query2)
        
        let newquestion={
            Question: `What will be the value of ${query1} ${sign} ${query2} ?`,
            Answer: answer,
            Correct: false
        }
        questiondict.push(newquestion)
    }
    return questiondict
}

function flushQuestionanaire(questiondict){
    questiondict=[]
    return questiondict
}
