const edit = document.getElementById('edit-name');
if (edit) {
    edit.addEventListener('click', () => {
        if (introEnd) {
            editState = 1;
            msg.disabled = true;
            botSubmit('Que souhaites-tu modifier ?');
            setTimeout(() => {
                botSubmit('Envoie "Moi" si tu souhaites modifier ton nom d\'utilisateur.<br/>Envoie "Bot" si tu souhaites modifier mon nom.' +
                    '<br/>Ou bien envoie "Annuler" à tout moment si tu souhaites annuler la modification.');
                setTimeout(() => {
                    msg.disabled = false;
                    msg.focus();
                    waitRep = setInterval(() => {
                        if (editState === 2) {
                            clearInterval(waitRep);
                            botSubmit('Bien ! Envoie ton nouveau nom d\'utilisateur.');
                            endEdit();
                        } else if (editState === 3) {
                            clearInterval(waitRep);
                            botSubmit('Bien ! Envoie mon nouveau nom d\'utilisateur.');
                            endEdit();
                        }
                    }, 1600);
                }, 1600);
            }, 1600);
        }
    });

    function endEdit() {
        setTimeout(() => {
            msg.disabled = false;
            msg.focus();
            waitRep = setInterval(() => {
                setTimeout(() => {
                    if (editState === 4) {
                        clearInterval(waitRep);
                        botSubmit('Les modifications ont bien été apportées.');
                        editState = 0;
                    }
                }, 1600);
            }, 1600);
        }, 1600);
    }
}