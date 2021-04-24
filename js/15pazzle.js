onload = function () {
    const defaultPanels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "　"];
    let panels;
    let inplay = false;
    function initialize() {
        panels = Array.from(defaultPanels);
        createPazzleElement();
        addStartButton();
        drawPanel();
    }
    function createPazzleElement() {
        const elemet = document.getElementById('pazzle-wrap');
        if (!elemet) {
            const body = document.body;
            const wrap = document.createElement('div');
            wrap.id = 'pazzle-wrap';
            const title = document.createElement('div');
            title.id = 'pazzle-title';
            title.innerText = '15パズル';
            wrap.appendChild(title);
            const frame = document.createElement('div');
            frame.id = 'pazzle-frame';
            for (let i = 0; i < 16; i++) {
                const panel = document.createElement('div');
                panel.id = `panel-${i}`;
                panel.className = 'pazzle-panel';
                frame.appendChild(panel);
            }
            wrap.appendChild(frame);
            body.appendChild(wrap);
        }
    }
    function addStartButton() {
        const wrap = document.getElementById('pazzle-wrap');
        const buttonWrap = document.createElement('div');
        buttonWrap.className = 'start-button';
        const startButton = document.createElement('button');
        startButton.id = 'start-button';
        startButton.innerText = 'Start!';
        startButton.addEventListener('click', async () => {
            await gameStart();
        });
        buttonWrap.appendChild(startButton);
        wrap.appendChild(buttonWrap);
    }
    function removeStartButton() {
        let startButton = document.getElementById('start-button');
        startButton.remove();
    }
    function gameStart() {
        return new Promise(() => {
            addPopUpText('GAME START!');
            addPanelHandler();
            shufflePanel();
            removeStartButton();
            inplay = true;
        });
    }
    function gameResult() {
        if (!inplay) {
            return;
        }
        let result = false;
        let count = 0;
        for (let i = 0; i < 16; i++) {
            if (panels[i] === defaultPanels[i]) {
                count++;
            }
            if (count === 15) {
                result = true;
            }
        }
        if (result) {
            addPopUpText('GAME OVER!');
            initialize();
            removePanelHandler();
        }
    }
    function addPopUpText(text) {
        const frame = document.getElementById('pazzle-frame');
        const popText = document.createElement('div');
        popText.innerText = text;
        popText.className = 'poptext';
        frame.appendChild(popText);
        setTimeout(() => {
            popText.remove();
        }, 5000);
    }
    const panelHandler = (event) => {
        const select = parseInt(event.target.id.replace('panel-', ''), 10);
        changePanel(select);
        setTimeout(() => {
            gameResult();
        });
    };
    function addPanelHandler() {
        let elements = document.getElementsByClassName('pazzle-panel');
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', panelHandler);
        }
    }
    function removePanelHandler() {
        let elements = document.getElementsByClassName('pazzle-panel');
        for (let i = 0; i < elements.length; i++) {
            elements[i].removeEventListener('click', panelHandler);
        }
    }
    function changePanel(select) {
        const panel = document.getElementsByClassName('blank-panel')[0];
        if (panel) {
            const blank = parseInt(panel.id.replace('panel-', ''), 10);
            if (select === 0) {
                if (1 === blank) {
                    exchange(select, blank);
                } else if (4 === blank) {
                    exchange(select, blank);
                }
            } else if (select === 1 || select === 2) {
                if (select - 1 === blank) {
                    exchange(select, blank);
                } else if (select + 1 === blank) {
                    exchange(select, blank);
                } else if (select + 4 === blank) {
                    exchange(select, blank);
                }
            } else if (select === 3) {
                if (2 === blank) {
                    exchange(select, blank);
                } else if (7 === blank) {
                    exchange(select, blank);
                }
            } else if (select === 4 || select === 8) {
                if (select - 4 === blank) {
                    exchange(select, blank);
                } else if (select + 1 === blank) {
                    exchange(select, blank);
                } else if (select + 4 === blank) {
                    exchange(select, blank);
                }
            } else if (select === 5 || select === 6 || select === 9 || select === 10) {
                if (select - 1 === blank) {
                    exchange(select, blank);
                } else if (select - 4 === blank) {
                    exchange(select, blank);
                } else if (select + 1 === blank) {
                    exchange(select, blank);
                } else if (select + 4 === blank) {
                    exchange(select, blank);
                }
            } else if (select === 7 || select === 11) {
                if (select - 1 === blank) {
                    exchange(select, blank);
                } else if (select - 4 === blank) {
                    exchange(select, blank);
                } else if (select + 4 === blank) {
                    exchange(select, blank);
                }
            } else if (select === 12) {
                if (8 === blank) {
                    exchange(select, blank);
                } else if (13 === blank) {
                    exchange(select, blank);
                }
            } else if (select === 13 || select === 14) {
                if (select - 1 === blank) {
                    exchange(select, blank);
                } else if (select - 4 === blank) {
                    exchange(select, blank);
                } else if (select + 1 === blank) {
                    exchange(select, blank);
                }

            } else if (select === 15) {
                if (14 === blank) {
                    exchange(select, blank);
                } else if (11 === blank) {
                    exchange(select, blank);
                }
            }
        }
        drawPanel();
    }
    function exchange(select, blank) {
        const tmp = panels[select];
        panels[select] = "　";
        panels[blank] = tmp;
    }
    function drawPanel() {
        let elements = document.getElementsByClassName('pazzle-panel');
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerText = panels[i];
            if (elements[i].innerText === "　") {
                elements[i].classList.add('blank-panel');
            } else {
                elements[i].classList.remove('blank-panel');
            }
        }
    }
    function shufflePanel() {
        const difficulty = 1000;
        for (let i = 0; i < difficulty; i++) {
            const random = Math.floor(Math.random() * 15);
            changePanel(random);
        }
    }
    initialize();
}