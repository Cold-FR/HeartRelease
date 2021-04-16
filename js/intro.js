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
    let timeOut;
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
                waitRep = setInterval(() => {
                    if (introState === 2) {
                        clearInterval(waitRep);
                        msg.disabled = true;
                        setTimeout(() => {
                            botSubmit(`Enchanté ${username}, moi c'est ${friend} ! Mais je peux changer de nom si tu le désires.`);
                            setTimeout(() => {
                                botSubmit(intro[3]);
                                setTimeout(() => {
                                    msg.disabled = false;
                                    msg.focus();
                                    introState = 3;
                                    waitRep = setInterval(() => {
                                        if (introState === 4) {
                                            clearInterval(waitRep);
                                            msg.disabled = true;
                                            friend === '<b>Heart Release</b>' ? botSubmit(intro[4]) : botSubmit(`Parfait ! Je m'appellerai donc désormais ${friend}.`);
                                            setTimeout(() => {
                                                document.getElementById('skip-intro').style.animation = 'lazy .1s forwards';
                                                setTimeout(() => {
                                                    if (!introEnd) {
                                                        botSubmit(intro[5]);
                                                        timeOut = setTimeout(() => {
                                                            botSubmit(intro[6]);
                                                            timeOut = setTimeout(() => {
                                                                botSubmit(intro[7]);
                                                                timeOut = setTimeout(() => {
                                                                    botSubmit(intro[8]);
                                                                    timeOut = setTimeout(() => {
                                                                        botSubmit(intro[9]);
                                                                        timeOut = setTimeout(() => {
                                                                            botSubmit(intro[10]);
                                                                            timeOut = setTimeout(() => {
                                                                                botSubmit(intro[11]);
                                                                                timeOut = setTimeout(() => {
                                                                                    msg.disabled = false;
                                                                                    msg.focus();
                                                                                    edit.style.cursor = 'pointer';
                                                                                    document.getElementById('skip-intro').style.animation = '';
                                                                                    document.getElementById('skip-intro').style.opacity = '0';
                                                                                    timeOut = setTimeout(() => {
                                                                                        document.getElementById('skip-intro').style.display = 'none';
                                                                                        introEnd = true;
                                                                                    }, 100);
                                                                                }, 1600);
                                                                            }, 2000);
                                                                        }, 3000);
                                                                    }, 3000);
                                                                }, 3000);
                                                            }, 3000);
                                                        }, 3000);
                                                    }
                                                }, 100);
                                            }, 2000);
                                        }
                                    }, 1000);
                                }, 2000);
                            }, 2000);
                        }, 1600);
                    }
                }, 1000);
            }, 2000);
        }, 2000);
    }, 2000);

    document.getElementById('skip-intro').addEventListener('click', () => {
        if (!introEnd) {
            clearTimeout(timeOut);
            document.getElementById('skip-intro').style.animation = '';
            document.getElementById('skip-intro').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('skip-intro').style.display = 'none';
                botSubmit('Oups, je parle beaucoup, pardonne-moi !');
                setTimeout(() => {
                    botSubmit('Une dernière chose, si à un moment tu souhaites que je te propose des conseils, envoie "HELP". Sur ce, bonne session à toi !');
                    setTimeout(() => {
                        msg.disabled = false;
                        msg.focus();
                        edit.style.cursor = 'pointer';
                        introEnd = true;
                        introState = 5;
                    }, 1600);
                }, 1600);
            }, 100);
        }
    });
});