var m = require('mithril')

var LoginWindow = module.exports;

LoginWindow.controller = function () {

}


LoginWindow.view = function (ctrl) {
  return m('.my-component', [
    m('h2', 'Successful Login!')
  ])
}