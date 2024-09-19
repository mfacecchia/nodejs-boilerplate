function displayMessage(message, type){
    /**
     * Displays an alert with a custom `message` that disappears with an animation defined in the `animate-disappear` class
     * The `type` parameter is used to define che alert background color. The accepted values are...
     * ..."primary", "success", "error", and "info".
     * However additional styles can be created by adding a custom class starting with `alert-{keyword}` in the `input.css` stylesheet
     */
    const messageContainer = createElement('div', null, ['alert', `alert-${String(type)}`, 'animate-disappear', 'text-base-100']);
    const textMessage = createElement('span');
    textMessage.textContent = String(message);
    messageContainer.onanimationend = e => {
        e.target.remove();
    }
    messageContainer.appendChild(message);
    document.querySelector('.toast').appendChild(messageContainer);
}