Ext.define('Assessor.model.Question', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'text', type: 'string'},
		{name: 'explanation', type: 'string'},
		{name: 'resource_uri', type: 'string'}
	],
	hasMany: {
		model: 'Assessor.model.Choice',
		name: 'choices',
		foreignKey: 'question_id',
		name: 'getChoices'
	},
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
