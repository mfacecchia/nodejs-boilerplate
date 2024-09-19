function formDataToObject(formData, fieldsFilterArr = []){
    /**
     * Converts a `FormData` instanced value to an `Object`
     * The `fieldsFilterArr` is used to obtain only the values of certain keys (or fields name)
     * NOTE: The `fieldsFilterArr` parameter MUST be an `Array`
     */
    if(!(formData instanceof FormData)) return;
    const formDataObject = {};
    if(Array.isArray(fieldsFilterArr) && fieldsFilterArr.length){
        fieldsFilterArr.forEach(field => {
            formDataObject[field] = formData.get(field);
        });
    }
    else{
        for(const field of formData.keys()){
            formDataObject[field] = formData.get(field);
        }
    }
    return formDataObject;
}