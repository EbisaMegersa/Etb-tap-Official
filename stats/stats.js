document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the total number of users and total ETB tapped from localStorage
    const totalUsers = localStorage.getItem('total_users') || 0;
    const totalEtbTapped = localStorage.getItem('total_etb_tapped') || 0.0000;

    // Update the HTML elements with the retrieved values
    document.getElementById('total-users').innerText = totalUsers;
    document.getElementById('total-etb-tapped').innerText = parseFloat(totalEtbTapped).toFixed(4);

    // Add event listener to the Back to Main button
    document.getElementById('back-to-main').addEventListener('click', () => {
        window.location.href = 'main.html';
    });
});