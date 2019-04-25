class Table {
  constructor(el, data) {
    this.el = el;
    this.data = data;
    this.selectAttr = 0;
    this.selectData = ['id', 'title', 'year', 'imdb'];
    this.ascending = true;
    this.counter = 0;

    this._createRows();
  }

  static generateArrow(nameAttr, code) {
    const head = document.querySelector(`[data-name-head=${nameAttr}]`);
    const arrowSort = document.querySelector('.js-arrow-sort');
    const span = document.createElement('span');

    if (arrowSort !== null) {
      arrowSort.remove();
    }

    span.className = 'js-arrow-sort';
    span.innerHTML = code;

    head.appendChild(span);
  }

  sortBy() {
    const el = document.querySelector(this.el);
    const { children } = el;
    const dataAttr = this.selectData[this.selectAttr];
    let childrenAttr = children[this.counter].dataset[dataAttr];
    const testNumber = /\d/i.test(childrenAttr[0]);

    if (this.ascending && this.counter + 1 < this.data.length) {
      let nextChildrenAttr = children[this.counter + 1].dataset[dataAttr];

      Table.generateArrow(dataAttr, '&#x2193');

      if (testNumber) {
        childrenAttr = +childrenAttr;
        nextChildrenAttr = +nextChildrenAttr;
      }

      if (childrenAttr > nextChildrenAttr) {
        el.insertBefore(children[this.counter + 1], el.children[this.counter]);
        el.insertBefore(children[this.counter], el.children[this.counter + 1]);
      }

      this.counter += 1;
      if (this.counter + 1 === this.data.length) this.ascending = false;
    } else {
      let prevChildrenAttr = children[this.counter - 1].dataset[dataAttr];

      Table.generateArrow(dataAttr, '&#x2191');

      if (testNumber) {
        childrenAttr = +childrenAttr;
        prevChildrenAttr = +prevChildrenAttr;
      }

      if (childrenAttr > prevChildrenAttr) {
        el.insertBefore(children[this.counter], el.children[this.counter - 1]);
        el.insertBefore(children[this.counter - 1], el.children[this.counter]);
      }

      this.counter -= 1;
      if (this.counter === 0) {
        this.selectAttr += 1;
        if (this.selectAttr === this.selectData.length) this.selectAttr = 0;
        this.ascending = true;
      }
    }
  }

  _createRows() {
    const el = document.querySelector(this.el);

    for (const row of this.data) {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.title}</td>
        <td>(${row.year})</td>
        <td>imdb: ${row.imdb}</td>
      `;

      tr.className = 'js-table-tr';
      tr.setAttribute('data-id', row.id);
      tr.setAttribute('data-title', row.title);
      tr.setAttribute('data-year', row.year);
      tr.setAttribute('data-imdb', row.imdb);

      el.appendChild(tr);
    }
  }
}

export default Table;
