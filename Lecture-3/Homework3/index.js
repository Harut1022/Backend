const path = require("path")
const fs = require("fs/promises")
const source = path.join("text")
const target = path.join("result")

function randomNumber(a=0, b=150){
   return Math.floor(a + (Math.random() * b))
}
function randomExtension(){
    const extensions = ["mp3","pdf","js","html","json","ts","csv","docx","xlsm","mp4","wav","txt"]
    return extensions[randomNumber(0,extensions.length)]
}

async function createFolder(name){
    await fs.mkdir(name,{recursive:true})
    
    return name
}
async function createFile(directory){
    const filePath = path.join(directory,randomNumber()+"."+randomExtension())
    await fs.writeFile(filePath,"")

}


if(process.argv.includes("create")){
    createFolder(source)
    let files = fs.readdir(source)
    files.then((a)=>{
       for(let i = 0; i <= 150 - a.length; ++i){
        createFile(source)
       }
    
    })  

    
}else if(process.argv.includes("organize")){

    createFolder(target)
    
    fs.readdir(source).then((files)=>{
        for(let i = 0; i < files.length;++i){
            let extensions = files[i].split(".")[1]
            createFolder(path.join(target,extensions))
            fs.rename(path.join(source,files[i]),path.join(target,extensions,files[i]),()=>{
                console.log("Բարեհաջող դասավորված է")
            })
            .catch(()=>console.log("Ընդհանուր սխալ"))
        }

            
    })
        


}
    



