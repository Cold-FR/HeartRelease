const msg = document.getElementById('msg');
const submit = document.getElementById('send-chat');
const edit = document.getElementById('edit-name');
const chat = document.getElementById('chat');
const username = 'Vous êtes';
const friend = 'Heart Release';
let isTyping = false;
let delay;

window.addEventListener('load', () => {
    const intro = ['Bienvenue sur Heart Release', 'Ici, tu peux écrire tout ce que tu as sur le coeur !',
        'Avant toute chose, comment dois-je t\'appeler ?'];
    botMessage(intro[0]);
    setTimeout(() => {
        botMessage(intro[1]);
        setTimeout(() => {
            botMessage(intro[2]);
        }, 1800);
    }, 1800);
});

if (msg && submit && edit) {
    msg.addEventListener('keydown', () => {
        clearTimeout(delay);
        if (isTyping) {
            delay = setTimeout(() => {
                deleteLastOne();
                isTyping = false;
            }, 1000);
        } else {
            userMsg(`<i>${username} entrain d'écrire...</i>`);
            isTyping = true;
            delay = setTimeout(() => {
                deleteLastOne();
                isTyping = false;
            }, 1000);
        }
    });

    submit.addEventListener('click', () => {
        userMsg(msg.value);
    });

    ///edit.addEventListener('click', editName());
}

function displayMsg(content, side) {
    chat.innerHTML += `<div class="chat ${side}"><div class="text">${content}</div></div>`;
    [...chat.children].forEach((div) => {
        const lastMsg = chat.children[chat.childElementCount - 1];
        if (div !== lastMsg) div.style.animation = 'none';
    });
    chat.scrollTop = chat.scrollHeight;
}

function userMsg(content, bot) {
    const value = content.replaceAll(' ', '');
    if (value !== '') {
        let side = 'right';
        if (bot) side = 'left';
        msg.value = '';
        if(isTyping){
            clearTimeout(delay);
            deleteLastOne();
            isTyping = false;
            setTimeout(() => {
                displayMsg(content, side);
            }, 500);
        } else {
            displayMsg(content, side);
        }
    }
}

function botMessage(content) {
    userMsg(`<i>${friend} est entrain d'écrire...</i>`, true);
    setTimeout(() => {
        deleteLastOne();
        setTimeout(() => {
            return userMsg(content, true);
        }, 500);
    }, 800);
}

function deleteLastOne() {
    const messages = chat.children;
    const lastMsg = messages[chat.childElementCount - 1];
    let side = 'right';
    if (lastMsg) {
        lastMsg.className.split(' ')[1] === 'left' ? side = 'left' : side = 'right';
        lastMsg.style.animation = `tchat${side}out .5s forwards`;
        setTimeout(() => {
            lastMsg.remove();
        }, 500);
    }
}