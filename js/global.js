const msg = document.getElementById('msg');
const submit = document.getElementById('send-chat');
const edit = document.getElementById('edit-name');
const chat = document.getElementById('chat');
let username = '<b>Vous</b>';
let friend = '<b>Heart Release</b>';
let userTyping = document.getElementById('typing-user');
let botTyping = document.getElementById('typing-bot');
let isTyping = false;
let delay;
let introEnd = false;
let introState = 0;

window.addEventListener('load', () => {
    const intro = [
        'Bienvenue sur <b>Heart Release</b> !',
        'Ici, tu peux écrire tout ce que tu as sur le cœur !',
        'Avant toute chose, comment dois-je t\'appeler ?',
        'Si tu souhaites que je change de nom, envoie le nom que tu désires me donner. Sinon, envoie "<b>Non</b>".',
        'Bien ! Je ne change pas alors.',
        'Maintenant que les présentations ont été faites, laisse-moi t\'expliquer ce qu\'est <b>Heart Release</b>.',
        '<b>Heart Release</b> est un site de simulation de tchat. Il te permet de simuler une conversation avec ' +
        'la personne de ton choix, sous les traits de tes applications de messageries favorites !',
        'Ce site a été produit selon l\'hypothèse que mettre des mots sur ses problèmes peut aider à avancer. ' +
        'Il a donc un but psychologique, mais il peut tout à faire être utilisé dans d\'autres circonstances !',
        'Comme se préparer à une conversation avec quelqu\'un, par exemple.',
        'Avant que je te laisse m\'utiliser, je tiens à te rassurer, <b>aucune donnée n\'est enregistrée</b>. Ni les conversations,' +
        ' ni les noms, ni les adresses IPs ne sont sauvegardés, tout est totalement anonyme.',
        'Maintenant que tu es au courant de tout, je te laisse carte blanche !',
        'Ah, j\'allais oublier ! Si à un moment tu souhaites que je te propose des conseils, envoie "<b>HELP</b>". Sur ce,' +
        ' bonne session à toi !'
    ];
    msg.disabled = true;
    botSubmit(intro[0]);
    setTimeout(() => {
        botSubmit(intro[1]);
        setTimeout(() => {
            botSubmit(intro[2]);
            setTimeout(() => {
                msg.disabled = false;
                msg.focus();
                introState = 1;
                let waitRep = setInterval(() => {
                    if(introState === 2){
                        clearInterval(waitRep);
                        msg.disabled = true;
                        botSubmit(`Enchanté ${username}, moi c'est ${friend} ! Mais je peux changer de nom si tu le désires.`);
                        setTimeout(() => {
                            botSubmit(intro[3]);
                            setTimeout(() => {
                                msg.disabled = false;
                                msg.focus();
                                introState = 3;
                                waitRep = setInterval(() => {
                                    if(introState === 4){
                                        clearInterval(waitRep);
                                        msg.disabled = true;
                                        friend === '<b>Heart Release</b>' ? botSubmit(intro[4]) : botSubmit(`Parfait ! Je m'appellerai donc désormais ${friend}.`);
                                        setTimeout(() => {
                                            botSubmit(intro[5]);
                                            setTimeout(() => {
                                                botSubmit(intro[6]);
                                                setTimeout(() => {
                                                    botSubmit(intro[7]);
                                                    setTimeout(() => {
                                                        botSubmit(intro[8]);
                                                        setTimeout(() => {
                                                            botSubmit(intro[9]);
                                                            setTimeout(() => {
                                                                botSubmit(intro[10]);
                                                                setTimeout(() => {
                                                                    botSubmit(intro[11]);
                                                                    msg.disabled = false;
                                                                    msg.focus();
                                                                    introEnd = true;
                                                                }, 2000);
                                                            }, 3000);
                                                        }, 3000);
                                                    }, 3000);
                                                }, 3000);
                                            }, 3000);
                                        }, 2000);
                                    }
                                }, 1000);
                            }, 2000);
                        }, 2000);
                    }
                }, 1000);
            }, 2000);
        }, 2000);
    }, 2000);
});

if (msg && submit && edit) {
    msg.addEventListener('keydown', (e) => {
        e.key === 'Enter' ? submitEvent() : typing('user');
    });

    submit.addEventListener('click', () => {
        submitEvent();
    });

    ///edit.addEventListener('click', editName());
}

function submitEvent() {
    userSubmit(msg.value);
    if (!introEnd) {
        if (introState === 1) {
            username = `<b>${msg.value}</b>`;
            introState = 2;
        } else if (introState === 3) {
            if (msg.value.replaceAll(' ', '').toLowerCase() !== 'non') friend = `<b>${msg.value}</b>`;
            introState = 4;
        }
    }
    if (msg.value === 'HELP') {
        setTimeout(() => {
            msg.disabled = true;
            botSubmit('EN COURS');
            setTimeout(() => {
                msg.disabled = false;
                msg.focus();
            }, 2000);
        }, 1600);
    }
    msg.value = '';
}

function typing(source = 'user') {
    const lastMsg = chat.children[chat.childElementCount - 1];
    if (botTyping !== chat.children[chat.childElementCount - 2] && userTyping !== lastMsg) {
        botTyping.remove();
        userTyping.remove();
        chat.innerHTML +=
            '<div class="chat left" id="typing-bot" style="animation: none;display: none;"><div class="text"></div></div>' +
            '<div class="chat right" id="typing-user" style="animation: none;display: none;"><div class="text"></div></div>';
        botTyping = document.getElementById('typing-bot');
        userTyping = document.getElementById('typing-user');
    }

    if (source === 'bot') {
        botTyping.innerHTML = `<div class="text"><i>${friend} est en train d'écrire...</i></div>`;
        botTyping.style.display = 'block';
        if (botTyping.style.animationName !== 'none') {
            botTyping.style.animation = 'tchatleftout .3s forwards';
            setTimeout(() => {
                botTyping.style.animation = 'none';
                botTyping.style.display = 'none';
            }, 300);
        } else if (botTyping.style.animationName === 'none') {
            botTyping.style.animation = '';
        }
    } else if (source === 'user') {
        userTyping.innerHTML = `<div class="text"><i>${username} est en train d'écrire...</i></div>`;
        userTyping.style.display = 'block';
        clearTimeout(delay);
        if (isTyping) {
            delay = setTimeout(() => {
                deleteTyping();
            }, 1300);
        } else {
            userTyping.style.animation = 'tchatright .3s forwards';
            isTyping = true;
            delay = setTimeout(() => {
                deleteTyping();
            }, 1300);
        }
    }
    chat.scrollTop = chat.scrollHeight;
}

function deleteTyping() {
    userTyping.style.animation = 'tchatrightout .3s forwards';
    setTimeout(() => {
        userTyping.style.display = 'none';
    }, 300);
    isTyping = false;
    clearTimeout(delay);
}

function displayChat(side, content) {
    botTyping.remove();
    userTyping.remove();
    chat.innerHTML += `<div class="chat ${side}"><div class="text">${content}</div></div>`;
    [...chat.children].forEach((div) => {
        const lastMsg = chat.children[chat.childElementCount - 1];
        if (div !== lastMsg) {
            div.style.animation = 'none';
            div.className.split(' ')[1] === 'left' ? div.style.left = '10px' : div.style.right = '10px';
        } /*else {
            setTimeout(() => {
                console.log('lastmsg');
                div.style.animation = 'none';
                div.className.split(' ')[1] === 'left' ? div.style.left = '10px' : div.style.right = '10px';
            }, 300);
        }*/
    });
    chat.innerHTML +=
        '<div class="chat left" id="typing-bot" style="animation: none;display: none;"><div class="text"></div></div>' +
        '<div class="chat right" id="typing-user" style="animation: none;display: none;"><div class="text"></div></div>';
    botTyping = document.getElementById('typing-bot');
    userTyping = document.getElementById('typing-user');
    chat.scrollTop = chat.scrollHeight;
}

function userSubmit(text) {
    const noSpace = text.replaceAll(' ', '');
    if (noSpace !== '') {
        if (isTyping) {
            deleteTyping();
            setTimeout(() => {
                return displayChat('right', text);
            }, 300);
        } else {
            return displayChat('right', text);
        }
    }
}

function botSubmit(message) {
    typing('bot');
    setTimeout(() => {
        typing('bot');
        setTimeout(() => {
            return displayChat('left', message);
        }, 300);
    }, 1000);
}