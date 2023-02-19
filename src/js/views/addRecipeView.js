import View from './View';
import icons from '../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Your recipe is successfully uploaded! 🎉';

  // blur
  _window = document.querySelector('.add-recipe-window');
  // show the window
  _overlay = document.querySelector('.overlay');
  // btn
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(
      'click',
      // BUG
      // this keywork inside a handler function points to the element that the listener attached to
      //   this._overlay.classList.toggle('hidden');
      //   this._window.classList.toggle('hidden');
      // FIXED
      this.toggleWindow.bind(this)
    );
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  _generateMarkUp() {}
}

export default new addRecipeView();
