Ext.define('Assessor.model.User',{
	extend: 'Ext.data.Model',
	fields: [
		{name: "id", type: 'int'},
		{name: 'username', type: 'string'},
		{name: 'password', type: 'string'},
		{name: "date_joined", type: 'date'},
		{name: "email", type: 'string'},
		{name: "first_name", type: 'string'},
		{name: 'isAuthenticated', type: 'boolean'},
		{name: "is_active", type: 'boolean'},
		{name: "is_staff", type: 'boolean'},
		{name: "is_superuser", type: 'boolean'},
		{name: "last_login", type: 'date'},
		{name: "last_name", type: 'string'},
		{name: "resource_uri", type: 'string'}
	],
	proxy: {
		type: 'rest',
		url: '/api/v1/user/',
		headers: {
			'accept':'application/json',
			'content-type':'application/json'
		},
		noCache: false,
		reader: {
			type: 'json',
			root: 'objects',
			idAttribute: 'id'
		},
		writer: {
			type: 'json'
		}
	}
});
