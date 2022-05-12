console.log("connected");
const topics = document.getElementById('topics');
const subtopics = document.getElementById('subtopics');
const hiddensubtopics = document.querySelectorAll('.subtopics');
const realtopic = document.getElementById('realtopic');
const realsubtopic = document.getElementById('realsubtopic');
console.log(topics.value);
realtopic.style.display='none';

realsubtopic.value = subtopics.value;
realtopic.value = topics.value;
all_subtopics = [];
//subtopics.options.forEach(function(subtopic){
//    all_subtopics.push(subtopic.value);
//});
for (let i = 0; i < subtopics.options.length; i++) { 
    all_subtopics.push(subtopics.options[i]);
}
console.log('all subtopics are : ' + all_subtopics);
function addAllOptions(selectElement){
    all_subtopics.forEach(function(sub){
      
            console.log('in addAllOptions sub.value' + sub.value);
        
            let opt = document.createElement('option');
                
            opt.value = sub.value;
            if (sub.value.split(',')[1] == 'newsubtopic'){
                opt.innerHTML = 'New Subtopic';
            }else{
                opt.innerHTML = sub.value.split(',')[1];
            }
            
            subtopics.appendChild(opt);

        
       
    })

    // let opt = document.createElement('option');
    
    // opt.value = 'T1,newsubtopic';
    // opt.innerHTML = 'New Subtopic';
    // subtopics.appendChild(opt);
    // realtopic.value = topics.value;

}

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
      //  console.log(selectElement.value);
       // if (selectElement[i].value != 'newsubtopic'){
            selectElement.remove(i);
       // }
    }
 }

realtopic.style.display='none';
relevantSubtopics = [];
hiddensubtopics.forEach(function(subtopic){
    let split = subtopic.value.split(',');
    let tid = split[0];
    let subtopic_name = split[1];
    if (tid == topics.value){
        relevantSubtopics.push(subtopic.value);
    }
        //console.log(split);
        
       // console.log(subtopic.value);
});
console.log(relevantSubtopics);
removeOptions(subtopics);
relevantSubtopics.forEach(function(sub){
    let opt = document.createElement('option');
        
    opt.value = sub;
    opt.innerHTML = sub.split(',')[1];
    subtopics.appendChild(opt);
})
let opt = document.createElement('option');
    
opt.value = 'T1,newsubtopic';
opt.innerHTML = 'New Subtopic';
subtopics.appendChild(opt);
realtopic.value = topics.value;

if (subtopics.value == 'T1,newsubtopic'){
    realsubtopic.style.display = 'block';
    realsubtopic.value='';
}else{
    realsubtopic.style.display='none';
    realsubtopic.value = subtopics.value;
  
}

topics.addEventListener('click',function(){
    //update subtopics dropdown with relevant subtopic names
   
    console.log(topics.value);
    if (topics.value == 'newtopic'){
        console.log('new topic');
        removeOptions(subtopics);
        addAllOptions(subtopics);
        realtopic.style.display = 'block';
        realtopic.value='';
        realsubtopic.style.display='none';
        realsubtopic.value = subtopics.value;

    }else{
        realtopic.style.display='none';
        realsubtopic.style.display='none';
        relevantSubtopics = [];
        hiddensubtopics.forEach(function(subtopic){
            let split = subtopic.value.split(',');
            let tid = split[0];
            let subtopic_name = split[1];
            if (tid == topics.value){
                relevantSubtopics.push(subtopic.value);
            }
        //console.log(split);
        
       // console.log(subtopic.value);
        });
        console.log(relevantSubtopics);
        removeOptions(subtopics);
        relevantSubtopics.forEach(function(sub){
            let opt = document.createElement('option');
            opt.value = sub;
            opt.innerHTML = sub.split(',')[1];
            subtopics.appendChild(opt);
        })
        let opt = document.createElement('option');
            
        opt.value = 'T1,newsubtopic';
        opt.innerHTML = 'New Subtopic';
        subtopics.appendChild(opt);
        realtopic.value = topics.value;
        realsubtopic.value = subtopics.value;

        if (subtopics.value == 'T1,newsubtopic'){
            realsubtopic.style.display = 'block';
            realsubtopic.value='';
        }else{
            realsubtopic.style.display='none';
            realsubtopic.value = subtopics.value;
          
        }
    }
    
});
//realtopic.addEventListener('input',function(e){
  
//    console.log(realtopic.value);
//});
subtopics.addEventListener('click',function(){
    if (subtopics.value == 'T1,newsubtopic'){
        realsubtopic.style.display = 'block';
        realsubtopic.value='';
    }else{
        realsubtopic.style.display='none';
        realsubtopic.value = subtopics.value;
      
    }


})