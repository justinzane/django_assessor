Ext.define('Assessor.model.Question', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'text', type: 'string'},
		{name: 'resource_uri', type: 'string'}
	],
	associations: [{
		type: 'hasMany', 
		model: 'Assessor.model.Choice'
	}],
	proxy: {
		type: 'rest',
		url: '/api/v1/question/',
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
