import { MinHeap } from "./MinHeap.js"

export class Graph{
    count = 0 
    indegree = []
    list = {}
    addVertex(v){
        if(!this.list[v]){
            this.count++
            this.indegree[v] = 0 
            this.list[v] = []
        }
    }
    addEdge(u,v,w){
        let temp = [v,w]
        this.addVertex(u)
        this.addVertex(v)
        this.indegree[v]++
        this.list[u].push(temp)

        
    }
    hasCycle(){
        const queue = []
        let count = 0 
        const indegree = [...this.indegree]
        for(let i = 0 ; i< indegree.length;++i){
            if(indegree[i]===0){
                queue.push(i)
            }
        }

        while(queue.length){
            const vertex = queue.shift()
            count++
            const neighbors = this.list[vertex]
            for(let course of neighbors){
                indegree[course[0]]--
                if(indegree[course[0]] === 0){
                    queue.push(course[0])
                }

            }
        }   
        return count !== this.count
    }
    shortestPath(start, end){
        let result = [] 
        const costs = {}
        const visited = new Set()
        const queue = new MinHeap()
        for(let i in this.list){
            costs[i] = Infinity
        }
        costs[start] = 0
        queue.insert(start,0)
        while(!queue.isEmpty()){
            const {city:u , weight:cost} = queue.extract()
            if(visited.has(u)) continue
            visited.add(u)
            result.push(u)
            if(u === end){
                return visited 
            }
            for(let v = 0 ; v < this.list[u].length;++v){
                if(cost + this.list[u][v][1] < costs[this.list[u][v][0]]){
                    costs[this.list[u][v][0]] = cost + this.list[u][v][1]
                    queue.insert(this.list[u][v][0],costs[this.list[u][v][0]])
                }
            }

        }
        return result
    }
    
}
let g = new Graph()
g.addEdge(1, 2, 1)
g.addEdge(1, 3, 2)
g.addEdge(2, 4, 5)
g.addEdge(3, 4, 1)

console.log(g.shortestPath(1, 4))