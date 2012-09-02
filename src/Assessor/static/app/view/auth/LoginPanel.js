Ext.define('Assessor.view.auth.LoginPanel', {
	requires : ['Ext.util.Cookies'],
	extend : 'Ext.form.Panel',
	itemId : 'loginpanel',
	alias : 'widget.loginpanel',
	layout : 'anchor',
	title : 'Login',
	url : '/auth/login',
	items : [{
		xtype : 'textfield',
		fieldLabel : 'username',
		name : 'username',
		itemId : 'usernamefield',
		alias : 'widget.usernamefield',
		allowBlank : false,
		minLength : 4,
		minWidth : 200,
		maxWidth: 1000
	}, {
		xtype : 'textfield',
		fieldLabel : 'password',
		name : 'password',
		itemId : 'passwordfield',
		alias : 'widget.passwordfield',
		inputType : 'password',
		allowBlank : false,
		minLength : 4,
		minWidth : 200,
		maxWidth: 1000
	}],
	buttons : [{
		itemId : 'loginbutton',
		alias : 'widget.loginbutton',
		text : 'Login',
		type : 'submit',
		formBind : true, //only enabled once the form is valid
		disabled : true
	}, {
		xtype : 'button',
		itemId : 'logoutbutton',
		alias : 'widget.logoutbutton',
		text : 'Logout',
		type : 'button',
		disabled: true
	}]
});
