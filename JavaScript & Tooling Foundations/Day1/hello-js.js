const appName = "Hello JavaScript!";
let count = 0;

function greet(name = "World") {
    const message = `👋 Hello, ${name}!`;
    count++;
    return message;
}

{
    const scopedMessage = "I'm inside a block!";
    console.log(scopedMessage);
}

console.log(hoistedVar);
var hoistedVar = "I'm hoisted!";

console.log(`[${appName}] Starting...`);
console.log(greet("Zaid"));
console.log("Run count:", count);

setTimeout(() => {
    console.log("This runs later (setTimeout callback)");
}, 0);

Promise.resolve().then(() => {
    console.log("This runs before setTimeout (microtask)");
});

console.log("Script end.");
