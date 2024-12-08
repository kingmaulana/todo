// index.js
import "./style.css"
import { greeting } from "./greeting.js";
import { format, compareAsc } from "date-fns"


class Todo {
    constructor(id, title, description, dueDate, priority) {
        this.id = id
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority
    }
}


function todoController() {
    let storageTodo = [];

    const addTodo = (title, description, dueDate, priority) => {
        let id = 1
        if(storageTodo.length > 0) {
            id = storageTodo[storageTodo.length - 1].id + 1
        }
        storageTodo.push(new Todo(id, title, description, dueDate, priority))
        console.log(storageTodo);
        
    }

    const getTodos = () => storageTodo;
    
    function deleteItem(id) {
        for(let i = 0; i < storageTodo.length; i++) {
            if(storageTodo[i].id === Number(id)) {
                storageTodo.splice(i, 1)
            }
        }
    }

    function editItem(id) {
        let item = {}
        for(let i = 0; i < storageTodo.length; i++) {
            if(storageTodo[i].id === Number(id)) {
                item = storageTodo[i]
                break
            }
        }
        return item;
    }

    function updateDataTodo(item) {
        for(let i = 0; i < storageTodo.length; i++) {
            if(storageTodo[i].id === Number(item.id)) {
                storageTodo[i].title = item.title
                storageTodo[i].description = item.description
                storageTodo[i].dueDate = item.dueDate
                storageTodo[i].priority = item.priority
                break
            }
        }
        console.log(storageTodo);
        
    }

    return { addTodo, getTodos, deleteItem, editItem, updateDataTodo }
}


function displayScreenTodo(controller) {
    const title = document.querySelector('#title')
    const description = document.querySelector('#desc')
    const dueDate = document.querySelector('#date')
    const priority = document.querySelectorAll('.priority')
    const submitBtn = document.querySelector('#submitData')
    const showList = document.querySelector('.listItem')
    const editTodo = document.querySelector('.todo-edit')

    
    //when user click priority button
    let priorityChoice;
    priority.forEach((button) => {
        button.addEventListener('click', function() {
            priorityChoice = button.value
        })
    });

    submitBtn.addEventListener('click', function(e) {        
        e.preventDefault()
        
        if(title.value && description.value && dueDate.value && priorityChoice) {
            controller.addTodo(title.value, description.value, dueDate.value, priorityChoice)
            displayList(); // Refresh the displayed list
            title.value = ""; // Clear input fields
            description.value = "";
            dueDate.value = "";
            priority.value = "";
        } else {
            alert('please input all fields')
        }
    })

    function displayList() {
        showList.innerHTML = ''
        
        controller.getTodos().forEach((item) => {
            let divList = document.createElement('div')
            divList.innerHTML += `<ul>
                <li>${item.title}</li>
                <li>${item.description}</li>
                <li>${item.dueDate}</li>
                <li>${item.priority}</li>
                <li><button class="btn-delete" uniqueid=${item.id}>Delete</button></li>
                <li><button class="btn-edit" uniqueid=${item.id}>Update</button></li>
            </ul>`
            showList.appendChild(divList)
        });

        //the delete button only able detect after its create with DOM
        //so we attach the dom here
        document.querySelectorAll('.btn-delete').forEach((button) => {
            button.addEventListener('click', function () {
                controller.deleteItem(button.attributes.uniqueid.value);
                displayList();
            });
        });

        document.querySelectorAll('.btn-edit').forEach((button) => {
            button.addEventListener('click', function() {
                const item = controller.editItem(button.attributes.uniqueid.value)
                showEditTodo(item)
                showList.classList.add('hidden')
                editTodo.classList.remove('hidden')
                
            });
        });
    }

    function showEditTodo(item) {
        
        const title = document.querySelector('.title');
        const update = document.querySelector('.update-input')
        title.innerText = `Edit ${item.title}`;
        update.innerHTML = `
        <form action="">
            <label for="title">Title </label>
            <input type="text" id="titles" name="title" value=${item.title} ><br>

            <label for="desc">Description </label>
            <input type="text" id="descs" name="desc" value=${item.description}><br>

            <label for="date">Due date </label>
            <input type="date" id="dates" name="date" value=${item.dueDate}><br>

             <div class="priority-option">
                <label for="priority">Priority </label>
                <input class="priority" type="button" value="High">
                <input class="priority" type="button" value="Medium">
                <input class="priority" type="button" value="Low">
            </div>

            <button type="submit" id="btn-update-data">Update</button>
        </form>`

        const titles = document.querySelector('#titles')
        const descs = document.querySelector('#descs')
        const dates = document.querySelector('#dates')
        const priorityOption = document.querySelectorAll('.priority')

        let priorityChoice;
        priorityOption.forEach((button) => {
            button.addEventListener('click', function() {
                priorityChoice = button.value
            })
        });

        document.querySelector('#btn-update-data').addEventListener('click', function(e) {
            const itemTodo = {
                id: item.id,
                title: titles.value,
                description: descs.value,
                dueDate: dates.value,
                priority: (!priorityChoice) ? item.priority : priorityChoice
            }
            e.preventDefault();
            controller.updateDataTodo(itemTodo);
            displayList();
            showList.classList.remove('hidden')
            editTodo.classList.add('hidden')
        })
    }

   return { showList, displayList }
}

const controller = todoController();
displayScreenTodo(controller);

// controller.addTodo('Beli Nasgor', 'Nasgornya 3 bungkus di pak Yamin', '12/07/2024', 'High')
// controller.addTodo('Mie Ayam', 'Mie 3 bungkus di pak Yamin', '12/07/2024', 'High')
// controller.displayTodo();
//console.log(controller);


//let oneTodo = new Todo('Beli Nasgor', 'Nasgornya 3 bungkus di pak Yamin', '12/07/2024', 'High')
//console.log(oneTodo);
