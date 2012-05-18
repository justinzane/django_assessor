Ext.define('Assessor.model.User',{
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'username', type: 'string'},
		{name: 'resource_uri', type: 'string'}
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
})
