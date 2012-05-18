Ext.define('Assessor.model.QuizQuestion'), {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'quiz', type: 'int'},
		{name: 'question', type: 'int'},
		{name: 'resource_uri', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url: '/api/v1/quizquestion/',
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
}
