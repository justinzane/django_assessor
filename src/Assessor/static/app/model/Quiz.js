Ext.define('Assessor.model.Quiz', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'user', type: 'int'},
		{name: 'num_questions', type: 'int'},
		{name: 'num_correct', type: 'int'},
		{name: 'resource_uri', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url: '/api/v1/quiz/',
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
