const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const themeToggler = document.querySelector('.theme-toggler');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:first-child').classList.toggle('active');
    themeToggler.querySelector('span:last-child').classList.toggle('active');
});

Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
    <td>${order.name}</td>
    <td>${order.number}</td>
    <td>${order.status}</td>
    <td class="${order.shipping === 'Declined' ? 'danger' : order.shipping === 'Pending' ? 'warning' : 'primary'}">${order.shipping}</td>
    <td class="primary">Details</td>
    `
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
})