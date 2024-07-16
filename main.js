let balance = 0.0; // Use a float for ETB balance
const incrementValue = 0.003; // Amount per tap

document.addEventListener('DOMContentLoaded', () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        const storedBalance = localStorage.getItem(`balance_${user.id}`);
        if (storedBalance !== null) {
            balance = parseFloat(storedBalance);
        }
        updateDisplay();
    } else {
        alert("Unable to get Telegram user info.");
    }
});

document.getElementById('main-img').addEventListener('click', () => {
    const mainImg = document.getElementById('main-img');
    mainImg.classList.add('animated');

    setTimeout(() => {
        mainImg.classList.remove('animated');
    }, 500);

    balance += incrementValue;
    updateDisplay();

    const user = window.Telegram.WebApp.initDataUnsafe.user;
    if (user) {
        localStorage.setItem(`balance_${user.id}`, balance.toFixed(4));
    }
});

document.getElementById('tap').addEventListener('click', () => {
    window.location.href = 'main.html';
});

document.getElementById('boost').addEventListener('click', () => {
    showPopup("በቅርብ ቀን!\nComing Soon!");
});

document.getElementById('frens').addEventListener('click', () => {
    showPopup("Referall link ለማግኘት ይሄንን step ይከታተሉ!\n1 ቦቱን /start ይበሉት\n2 ቻናላችንን ይቀላቀሉ \n3 የሚመጣዉን ጥያቄ በመመለስ ወደ ቦቱ ዉስጥ ይግቡ\n4 ከዛ ጓደኞችዎን ይጋብዙ ሚለውን Button በመጫን የርሶን መጋበዣ link ማግኘት ትችላላችሁ!");
});

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.innerText = message;
    popup.classList.remove('hidden');
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 5000);
}

function updateDisplay() {
    document.getElementById('balance-value').innerText = balance.toFixed(4);
}