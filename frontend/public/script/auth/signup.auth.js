const signupForm = document.querySelector('#signupForm');

signupForm.onsubmit = async (e) => {
    e.preventDefault();
    clearFormErrorMessages(signupForm, false);
    let newUserData = formDataToObject(new FormData(signupForm));
    try{
        await validateSignup(newUserData);
    }catch(err){
        showFormValidationErrors(signupForm, err);
        return;
    }
    displayMessage('Signing you up. Please wait.', 'info');
    try{
        const fetchResult = await fetchFromServer('/user/signup/credentials', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newUserData)
        });
        const { jsonRes } = fetchResult;
        // Backend validation not passed
        if(jsonRes.validationErrors){
            showFormValidationErrors(signupForm, jsonRes.validationErrors);
            return;
        }
        if(!fetchResult.successful) throw new Error(jsonRes.message);
        displayMessage(jsonRes.message, 'success');
        // Redirecting to login page in case of successful signup
        setTimeout(() => {
            window.location.pathname = '/login';
        }, 5000);
    }catch(err){
        displayMessage(err.message, 'error');
    }
}