function toggleCheckbox(checkbox, pressedKey){
    /**
     * Enables checkbox selection with `Enter` key press
     */
    if(pressedKey !== 'Enter' || !(checkbox instanceof HTMLElement)) return;
    // Checking if the element that triggered the event is the checkbox or a parent of it
    if(checkbox.tagName === 'input') checkbox.checked = !checkbox.checked;
    else{
        const checkbox = checkbox.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
    }
}