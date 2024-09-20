const passwordResetForm = document.querySelector('#passwordResetForm');

passwordResetForm.onsubmit = async (e) => {
    e.preventDefault();
    clearFormErrorMessages(passwordResetForm, false);
    let userData = formDataToObject(new FormData(passwordResetForm));
    try{
        await validatePasswordReset(userData);
    }catch(err){
        showFormValidationErrors(passwordResetForm, err);
        return;
    }
    try{
        // Obtaining the reset token from the URL
        const url = new URLSearchParams(window.location.search);
        userData.resetCode = url.get('q');
        displayMessage('Resetting your password. Please wait.', 'info');
        const fetchResult = await fetchFromServer('/user/reset', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userData),
            credentials: "include"
        });
        const { jsonRes } = fetchResult;
        if(jsonRes.validationErrors){
            showFormValidationErrors(passwordResetForm, jsonRes.validationErrors);
            return;
        }
        if(!fetchResult.successful) throw new Error(jsonRes.message);
        displayMessage(jsonRes.message, 'success');
        setTimeout(() => {
            window.location.href = '/login';
        }, 3000);
    }catch(err){
        displayMessage(err.message, 'error');
        return;
    }
}