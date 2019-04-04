import './css/style.css'

const data = [
    {"id": 26, "title": "Побег из Шоушенка", "imdb": 9.30, "year": 1994},
    {"id": 25, "title": "Крёстный отец", "imdb": 9.20, "year": 1972},
    {"id": 27, "title": "Крёстный отец 2", "imdb": 9.00, "year": 1974},
    {"id": 1047, "title": "Тёмный рыцарь", "imdb": 9.00, "year": 2008},
    {"id": 223, "title": "Криминальное чтиво", "imdb": 8.90, "year": 1994}
];

const row = document.querySelector('.js-row');

function* generateRowTable(arr) {
    for (let i = 0; i < arr.length; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${arr[i].id}</td>
            <td>${arr[i].title}</td>
            <td>(${arr[i].year})</td>
            <td>imdb: ${arr[i].imdb}</td>
        `;

        tr.setAttribute('data-id', arr[i].id);
        tr.setAttribute('data-title', arr[i].title);
        tr.setAttribute('data-year', arr[i].year);
        tr.setAttribute('data-imdb', arr[i].imdb);

        yield tr;
    }
}

const rowTable = generateRowTable(data);
const arr = [];

setInterval(() => {
    const next = rowTable.next()

    if (!next.done) {
        arr.push(next.value);

        arr.sort((a, b) => +a.getAttribute('data-id') - +b.getAttribute('data-id'));
        arr.forEach(item => {
            row.appendChild(item);
        });
    }
}, 2000);

