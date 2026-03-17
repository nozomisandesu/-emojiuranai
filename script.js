const emojiGroups = [
    {
        name: "運命の色",
        guide: "次に【登場人物】を選んでね",
        emojis: [
            { char: "❤️", text: "燃えるような恋を掴む" }, 
            { char: "🧡", text: "温かい友情を育む" },
            { char: "💛", text: "ハッピーな出来事を引き寄せる" },
            { char: "💚", text: "心穏やかな時間を作る" },
            { char: "💙", text: "冷静な判断ができるようになる" },
            { char: "💜", text: "ミステリアスな展開を楽しむ" },
            { char: "🖤", text: "クールな自分に変身する" }, 
            { char: "🤍", text: "真っ白な未来を描く" },
            { char: "🤎", text: "落ち着いた雰囲気で過ごす" }, 
            { char: "❤️‍🔥", text: "気合いたっぷりの心を持つ" }
        ]
    },
    {
        name: "登場人物",
        guide: "次に【様子】を選んでね",
        emojis: [
            { char: "🥺", text: "甘え上手な誰かが、" }, 
            { char: "😎", text: "イキり倒した猛者が、" },
            { char: "😉", text: "頼れないおバカなあの子が、" }, 
            { char: "🫠", text: "やる気を全て置いてきた彼が、" },
            { char: "🤪", text: "テンション崩壊した友が、" }, 
            { char: "🤔", text: "何も考えていない自称天才が、" },
            { char: "🤫", text: "あなたの見えない何かが、" }
        ]
    },
    {
        name: "様子",
        guide: "最後に【結末】を選んでね",
        emojis: [
            { char: "✨", text: "キラキラ輝きながら" }, 
            { char: "🌟", text: "一番星のごとく堂々と" },
            { char: "💎", text: "ダイヤモンドのように眩しく" }, 
            { char: "🌈", text: "虹を架けるような軽やかさで" },
            { char: "🍀", text: "ラッキーを振りまきつつ" }, 
            { char: "💫", text: "目が回るような速さで" },
            { char: "🌪️", text: "今にも飛んできそうな勢いで" }
        ]
    },
    {
        name: "結末",
        guide: "お告げが完成しました！",
        emojis: [
            { char: "🦍", text: "ウホウホしてくるでしょう。" }, 
            { char: "🍄", text: "毒すぎるキノコを差し出すでしょう。" },
            { char: "💩", text: "運を味方につけてくれるでしょう。" }, 
            { char: "🦀", text: "ガニ股で急接近してくるでしょう。" },
            { char: "🗿", text: "モアイ像のように固まってしまうでしょう。" }, 
            { char: "🦖", text: "怪獣並みに暴れて駄々をこねるでしょう。" },
            { char: "🛸", text: "宇宙人の友達を紹介してくれるでしょう。" }, 
            { char: "🫵", text: "靴下が全て裏返って返ってくるでしょう。" }
        ]
    }
];

let currentStep = 0;
let selectedData = [];

function init() {
    currentStep = 0;
    selectedData = [];
    document.getElementById('selected-emojis').textContent = '';
    document.getElementById('fortune-text').textContent = 'お告げを選んでね';
    document.getElementById('guide-msg').textContent = `まずは【${emojiGroups[0].name}】を選んでね`;
    renderPicker();
}

function renderPicker() {
    const picker = document.getElementById('emoji-picker');
    picker.innerHTML = '';
    
    if (currentStep >= emojiGroups.length) {
        picker.innerHTML = '<p>🔮 運命は決まりました 🔮</p>';
        return;
    }

    const currentGroup = emojiGroups[currentStep];
    currentGroup.emojis.forEach(data => {
        const span = document.createElement('span');
        span.textContent = data.char;
        span.className = 'emoji-item';
        span.onclick = () => selectEmoji(data);
        picker.appendChild(span);
    });
}

function selectEmoji(data) {
    selectedData.push(data);
    const nextGuide = emojiGroups[currentStep].guide;
    document.getElementById('guide-msg').textContent = nextGuide;
    
    currentStep++;
    updateDisplay();
    renderPicker();
}

// ... (emojiGroupsなどのデータ部分はそのまま) ...

function updateDisplay() {
    const emojiArea = document.getElementById('selected-emojis');
    const textArea = document.getElementById('fortune-text');

    // 選んだ絵文字だけはリアルタイムで上に並べていく
    emojiArea.textContent = selectedData.map(d => d.char).join(' ');

    // ★ここがポイント：全部選び終わるまで文章は出さない
    if (selectedData.length === emojiGroups.length) {
        let text = "あなたが";
        text += selectedData[0].text;
        text += "ために、";
        
        for (let i = 1; i < selectedData.length; i++) {
            text += selectedData[i].text;
        }
        
        // パッと表示させるためのちょっとした演出
        textArea.style.opacity = 0;
        textArea.textContent = text;
        
        // 少し遅らせてふわっと表示（CSSでtransitionを設定している場合）
        setTimeout(() => {
            textArea.style.opacity = 1;
        }, 100);
    } else {
        // まだ途中のときはメッセージを固定
        textArea.textContent = "運命を選択中...";
    }
}

function resetAll() {
    init();
}

init();

// --- キラキラ演出のコード ---
document.addEventListener('mousemove', (e) => {
    createParticle(e.clientX, e.clientY, false);
});

function createParticle(x, y, isExplosion) {
    const p = document.createElement('div');
    p.className = 'particle';
    
    // キラキラの種類（ラメなら色、絵文字なら中身）
    const colors = ['#ff00c8', '#FFF', '#ffc4e2', '#f3ccff'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // 大きさ
    const size = Math.random() * 15 + 10 + 'px';
    p.style.width = size;
    p.style.height = size;
    
    // 出現位置
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    
    // 飛び散る方向をランダムに設定（CSS変数に渡す）
    const moveX = (Math.random() - 0.5) * (isExplosion ? 400 : 100) + 'px';
    const moveY = (Math.random() - 0.5) * (isExplosion ? 400 : 100) + 'px';
    p.style.setProperty('--x', moveX);
    p.style.setProperty('--y', moveY);
    
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
}

// 画面全体をキラキラさせる関数
function explode() {
    for(let i = 0; i < 50; i++) {
        createParticle(window.innerWidth / 2, window.innerHeight / 2, true);
    }
}


function selectEmoji(data) {
    selectedData.push(data);
    
    // 最後のステップかどうかを確認
    if (currentStep < emojiGroups.length - 1) {
        document.getElementById('guide-msg').textContent = emojiGroups[currentStep].guide;
    } else {
        // ★ここが「完了後」の処理
        document.getElementById('guide-msg').textContent = "✨ お告げ完成！ ✨";
        isFinished = true; // 完了フラグを立てる
        explode(); // 爆発エフェクトを実行
    }
    
    currentStep++;
    updateDisplay();
    renderPicker();
}

// updateDisplayなどは前のままでOK

// 自動でキラキラを発生させる関数
function autoSparkle() {
    // 画面のどこかランダムな場所（横方向はランダム、縦方向は一番上）
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    // キラキラを作成（第3引数は false なので通常サイズ）
    createParticle(x, y, false);
}

// 0.3秒（300ミリ秒）ごとに1個ずつ自動で作る
// 数字を小さくするほど、キラキラの密度が上がります
setInterval(autoSparkle, 200);
