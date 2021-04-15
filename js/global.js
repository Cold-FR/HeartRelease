const msg = document.getElementById('msg');
const submit = document.getElementById('send-chat');
const chat = document.getElementById('chat');
let username = '<b>Vous</b>';
let friend = '<b>Heart Release</b>';
let userTyping = document.getElementById('typing-user');
let botTyping = document.getElementById('typing-bot');
let isTyping = false;
let delay;
let introEnd = false;
let introState = 0;
let editState = 0;
let waitRep;

if (msg && submit) {
    msg.addEventListener('keydown', (e) => {
        e.key === 'Enter' ? submitEvent() : typing('user');
    });

    submit.addEventListener('click', () => {
        submitEvent();
    });
}

function submitEvent() {
    if (msg.value.replaceAll(' ', '') !== '') {
        userSubmit(msg.value);

        if (!introEnd) {
            if (introState === 1) {
                username = `<b>${msg.value}</b>`;
                introState = 2;
            } else if (introState === 3) {
                if (msg.value.replaceAll(' ', '').toLowerCase() !== 'non') friend = `<b>${msg.value}</b>`;
                introState = 4;
            }
        } else {
            edit.style.cursor = 'default';
        }

        if (editState !== 0) {
            if (msg.value.replaceAll(' ', '').toLowerCase() === 'annuler') {
                clearInterval(waitRep);
                editState = 0;
                setTimeout(() => botSubmit('Les modifications ont bien été annulées.'), 1600);
            } else {
                if (editState === 1) {
                    if (msg.value.replaceAll(' ', '').toLowerCase() === 'moi') {
                        editState = 2;
                    } else if (msg.value.replaceAll(' ', '').toLowerCase() === 'bot') {
                        editState = 3;
                    }
                } else if (editState === 2) {
                    username = `<b>${msg.value}</b>`;
                    editState = 4;
                } else if (editState === 3) {
                    friend = `<b>${msg.value}</b>`;
                    editState = 4;
                }
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
        }
    });
    chat.innerHTML +=
        '<div class="chat left" id="typing-bot" style="animation: none;display: none;"><div class="text"></div></div>' +
        '<div class="chat right" id="typing-user" style="animation: none;display: none;"><div class="text"></div></div>';
    botTyping = document.getElementById('typing-bot');
    userTyping = document.getElementById('typing-user');
    chat.scrollTop = chat.scrollHeight;
}

function userSubmit(text) {
    if (isTyping) {
        deleteTyping();
        setTimeout(() => {
            return displayChat('right', text);
        }, 300);
    } else {
        return displayChat('right', text);
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