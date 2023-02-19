class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    // sunbmit for click and enter
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
      //   _clearInput() // NONO
    });
  }
}

export default new SearchView();
