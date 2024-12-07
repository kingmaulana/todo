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
        
    }

    const getTodos = () => storageTodo;
    
    function deleteItem(id) {
        for(let i = 0; i < storageTodo.length; i++) {
            if(storageTodo[i].id === Number(id)) {
                storageTodo.splice(i, 1)
            }
        }
    }

    return { addTodo, getTodos, deleteItem }
}


function displayScreenTodo(controller) {
    const title = document.querySelector('#title')
    const description = document.querySelector('#desc')
    const dueDate = document.querySelector('#date')
    const priority = document.querySelector('#priority')
    const submitBtn = document.querySelector('#submitData')
    const showList = document.querySelector('.listItem')

    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault()
        if(title.value && description.value && dueDate.value && priority.value) {
            controller.addTodo(title.value, description.value, dueDate.value, priority.value)
            displayList(); // Refresh the displayed list
            title.value = ""; // Clear input fields
            description.value = "";
            dueDate.value = "";
            priority.value = "";
        } else {
            alert('please impurt all fields')
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
            </ul>`
            showList.appendChild(divList)
        });

        //the delete button only able detect after its create with DOM
        // so we attach the dom here
        document.querySelectorAll('.btn-delete').forEach((button) => {
            button.addEventListener('click', function () {
                controller.deleteItem(button.attributes.uniqueid.value);
                displayList();
            });
        });
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
