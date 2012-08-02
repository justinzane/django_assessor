Ext.define('Assessor.view.auth.LoginPanel', {
	requires: ['Ext.util.Cookies'],
	extend: 'Ext.form.Panel',
	itemId: 'loginpanel',
	alias: 'widget.loginpanel',
	layout: 'anchor',
	title: 'Login',
	url: '/auth/login',
	items: [{
		xtype: 'textfield',
		fieldLabel: 'username',
		name: 'username',
		itemId: 'usernamefield',
		alias: 'widget.usernamefield',
		allowBlank: false,
		minLength: 6,
		width: 200
	}, {
		xtype: 'textfield',
		fieldLabel: 'password',
		name: 'password',
		itemId: 'passwordfield',
		alias: 'widget.passwordfield',
		allowBlank: false,
		minLength: 6,
		width: 200
	}],
	buttons: [{
		itemId: 'loginbutton',
		alias: 'widget.loginbutton',
        text: 'Login',
        type: 'submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                	headers: {'X-CSRFToken': Ext.util.Cookies.get('csrftoken')},
                    success: function(form, action) {
                       	Assessor.username = Ext.ComponentQuery.query('#usernamefield')[0].value;
						Assessor.password = Ext.ComponentQuery.query('#passwordfield')[0].value;
						console.info('logged in.');
                    },
                    failure: function(form, action) {
                        Ext.ComponentQuery.query('#loginpanel')[0].form.reset();
						Ext.Msg.alert('Invalid username or password.');
                    }
                });
            }
        }
    }],
})
