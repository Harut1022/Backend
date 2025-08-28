// const {readFile, read} = require("node:fs")
// readFile(__filename,()=> console.log("A"))
// setTimeout(()=>console.log("B"),0)
// readFile(__filename,()=>{
//     setTimeout(() => console.log("A"),0);
//     setImmediate(()=>console.log("B"))
// })


// queueMicrotask(()=>console.log("micro"))
// console.log("Sync");


// console.log("start")

// process.nextTick(()=>console.log("tick"))

// console.log("end")



// console.log("A")
// queueMicrotask(()=>console.log("B"))
// setTimeout(()=>console.log("C"))
// setTimeout(()=>console.log("D"))
// process.nextTick(()=>console.log("E"))
// console.log("F")

const { log } = require("console");
const fs = require("fs")

// fs.readFile(__filename,()=>{
//     process.nextTick(()=>console.log("tick"))
//     console.log("read");
    
// })


// console.log("A");
// fs.readFile(__filename,()=>{
//     setTimeout(()=>console.log("B"))
//     setImmediate(()=>console.log("C"))
//     process.nextTick(()=>console.log("D"))
//     Promise.resolve().then(()=>console.log("E"))
// })
// console.log("F")
