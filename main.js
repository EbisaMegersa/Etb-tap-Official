let balance = 0;
const incrementValue = 0.05;

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the Telegram Web App is initialized and the user is accessible
    if (typeof Telegram !== 'undefined' && Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;

        if (user) {
            let username = user.username || user.first_name || 'Unknown';
            if (username.length > 10) {
                username = username.substring(0, 10) + '...';
            }
            document.getElementById('username-value').innerText = username;

            const storedBalance = localStorage.getItem(`balance_${user.id}`);
            if (storedBalance !== null) {
                balance = parseFloat(storedBalance);
            }
            updateDisplay();
        } else {
            alert("Unable to get Telegram user info.");
        }
    } else {
        alert("Telegram Web App API is not available.");
    }
});

document.getElementById('main-img').addEventListener('touchstart', (event) => {
    event.preventDefault();
    
    const mainImg = document.getElementById('main-img');
    mainImg.classList.add('tapped');
    setTimeout(() => {
        mainImg.classList.remove('tapped');
    }, 300);

    for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches[i];
        createFloatingText(touch.clientX, touch.clientY, '+0.05 ETB');

        balance += incrementValue;
        updateDisplay();

        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            localStorage.setItem(`balance_${user.id}`, balance.toFixed(4));
        }
    }
});

document.getElementById('tap').addEventListener('click', () => {
    window.location.href = 'main.html';
});

document.getElementById('boost').addEventListener('click', () => {
    showPopup("Boost system is Coming Soon!");
});

document.getElementById('frens').addEventListener('click', () => {
    showPopup("Referral link System is Coming!");
});

document.getElementById('withdraw').addEventListener('click', () => {
    showPopup("Withdrawal System is a few days left!");
});

function createFloatingText(x, y, text) {
    const floatingText = document.createElement('div');
    floatingText.innerText = text;
    floatingText.style.position = 'absolute';
    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    floatingText.style.color = '#ffffff';
    floatingText.style.fontSize = '24px';
    floatingText.style.fontWeight = 'none';
    floatingText.style.zIndex = '1000';
    floatingText.style.transition = 'all 0.5s ease-out';
    document.body.appendChild(floatingText);

    setTimeout(() => {
        floatingText.style.transform = 'translateY(-70px)';
        floatingText.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        floatingText.remove();
    }, 1050);
}

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