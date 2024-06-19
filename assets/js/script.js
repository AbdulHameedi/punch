const newDate = new Date();
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
}
let formatDate = newDate.toLocaleDateString('en-Us', options);
document.getElementById('currentDate').textContent = formatDate