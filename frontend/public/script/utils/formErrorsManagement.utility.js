function showErrorMessage(field, messages){
    /**
     * Creates a validation error message below the `field` element
     * NOTE: The `field` parameter MUST be an `HTMLElement` Object and `messages` MUST be an `Array`
     */
    if(!(field instanceof HTMLElement) || !Array.isArray(messages)) return;
    field.classList.add('inputError');
    const fieldErrorsContainer = createElement('div', null, ['errorMessagesContainer'])
    // Iterating through each error message and adding it below the relative field
    messages.forEach(message => {
        // Creating the paragraph and adding message and classes
        const errorMessage = document.createElement('p', null, ['errorMessage']);
        errorMessage.textContent = String(message);
        fieldErrorsContainer.appendChild(errorMessage);
    });
    // Adding the paragraph below the input field
    field.parentNode.insertBefore(fieldErrorsContainer, field.nextSibling);
}

function clearFormErrorMessages(formElement, clearInputValues = false){
    /*
        * Clears all the form from error messages and input values (if `clearInputValues` is set to `true` (default `false`))
        * NOTE: In order for this function to correctly clear the form from errors, the error messages container...
        * ...should contain the class `errorMessagesContainer` and the field errors the class `inputError`
        * NOTE: The `formElement` parameter must be an `HTMLElement`
    */
    if(!(formElement instanceof HTMLElement)) return;
    formElement.querySelectorAll(`.errorMessagesContainer`).forEach(errorsContainer => {
        errorsContainer.remove();
    });
    // Removing error classes and relative value from all input fields and possible input containers (defined by `inputStyleContainer` class)
    formElement.querySelectorAll(`input, textarea, .inputStyleContainer:has(input, textarea)`).forEach(field => {
        field.classList.remove('inputError');
    });
    // Removing input data if `clearInputValues` variable is set to `true`, otherwise just removing error classes
    if(clearInputValues) formElement.reset();
}

function showFormValidationErrors(formElement, validationErrors){
    /**
     * Displays all form errors for all the fields not meeting the requirements from a list of `validationErrors`
     * NOTE: The `formElement` parameter MUST be an `HTMLElement` and `validationError` MUST be an `Object`
     */
    if(!(formElement instanceof HTMLElement) || !isObject(validationErrors)) return;
    for(const key of Object.keys(validationErrors)){
        // Element to display the error to can be either an input element, or an input container (`.inputStyleContainer`)
        const fieldError = formElement.querySelector(`.inputStyleContainer:has(:is(input, select, textarea)[name="${key}"])`) || formElement.querySelector(`:is(input, select, textarea)[name="${key}"]`);
        showErrorMessage(fieldError, validationErrors[key]);
    }
}