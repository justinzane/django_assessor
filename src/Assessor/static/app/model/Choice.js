Ext.define('Assessor.model.Choice', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'question_id', type: 'string'}, //fk(Question)
		{name: 'text', type: 'string'},
		{name: 'is_correct', type: 'boolean'},
		{name: 'resource_uri', type: 'string'}
	],
	associations: [{ 
		type: 'belongsTo', 
		model: 'Assessor.model.Question',
		foreignKey: 'question_id',
		primaryKey: 'id'}
    ], 
	proxy: {
		type: 'rest',
		url: '/api/v1/choice/',
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
