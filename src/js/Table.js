import arrowUp from '../image/arrow-up.svg'
import arrowDown from '../image/arrow-down.svg'

class Table {
  constructor(el, data) {
    this.el = document.querySelector(el);
    this.data = data;
    this.counter = 0;

    this.createRows();
  }

  sortBy() {
    if (this.data[this.counter + 1] !== undefined) {
      const arrowSort = document.querySelector('#arrow-sort');
      const dataId = this.el.querySelectorAll('[data-id]');
      const thisAttrId = dataId[this.counter].getAttribute('data-id');
      const nextAttrId = dataId[this.counter + 1].getAttribute('data-id');

      if (+thisAttrId > +nextAttrId) {
        arrowSort.innerHTML = '&#x2191';
        this.el.insertBefore(dataId[this.counter], this.el.children[this.counter + 1]);
        this.el.insertBefore(dataId[this.counter + 1], this.el.children[this.counter]);
      } else {
        arrowSort.innerHTML = '&#x2193';
      }
    }
    this.counter++;
  }

  createRows() {
    for (const row of this.data) {
      const tr = document.createElement('tr');

      tr.innerHTML = `<td>#${row.id}</td><td>${row.title}</td><td>(${row.year})</td><td>imdb: ${row.imdb}</td>`;

      tr.className = 'js-table-tr';
      tr.setAttribute('data-id', row.id);
      tr.setAttribute('data-title', row.title);
      tr.setAttribute('data-year', row.year);
      tr.setAttribute('data-imdb', row.imdb);

      this.el.appendChild(tr);
    }
  }
}

export default Table;
