let balance = 0;
const incrementValue = 0.01;

document.addEventListener('DOMContentLoaded', () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        let username = user.username || user.first_name || 'Unknown';
        if (username.length > 10) {
            username = username.substring(0, 10) + '...';
        }
        document.getElementById('username').innerText = username;

        const storedBalance = localStorage.getItem(`balance_${user.id}`);
        if (storedBalance !== null) {
            balance = parseFloat(storedBalance);
        }
        updateDisplay();
    } else {
        alert("Unable to get Telegram user info.");
    }
});

document.getElementById('main-img').addEventListener('touchstart', (event) => {
    const mainImg = document.getElementById('main-img');

    // Prevent the default behavior to ensure the app handles the touch event correctly
    event.preventDefault();

    // Loop through each touch point
    for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches[i];

        // Add the tapped effect
        mainImg.classList.add('tapped');
        setTimeout(() => {
            mainImg.classList.remove('tapped');
        }, 150);

        // Increment the balance
        balance += incrementValue;
        updateDisplay();

        // Store the updated balance
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            localStorage.setItem(`balance_${user.id}`, balance.toFixed(4));
        }
    }
});

function updateDisplay() {
    document.getElementById('balance-value').innerText = balance.toFixed(4);
}

// Handling button clicks
document.getElementById('boost').addEventListener('click', () => {
    showPopup('በቅርቡ Boost system ሰርተን እንጨርሳለን, እስከዛ ከኛ ጋር ይሁኑ!');
});

document.getElementById('frens').addEventListener('click', () => {
    showPopup('To get referral link 1. Open the bot 2. Click referral link button 3. Then you get your referral link');
});

document.getElementById('withdraw').addEventListener('click', () => {
    showPopup('Withdraw feature coming soon!'); // Placeholder message for withdraw button
});

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.innerText = message;
    popup.classList.remove('hidden');
    
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000); // Hide the popup after 3 seconds
}