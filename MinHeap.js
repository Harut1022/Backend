export class MinHeap{
    heap= []
    insert(item,priority){
        this.heap.push({city:item,weight:priority})
        this.heapifyUp(this.size()-1)
        return this.heap
    }
    heapifyUp(i){
        let current = i
        while(current> 0){
            let parent = Math.floor((current - 1)/2)
            if(this.heap[current].weight < this.heap[parent].weight){
                this.swap(current,parent)
            }
            current = parent
        }
        return this.heap
    }
    heapifyDown(i){
        let parent = i
        while(parent < Math.floor(this.size()/2)-1){
            let minchild = this.heap[(2 * parent) + 1].weight<this.heap[(2*parent)+2].weight?(2 * parent) + 1:(2 * parent) + 2
            if(this.heap[minchild].weight < this.heap[parent].weight){
                this.swap(minchild,parent)
            }
            parent = minchild
        }
        return this.heap 
    }
    
    peak(){
        return this.heap[0]
    }
    extract(){
        this.swap(0,this.size()-1)
        const first = this.heap.pop()
        this.heapifyDown(0)
        return first??0
    }
    size(){
        return this.heap.length 
    }
    swap(i,j){
        ;[this.heap[i],this.heap[j]] = [this.heap[j],this.heap[i]]

    }
    isEmpty(){
        return !this.heap.length
    }

}


let heap = new MinHeap()
console.log(heap.isEmpty())
heap.insert(17,15)
heap.insert(17,13)
heap.insert(17,19)
heap.insert(17,18)
heap.insert(17,26)
heap.insert(17,7)
heap.insert(17,63)
console.log(heap.extract())
console.log(heap.isEmpty())