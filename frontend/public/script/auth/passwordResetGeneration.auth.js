const passwordResetForm = document.querySelector('#passwordResetForm');

passwordResetForm.onsubmit = async (e) => {
    e.preventDefault();
    clearFormErrorMessages(passwordResetForm, false);
    let userData = formDataToObject(new FormData(passwordResetForm));
    try{
        await validatePasswordResetGeneration(userData);
    }catch(err){
        showFormValidationErrors(passwordResetForm, err);
        return;
    }
    await requestNewPasswordResetCode(userData.email);
}

async function requestNewPasswordResetCode(userEmail){
    /**
     * Generates a new password reset code for a defined user
     * NOTE: The `userEmail` parameter MUST be a `String`
     */
    try{
        displayMessage('Generating password reset code. Please wait.', 'info');
        const fetchResult = await fetchFromServer('/user/reset/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email: String(userEmail) }),
            credentials: "include"
        });
        const { jsonRes } = fetchResult;
        if(jsonRes.validationErrors){
            showFormValidationErrors(passwordResetForm, jsonRes.validationErrors);
            return;
        }
        if(!fetchResult.successful) throw new Error(jsonRes.message);
        displayMessage(jsonRes.message, 'success');
    }catch(err){
        displayMessage(err.message, 'error');
    }
}