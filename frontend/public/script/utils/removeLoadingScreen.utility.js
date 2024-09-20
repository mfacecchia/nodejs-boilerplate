function removeLoadingScreen(){
    document.querySelector('body').removeAttribute('inert');
    document.querySelector('.loadingBackdrop').style.display = "none";
}