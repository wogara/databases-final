const keyword = document.getElementById("filterby");
const button = document.getElementById("filter");
const questions = document.querySelectorAll('.question');
console.log(questions[0].textContent);

button.addEventListener("click",function(){
    console.log(keyword.value);
    questions.forEach(function(question){
        if (!question.textContent.includes(keyword.value)){
            question.style.display='none';
        }else{
            question.style.display='block';
        }
    })
})
