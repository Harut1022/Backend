Object.prototype.hasAllKeys = function (...keys){
    return keys.every(key=>Object.hasOwn(this,key))
}