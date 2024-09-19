function isObject(value){
    /**
     * Checks if the passed `value` is an actual Object ({})
     */
    if(value !== null && typeof value === 'object' && !Array.isArray(value)) return true
    else return false;
}