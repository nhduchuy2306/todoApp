var btn = document.querySelector("button")

var taskApi = 'https://61d65e71b738160017181531.mockapi.io/task';

function start(){
    getTasks(renderTask);
    handleCreateForm();
}

start();

function getTasks(callback){
    fetch(taskApi)
        .then((response) => {
            return response.json();
        })
        .then(callback);
}

function createTask(data,callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(taskApi,options)
        .then((response)=>{
            return response.json();
        })
        .then(callback);
}

function handleDeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(taskApi+"/"+id,options)
        .then((response)=>{
            return response.json();
        })
        .then(()=>{
            // var task = document.querySelector("task-"+id);
            // if(task){
            //     task.remove();
            // }
            getTasks(renderTask)
        });        
}

function renderTask(posts){
    var listblock = document.querySelector("#list-items");
    let number = 0;
    var htmls = posts.map(function(post){
        return `
            <li class="item task-${post.id}">
                ${++number}. ${post.todo}
                <div>
                    <button class="delete" onclick="handleDeleteCourse(${post.id})">&times;</button>
                </div>
            </li>
        `
    });
    listblock.innerHTML = htmls.join('');
}

function handleCreateForm(){
    var btn = document.querySelector(".btn");
    btn.onclick = function(){
        var todo = document.querySelector('input[name="todo"]').value;

        if(todo.length > 0){
            var form = {
                todo: todo
            };
    
            createTask(form,()=>{
                getTasks(renderTask);
                
            });
            document.querySelector('input[name="todo"]').value = "";
        }
        
    }
    
}

document.addEventListener("keydown",(e)=>{
    if(e.code=="Enter"){
        var todo = document.querySelector('input[name="todo"]').value;

        if(todo.length > 0){
            var form = {
                todo: todo
            };

            createTask(form,()=>{
                getTasks(renderTask);
            });
            document.querySelector('input[name="todo"]').value = "";
        }
    }
})
