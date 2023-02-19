import icons from '../../img/icons.svg';

export default class View {
  _data;
  // store the data

  /**
   * Render the recived obj to DOM
   * @param {Object | Object[]} data the data to be randered (e.g. recipe)
   * @param {boolean} [render = true] if false, create markup str instead of render it to the DOM
   * @returns {undefined | string} is return if render is false
   * @this {Object} View instance
   * @author Lea
   * @todo ~~~
   */

  // see hover it! WOW
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkUp();

    // return a str
    if (!render) return markup;

    this._clear(); //WOW
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Developing a DOM Updating Algorithm
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkUp();

    // WOW
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    // Comparation
    // console.log(curElement);
    // console.log(newElements);

    // updates changed TEXT //WOW
    newElements.forEach((newEl, i) => {
      const curEl = curElement[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // 注意问号???
        // console.log(newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // updates changed ATTRIBUTES by newEl
      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  // public method, so that the controller can then call this method here
  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
         <use href="${icons}.svg#icon-loader">
         </use>
        </svg>
      </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
