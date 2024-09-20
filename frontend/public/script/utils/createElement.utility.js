function createElement(elementName, attributes = {}, classes = []){
    /**
     * Creates an element with the given `elementName` and additional `attributes` and `classes` names
     * The `attributes` parameter should be an Object with the attribute name as key and the relative value as Object value
     * The `classes` parameter should be an Array with all the classes names as values
     * Returns an instance of the chosen `elementName` element
     * NOTE: The `attributes` parameter must be an `Object` and `classes` MUST be an `Array`
     */
    const element = document.createElement(String(elementName));
    if(isObject(attributes)){
        // Applying all attributes to the new element
        for(const [name, value] in Object.entries(attributes)){
            element.setAttribute(name, value);
        }
    }
    if(Array.isArray(classes)){
        element.classList.add(...classes);
    }
    return element;
}