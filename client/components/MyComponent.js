var m = require('mithril')

var LoginWindow = module.exports;

LoginWindow.controller = function () {
	var ctrl = this;

	var obj = {
		username: 'name',
		password: 'password'
	};

	ctrl.signUp = function (e) {
		e.preventDefault()
		obj.username = ctrl.name;
		obj.password = ctrl.password;
		
	 m.request({
	 	method: "POST",
	 	url: "/users",
	 	data: obj
	 }).then(function(res){
		 console.log(res)
	 })

	}
}


LoginWindow.view = function (ctrl) {
	return m('.pet-shop', [
	m('div',{class:'loginContainer col-md-6'}, [

	//image here!!
	m('div', {class: "bannerImg"}),
    m('h1', {class:'loginText'}, "Login"),
    m('p', ctrl.fail),

    m('form', { onsubmit: ctrl.signIn }, [
        m('input', {
          value: ctrl.name,
          onchange: function () {
            ctrl.name = this.value
          }
        }),
        m('button[type=submit]', {class:'signin-button btn'},"Sign In"),
    ]),

    m('form', { onsubmit: ctrl.signUp }, [
        m('input', {
          value: ctrl.password,
          oninput: function () {
            ctrl.password = this.value
          }
        }),
        m('button[type=submit]',{class:'signup-button btn'}, "Sign Up")
      ]),
	]),


  ]);
//  return m('.my-component', [
//    m('h2', 'Here Be a component')
//  ])
}