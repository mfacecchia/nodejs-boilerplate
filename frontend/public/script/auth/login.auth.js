const loginForm = document.querySelector('#loginForm');

loginForm.onsubmit = async (e) => {
    e.preventDefault();
    clearFormErrorMessages(loginForm, false);
    let userData = formDataToObject(new FormData(loginForm));
    try{
        await validateLogin(userData);
        // Overwriting the Object with the sanitized data version
    }catch(err){
        showFormValidationErrors(loginForm, err);
        return;
    }
    try{
        const fetchResult = await fetchFromServer('/user/login/credentials', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userData),
            credentials: "include"
        });
        const { jsonRes } = fetchResult;
        // Backend validation not passed
        if(jsonRes.validationErrors){
            showFormValidationErrors(loginForm, jsonRes.validationErrors);
            return;
        }
        if(!fetchResult.successful) throw new Error(jsonRes.message);
        // Redirecting to homepage after successful authentication
        window.location.href = '/user/dashboard';
    }catch(err){
        displayMessage(err.message || 'Could not fetch data. Please try again later.', 'error');
    }
}