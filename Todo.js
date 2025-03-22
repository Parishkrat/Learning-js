import { log } from "console";
import readline from "readline";
import fs from "fs";

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const tasksFile = "tasks.json"; 

let todos = [];
if (fs.existsSync(tasksFile)) {
  const data = fs.readFileSync(tasksFile, "utf-8");
  todos = JSON.parse(data);
}

const showMenu=()=>{
  console.log("1:Add Task ");
  console.log("2:View Task");
  console.log("3:exit");
  rl.question("\nchoose an option: ", handleInput)
}

const handleInput=(option)=>{
if(option=== "1"){
    rl.question("enter the Task:",(task)=>{
        todos.push(task);
        console.log("Task added: ",task);
        saveToFile();
        showMenu()
    })}
    else if(option==="2"){
        console.log("\n Your to do Lists");
        todos.forEach((task,index)=>{
            console.log(`${index+1}:${task}\n`);
        })
        showMenu ()
    }
    else if(option==="3"){
        console.log("good bye")
    rl.close();
    }else{
        console.log("Invalid option.please try again")
        showMenu();
    }
}


const saveToFile = () => {
    fs.writeFileSync(tasksFile, JSON.stringify(todos, null, 2), "utf-8");
  };

showMenu();

