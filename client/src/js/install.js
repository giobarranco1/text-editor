const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    
    //store triggered events
    window.defferedPrompt = event;

    //remove the hidden class button
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
   
    const promptEvent = window.deferredPrompt;
    if(!promptEvent) {
        return;
    }

    //show prompt
    promptEvent.prompt();

    //reset the deffered prompt varible it can only be used once
    window.defferedPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    //clear prompt
    window.defferedPrompt = null;
});
