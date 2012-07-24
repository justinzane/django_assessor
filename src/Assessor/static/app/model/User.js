Ext.define('Assessor.model.User',{
	extend: 'Ext.data.Model',
	fields: [
		{name: 'username', type: 'string'},
		{name: 'password', type: 'string'},
		{name: 'isAuthenticated', type: 'boolean'}
	],
	proxy: {
		type: 'sessionstorage',
		id: 'authenticationStore'
	}
})
