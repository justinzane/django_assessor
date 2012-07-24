Ext.define('Assessor.view.LoginCard', {
	extend: 'Ext.form.Panel',
	alias: 'widget.logincard',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	autoScroll: true,
	border: false,
	items: [{
		xtype: 'fieldset',
		flex: 0,
		layout: 'hbox',
		border: false,
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Username',
			alias: 'widget.usernameField',
			itemId: 'usernameField',
			name: 'username',
			allowBlank: false,
			minLength: 4,
			maxLength: 64
		}, {
			xtype: 'textfield',
			fieldLabel: 'Password',
			alias: 'widget.passwordField',
			itemId: 'passwordField',
			name: 'password',
			allowBlank: false,
			minLength: 4,
			maxLength: 64,
			inputType: 'password'
		}, {
			xtype: 'button',
			itemId: 'loginbutton',
			text: 'Login',
			disabled: false
		}]
	}]
})
