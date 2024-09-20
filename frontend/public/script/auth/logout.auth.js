async function logout(pressedKey = undefined){
    if(pressedKey && pressedKey !== 'Enter') return;
    displayMessage('Logging you out. Please wait', 'info');
    try{
        const fetchResult = await fetchFromServer('/user/logout', {
            method: "POST",
            credentials: "include"
        });
        const { jsonRes } = fetchResult;
        if(!fetchResult.successful) throw new Error(jsonRes.message);
        displayMessage('Logged out successfully. You will be redirected to the homepage in 5 seconds.', 'success');
        setTimeout(() => {
            window.location.pathname = '/';
        }, 5000);
    }catch(err){
        displayMessage(err.message, 'error');
    }
}