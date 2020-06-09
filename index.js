const draggable_list= document.getElementById("draggable-list");
const richestPeople=[
    'Mukesh Ambani',
    'Gautam Adani',
    'Hinduja brothers',
    'Pallonji Mistry',
    'Uday Kotak',
    'Shiv Nadar',
    'Radhakishan Damani',
    'Godrej family',
    'Lakshmi Mittal',
    'Kumar Birla'

];
//const richestPeople=['A', 'B', 'C','D', 'E', 'F', 'G', 'H'];
const listItems=[];
let dragStartIndex;
var modal = document.getElementById("myModal");
var final = document.getElementById("final-message");
var span = document.getElementsByClassName("close")[0];
createList();

function createList()
{
    richestPeople.map(a=>{
        return {value:a, sort:Math.random()}
    }).sort((a,b)=>a.sort-b.sort)
    .map(a=>a.value)
    .forEach((person, index)=>{
        const listItem= document.createElement("li");
        listItem.setAttribute("data-index", index);
       
        listItem.innerHTML=`
        <span class="number"> ${index+1}</span>
        <div  id="${index}" class="draggable" draggable="true">
       ${person}</div>`;
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
        
    })
}

var ide;
function addEventListeners(){
    const draggables= document.querySelectorAll(".draggable");
    
    const dragListItems= document.querySelectorAll(".draggable-list li");
    draggables.forEach(draggabless=>
        {
            draggabless.addEventListener("dragstart", function(event){
                for (var i = 0; i < draggables.length; i++) 
                    draggables[i].style.backgroundColor="white";
           event.dataTransfer.setData("Text", event.target.id);
          ide = event.dataTransfer.getData("Text");
           event.dataTransfer.setData("Text", event.target.innerHTML);
        });
    });
        dragListItems.forEach(item=>
            {
                item.addEventListener("dragover", function(event){
                    event.preventDefault();
                })
                item.addEventListener("drop", function(event){
                    event.preventDefault();
                    document.getElementById(ide).innerHTML= event.target.innerHTML;
                    let data = event.dataTransfer.getData("Text");
                  //  console.log(data);
                   event.target.innerHTML=data;
            
                });
               
            });
}

addEventListeners();
document.getElementById("check").addEventListener("click", function(){
    wrong=false;
for(let i=0; i<richestPeople.length; i++)
{
  
    let getPerson=document.getElementById(`${i}`).innerHTML;
     if(richestPeople[i]!=getPerson.trim())
    {
        document.getElementById(`${i}`).style.backgroundColor="#ff3838";
        wrong=true;
    }
    else
    document.getElementById(`${i}`).style.backgroundColor="#3ae374";
}
if(wrong==false)
{
    modal.style.display = "block";
    final.innerHTML="Congrats, You're really smart!!";
}
});
span.onclick = function() {
    modal.style.display = "none";
  }

