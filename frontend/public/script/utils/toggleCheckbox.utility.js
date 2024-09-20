function toggleCheckbox(checkboxContainer, pressedKey){
    /**
     * Enables checkbox selection with `Enter` key press
     * NOTE: The `checkboxContainer` MUST be an `HTMLElement`
     */
    if(pressedKey !== 'Enter' || !(checkboxContainer instanceof HTMLElement)) return;
    const checkbox = checkboxContainer.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
}