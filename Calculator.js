//Basic calculator  for two number

import promptSync from "prompt-sync";

const prompt = promptSync();

const num = parseInt(prompt("Enter first number: "));
const operator = prompt("Enter operator (+, -, *, /): ");
const num2 = parseInt(prompt("Enter second number: "));

function calculator(num, operator, num2) {
    switch (operator) {
        case '+':
            return num + num2;
        case '-':
            return num - num2;
        case '*':
            return num * num2;
        case '/':
            if (num2 === 0) {
                console.log("Error: Division by zero is not allowed.");
                return null;
            }
            return num / num2;
        default:
            console.log("Error: Invalid operator.");
            return null;
    }
}

let result = calculator(num, operator, num2);
console.log("Result:", result);


 

/* how to Readline
readdata.question("what your age:",answer=>{
    console.log(`my age:${answer}`)
readdata.close()
})


readdata.question('num1:',num=>{
readdata.question('num2:',num2=>{

const sum = parseFloat(num) + parseFloat(num2);

console.log(sum)
readdata.close()
});
});


*/

// calculator using readline 
import readline from 'readline'


const readdata=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
readdata.question("num1:",num=>{
    readdata.question("operator:",operator=>{
    readdata.question("num2:",num2=>{
    
        function calculator(num, operator, num2) {
            const number_1=parseFloat(num)
            const number_2=parseFloat(num2)
            switch (operator) {
                case '+':
                    return (number_1) + (number_2);
                case '-':
                    return (number_1) - (number_2);
                case '*':
                    return (number_1) * (number_2);
                case '/':
                    if (number_2 === 0) {
                        console.log("Error: Division by zero is not allowed.");
                        return null;
                    }
                    return number_1 / number_2;
                default:
                    console.log("Error: Invalid operator.");
                    return null;
            }
        }
    
        let result = calculator(num, operator, num2);
    console.log("Result:", result);
    })    
    })
    })


    // code for doing multiple multiple operation

    readdata.question("Enter a mathematical expression: ", expression => {
        try {
            // Use Function() for safe evaluation
            const result = new Function(`return ${expression}`)();
            console.log("Result:", result);
        } catch (error) {
            console.log("Error: Invalid expression. Please enter a valid mathematical operation.");
        }
    
        readdata.close();
    });