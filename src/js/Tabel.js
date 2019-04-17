class Table {
  constructor(el, data, time) {
    this.el = document.querySelector(el);
    this.data = data;
    this.time = time;
    this.counter = 0;
  }

  sortBy() {
    if (this.data[this.counter + 1] !== undefined) {
      const dataId = this.el.querySelectorAll('[data-id]');
      const thisAttrId = dataId[this.counter].getAttribute('data-id');
      const nextAttrId = dataId[this.counter + 1].getAttribute('data-id');

      if (+thisAttrId > +nextAttrId) {
        this.el.insertBefore(dataId[this.counter], this.el.children[this.counter + 1]);
        this.el.insertBefore(dataId[this.counter + 1], this.el.children[this.counter]);
      }
    }
    this.counter++;
  }

  createRows(rows) {
    for (const row of rows) {
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
