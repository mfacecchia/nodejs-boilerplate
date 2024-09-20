async function isLoggedIn(){
    try{
        const fetchResult = await fetchFromServer('/user/login/credentials', {
            method: "POST",
            credentials: "include"
        });
        if(!fetchResult.successful){
            if(!['/login', '/signup'].includes(window.location.pathname)) window.location.pathname = '/login';
            setTimeout(() => {
                removeLoadingScreen();
            }, 200);
            return;
        }
    }catch(err){
        displayMessage(err.message, 'error');
        setTimeout(() => {
            window.location.pathname = '/';
        }, 500);
        return;
    }
    // Valid JWT
    if(['/login', '/signup'].includes(window.location.pathname)) window.location.pathname = '/user/dashboard';
    setTimeout(() => {
        removeLoadingScreen();
    }, 500);
    return;
}

isLoggedIn();