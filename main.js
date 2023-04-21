// 유저가 값을 입력한다.
// +버튼을 클릭하면 아이템이 더해진다.
// 딜리트버튼을 누르면 아이템이 삭제된다
// 체크버튼 누르면 할일 끝, 밑줄이 생긴다.
// ㄱ진행중. 끝냄 탭 누르면 언더바 이동
// 끝남탭은 끝난 아이템만, 진행중탭은 진행중 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []; 
let tabs = document.querySelectorAll(".task-tabs div")
addButton.addEventListener("click", addTask);
let mode ="all";
let filterList =[];

for(i = 1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)});
}
function addTask(){
    let task = {
        id : randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete : false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let list = []
    if(mode == "all"){
        list = taskList;
    }else if(mode == "ongoing" || mode=="done"){
        list = filterList;
    }

    let resultHTML = '';
    for(i=0; i<list.length; i++){
        if(list[i].isComplete ==true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>      
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        } else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>      
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }
        }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
}

function deleteTask(id){
    for(i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render()
}

function filter(event){
    filterList=[];
    mode = event.target.id;
    if(mode == "all"){
        render();
    }else if(mode == "ongoing"){
        for(i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render()
    }else if(mode == "done"){
        for(i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
 }

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}