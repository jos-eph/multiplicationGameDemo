const UPPER_BOUND_FOR_OPERAND = 9;
const DEFAULT_QUESTION_COUNT = 10;
const NUMBER_OF_ANSWER_CHOICES = 4;

let questionCount = DEFAULT_QUESTION_COUNT;
let problem = {
    number: 0,
    left: 0,
    right: 0,
    correctAnswer: 0
}

const problemElement = document.getElementById('problem');
const pleaseSelectText = document.querySelector('header p');
const problemExpression = document.querySelector('.expression');
const answerList = document.querySelector('ul');
const answerChoiceElementsInDocument = answerList.children;
const currentProblem = document.querySelector('.currentProblem');
const currentScore = document.querySelector('.currentScore');
const btnStartOver = document.getElementById('btnStartOver');
const showHideList = document.querySelectorAll('.show-hide');


function showAllHideable()
{   
    for (i = 0; i < showHideList.length; i++)
    {
        showHideObject = showHideList[i];
        if (showHideObject.classList.contains("hidden"))
        { showHideObject.classList.remove("hidden");}
    }

}

function hideAllHideable()
{   
    for (i = 0; i < showHideList.length; i++)
    {
        showHideObject = showHideList[i];
        if (!showHideObject.classList.contains("hidden"))
        { showHideObject.classList.add("hidden");}
    }

}

function finishTest()
{
    hideAllHideable();
}


function handleAnswerClick(event)
{
    let itemClickedOn = event.target;
    let numberSelected = parseInt(itemClickedOn.innerText);
    if (numberSelected==problem.correctAnswer)
    {
        currentScore.innerText = parseInt(currentScore.innerText) + 1;
    }

    if (problem.number==DEFAULT_QUESTION_COUNT)
    { finishTest(); }
    else
    { makeProblem(); }

}

////////////////////////////////////
function startOver()
{
    problem.number = 0;
    currentScore.innerText = 0;
    currentProblem.innerText = 0;
    showAllHideable();
    makeProblem();

}


function contentLoaded(){
    makeProblem();

    for (i = 0; i < answerChoiceElementsInDocument.length; i++)
    {
        answerChoiceElementsInDocument[i].addEventListener('click', handleAnswerClick);
    }

}
document.addEventListener('DOMContentLoaded', contentLoaded);
btnStartOver.addEventListener('click',startOver);


/**
 * Utility function to generate a random number based on max
 * @param {number} max
 */

function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
function displayProblem(){
    problemExpression.innerText = problem.left + ' * ' + problem.right;
    currentProblem.innerText = problem.number;
}

function getRandomNumberNotInArrayOrSpecificInt(max,specificInt,array)
{
    let newNumber = -1;
    if (max < array.length) { return newNumber; } // prevent an infinite loop
    

    while (newNumber==-1||newNumber==specificInt||array.includes(newNumber))
    { newNumber = getRandomNumber(max); }

    return newNumber;
}


function displayAnswerChoices() {
    let answerChoiceArray = new Array(NUMBER_OF_ANSWER_CHOICES);
    let correctAnswerPosition = getRandomNumber(NUMBER_OF_ANSWER_CHOICES);
    answerChoiceArray[correctAnswerPosition] = problem.correctAnswer;

    let operandSquared = (UPPER_BOUND_FOR_OPERAND*UPPER_BOUND_FOR_OPERAND) + 1;
    for (i = 0; i < answerChoiceArray.length; i++)
    {
        if (i == correctAnswerPosition) { continue; }
        answerChoiceArray[i] = getRandomNumberNotInArrayOrSpecificInt(operandSquared,
            problem.correctAnswer,answerChoiceArray);
    }

    for (i = 0; i < NUMBER_OF_ANSWER_CHOICES; i++)
    {
        answerChoiceElementsInDocument[i].innerText = answerChoiceArray[i];
    }

}


function makeProblem(){
    if (problem.number==DEFAULT_QUESTION_COUNT) { return; }

    let operand1 = getRandomNumber(UPPER_BOUND_FOR_OPERAND + 1);
    let operand2 = getRandomNumber(UPPER_BOUND_FOR_OPERAND + 1);
    let correctAnswer = operand1 * operand2;
    problem.number = problem.number + 1;
    problem.left =  operand1;
    problem.right = operand2;
    problem.correctAnswer = problem.left * problem.right;
    displayProblem();
    displayAnswerChoices();
}