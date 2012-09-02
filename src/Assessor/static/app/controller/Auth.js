Ext.define('Assessor.controller.Auth', {
	extend : 'Ext.app.Controller',
	itemId : 'authcontroller',
	id : 'authcontroller',
	models : ['User'],
	stores : ['User'],
	views : ['Header', 'Tabs', 'auth.LoginPanel'],

	/**
	 *  Custom Controller Functions
	 */
	finishLogin : function() {
		// set auth for logged in user
		Ext.ComponentQuery.query('#logoutbutton')[0].enable();
		Ext.ComponentQuery.query('#loginbutton')[0].disable();
		Ext.ComponentQuery.query('#usernamefield')[0].reset();
		Ext.ComponentQuery.query('#passwordfield')[0].reset();
		Ext.ComponentQuery.query('#usernamefield')[0].disable();
		Ext.ComponentQuery.query('#passwordfield')[0].disable();
	},

	showLogin : function() {
		// set auth for logged in user
		Ext.ComponentQuery.query('#logoutbutton')[0].disable();
		Ext.ComponentQuery.query('#loginbutton')[0].enable();
		Ext.ComponentQuery.query('#usernamefield')[0].reset();
		Ext.ComponentQuery.query('#passwordfield')[0].reset();
		Ext.ComponentQuery.query('#usernamefield')[0].enable();
		Ext.ComponentQuery.query('#passwordfield')[0].enable();
		Ext.ComponentQuery.query('#accountPanel')[0].focus();
	},

	attemptLogin : function() {
		var form = Ext.ComponentQuery.query('#loginpanel')[0].form;
		if (form.isValid()) {
			form.submit({
				headers : {
					'X-CSRFToken' : Ext.util.Cookies.get('csrftoken')
				},
				success : function(form, action) {
					Assessor.username = Ext.ComponentQuery.query('#usernamefield')[0].value;
					Assessor.password = Ext.ComponentQuery.query('#passwordfield')[0].value;
					Ext.ComponentQuery.query('viewport')[0].fireEvent("logincomplete");
				},
				failure : function(form, action) {
					Ext.ComponentQuery.query('#loginpanel')[0].form.reset();
					Ext.Msg.alert('Invalid username or password.');
				}
			});
		}
	},

	attemptLogout : function() {
		Ext.Ajax.request({
			url : '/auth/logout',
			headers : {
				'X-CSRFToken' : Ext.util.Cookies.get('csrftoken')
			},
			params : {},
			success : function(response) {
				Assessor.username = null;
				Assessor.password = null;
				Ext.ComponentQuery.query('viewport')[0].fireEvent("logoutcomplete");
			},
			failure : function(response) {
				Ext.Msg.alert('Logout failed! This is a bug!');
			}
		});
	},

	init : function() {
		Ext.log({
			level : 'info',
			msg : 'Auth controller loaded.'
		});
		this.control({
			'viewport': {
				logoutcomplete: this.showLogin, 
				logincomplete: this.finishLogin
			},
			'#loginbutton' : {
				click : this.attemptLogin
			},
			'#logoutbutton' : {
				click : this.attemptLogout
			}
		});
	}
});
