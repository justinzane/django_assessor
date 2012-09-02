//{"incorrect": 0, "correct": 0, "question_id": 4199}
Ext.define('Assessor.model.Histogram', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'question_id', type: 'int'},
		{name: 'correct', type: 'int'},
		{name: 'incorrect', type: 'int'}
	],
	proxy: {
		type: 'ajax',
		url: '/json/histogram/',
		headers: {
			'accept':'application/json',
			'content-type':'application/json'
		},
		noCache: false,
		reader: {
			type: 'json',
			root: '',
			idAttribute: 'question_id'
		}
	}
});
