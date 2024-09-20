async function requestNewEmailVerificationCode(pressedKey = undefined){
    if(pressedKey && pressedKey !== 'Enter') return;
    try{
        displayMessage('Generating Email verification code. Please wait', 'info');
        const fetchResult = await fetchFromServer('/user/verify/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include"
        });
        const { jsonRes } = fetchResult;
        if(!fetchResult.successful) throw new Error(jsonRes.message);
        displayMessage(jsonRes.message, 'success');
    }catch(err){
        displayMessage(err.message, 'error');
    }
}