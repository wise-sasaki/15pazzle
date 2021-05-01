onload = function () {
    const elements = document.getElementsByClassName('pazzle-wrap');
    for (element of elements) {
        new Pazzle(element);
    }
}
class Pazzle {
    constructor(element) {
        // 正しいパネルの順番
        this.defaultPanels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "　"];
        // 操作するパネル
        this.panels;
        // 操作中フラグ
        this.inplay = false;
        // pazzle-wrap要素
        this.wrap = element;
        this.initialize();
    }
    /**
     * パズルの初期化を行う。
     */
    initialize() {
        this.panels = Array.from(this.defaultPanels);
        if (this.createPazzleElement()) {
            this.addStartButton();
            this.drawPanel();
        }
    }
    /**
     * div#pazzle-wrapのElemetが取得できる場合にパズルのDOM構造を作成する。
     * @returns パズルDOM
     */
    createPazzleElement() {
        if (this.wrap && this.wrap.tagName === 'DIV') {
            const body = document.body;
            let title = this.wrap.getElementsByClassName('pazzle-title')[0];
            if (!title) {
                title = document.createElement('div');
                title.className = 'pazzle-title';
                title.innerText = '15パズル';
                this.wrap.appendChild(title);
            }
            let frame = this.wrap.getElementsByClassName('pazzle-frame')[0];
            if (!frame) {
                frame = document.createElement('div');
                frame.className = 'pazzle-frame';
                for (let i = 0; i < 16; i++) {
                    const panel = document.createElement('div');
                    panel.classList.add(`panel-${i}`);
                    panel.classList.add('pazzle-panel');
                    frame.appendChild(panel);
                }
                this.wrap.appendChild(frame);
            }
            return this.wrap;
        }
        return null;
    }
    /**
     * パズルを開始するボタンを作成する。
     */
    addStartButton() {
        let buttonWrap = this.wrap.getElementsByClassName('start-button-wrap')[0];
        if(!buttonWrap) {
            buttonWrap = document.createElement('div');
            buttonWrap.className = 'start-button-wrap';
            this.wrap.appendChild(buttonWrap);
        }
        const startButton = document.createElement('button');
        startButton.className = 'start-button';
        startButton.innerText = 'Start!';
        startButton.addEventListener('click', async () => {
            await this.gameStart();
        });
        buttonWrap.appendChild(startButton);
        
    }
    /**
     * パズルが開始された後にボタンを削除する。
     */
    removeStartButton() {
        let startButton = this.wrap.getElementsByClassName('start-button')[0];
        startButton.remove();
    }
    /**
     * パズルを開始する。
     * @returns 同期処理
     */
    gameStart() {
        return new Promise(() => {
            this.addPopUpText('GAME START!');
            this.addPanelHandler();
            this.shufflePanel();
            this.removeStartButton();
            this.inplay = true;
        });
    }
    /**
     * パズルの終了を判定する。
     */
    gameResult() {
        if (!this.inplay) {
            return;
        }
        let result = false;
        let count = 0;
        for (let i = 0; i < 16; i++) {
            if (this.panels[i] === this.defaultPanels[i]) {
                count++;
            }
            if (count === 15) {
                result = true;
            }
        }
        if (result) {
            this.addPopUpText('GAME OVER !');
            this.initialize();
            this.removePanelHandler();
        }
    }
    /**
     * パズル開始・終了時に表示されるポップアップテキストの表示・削除を行う。
     * @param text 表示するテキスト
     */
    addPopUpText(text) {
        const frame = this.wrap.getElementsByClassName('pazzle-frame')[0];
        const popText = document.createElement('div');
        popText.innerText = text;
        popText.className = 'poptext';
        frame.appendChild(popText);
        setTimeout(() => {
            popText.remove();
        }, 5000);
    }
    /**
     * パネル操作のイベントハンドラー
     */
    panelHandler = (event) => {
        const select = parseInt(event.target.classList[0].replace('panel-', ''), 10);
        this.changePanel(select);
        setTimeout(() => {
            this.gameResult();
        });
    };
    /**
     * パネル操作のイベントハンドラーを設定する。
     */
    addPanelHandler() {
        let elements = this.wrap.getElementsByClassName('pazzle-panel');
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', this.panelHandler);
        }
    }
    /**
     * パネル操作のイベントハンドラーを削除する。
     */
    removePanelHandler() {
        let elements = this.wrap.getElementsByClassName('pazzle-panel');
        for (let i = 0; i < elements.length; i++) {
            elements[i].removeEventListener('click', this.panelHandler);
        }
    }
    /**
     * パネルの入れ替え判定を行う。
     * @param select 選択したパネルの番号
     */
    changePanel(select) {
        const panel = this.wrap.getElementsByClassName('blank-panel')[0];
        if (panel) {
            const blank = parseInt(panel.classList[0].replace('panel-', ''), 10);
            if (select === 0) {
                if (1 === blank) {
                    this.exchange(select, blank);
                } else if (4 === blank) {
                    this.exchange(select, blank);
                }
            } else if (select === 1 || select === 2) {
                if (select - 1 === blank) {
                    this.exchange(select, blank);
                } else if (select + 1 === blank) {
                    this.exchange(select, blank);
                } else if (select + 4 === blank) {
                    this.exchange(select, blank);
                }
            } else if (select === 3) {
                if (2 === blank) {
                    this.exchange(select, blank);
                } else if (7 === blank) {
                    this.exchange(select, blank);
                }
            } else if (select === 4 || select === 8) {
                if (select - 4 === blank) {
                    this.exchange(select, blank);
                } else if (select + 1 === blank) {
                    this.exchange(select, blank);
                } else if (select + 4 === blank) {
                    this.exchange(select, blank);
                }
            } else if (select === 5 || select === 6 || select === 9 || select === 10) {
                if (select - 1 === blank) {
                    this.exchange(select, blank);
                } else if (select - 4 === blank) {
                    this.exchange(select, blank);
                } else if (select + 1 === blank) {
                    this.exchange(select, blank);
                } else if (select + 4 === blank) {
                    this.exchange(select, blank);
                }
            } else if (select === 7 || select === 11) {
                if (select - 1 === blank) {
                    this.exchange(select, blank);
                } else if (select - 4 === blank) {
                    this.exchange(select, blank);
                } else if (select + 4 === blank) {
                    this.exchange(select, blank);
                }
            } else if (select === 12) {
                if (8 === blank) {
                    this.exchange(select, blank);
                } else if (13 === blank) {
                    this.exchange(select, blank);
                }
            } else if (select === 13 || select === 14) {
                if (select - 1 === blank) {
                    this.exchange(select, blank);
                } else if (select - 4 === blank) {
                    this.exchange(select, blank);
                } else if (select + 1 === blank) {
                    this.exchange(select, blank);
                }
            } else if (select === 15) {
                if (14 === blank) {
                    this.exchange(select, blank);
                } else if (11 === blank) {
                    this.exchange(select, blank);
                }
            }
        }
        this.drawPanel();
    }
    /**
     * パネルの入れ替え処理を行う。
     * @param select 選択したパネルの番号
     * @param blank 空欄のパネルの番号
     */
    exchange(select, blank) {
        const tmp = this.panels[select];
        this.panels[select] = "　";
        this.panels[blank] = tmp;
    }
    /**
     * パネルの描画を行う。
     */
    drawPanel() {
        let elements = this.wrap.getElementsByClassName('pazzle-panel');
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerText = this.panels[i];
            if (elements[i].innerText === "　") {
                elements[i].classList.add('blank-panel');
            } else {
                elements[i].classList.remove('blank-panel');
            }
        }
    }
    /**
     * パネルの順番をシャッフルする。
     */
    shufflePanel() {
        const difficulty = 1000;
        for (let i = 0; i < difficulty; i++) {
            const random = Math.floor(Math.random() * 15);
            this.changePanel(random);
        }
    }
}