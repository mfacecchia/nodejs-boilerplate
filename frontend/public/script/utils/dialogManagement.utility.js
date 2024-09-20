function disableDialogFocus(dialog){
    /**
     * "Removes" all the tab focusable elements property by setting their `tabindex` value to -1
     * Can be used bundled with dialog `close` event listener
     * NOTE: The `dialog` parameter MUST be an `HTMLElement`
     */
    if(!(dialog instanceof HTMLElement)) return;
    dialog.querySelectorAll('[tabindex="0"]').forEach(element => {
        element.setAttribute('tabindex', '-1');
    });
    dialog.classList.add('invisible');
    dialog.setAttribute('aria-hidden', 'true');
}

function enableDialogFocus(dialog){
    /**
     * Makes all the tab focusable elements actually focusable by setting their `tabindex` value to 0
     * Can be used bundled with dialog `showDialog` function
     * NOTE: The `dialog` parameter MUST be an `HTMLElement`
     */
    if(!(dialog instanceof HTMLElement)) return;
    dialog.classList.remove('invisible');
    dialog.setAttribute('aria-hidden', 'false');
    dialog.querySelectorAll('[tabindex="-1"]').forEach(element => {
        element.setAttribute('tabindex', '0');
    });
}