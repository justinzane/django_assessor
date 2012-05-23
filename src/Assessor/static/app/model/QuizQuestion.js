Ext.define('Assessor.model.QuizQuestion', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'quiz_id', type: 'string'},
		{name: 'question_id', type: 'string'},
		{name: 'resource_uri', type: 'string'}
	],
	associations: [{
		type: 'belongsTo', 
		model: 'Assessor.model.Quiz',
		foreignKey: 'quiz_id',
		primaryKey: 'id'
	}, { 
		type: 'belongsTo', 
		model: 'Assessor.model.Question',
		foreignKey: 'question_id',
		primaryKey: 'id'
	}],
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
})
