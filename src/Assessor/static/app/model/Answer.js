Ext.define('Assessor.model.Answer', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'question_uri', type: 'string'},
		{name: 'choice_uri', type: 'string'},
	],
	proxy: {
		type: 'rest',
		url: '/api/v1/answer/',
		headers: {
			'accept':'application/json',
			'content-type':'application/json'
		},
		noCache: false,
		appendId: false,
		reader: {
			type: 'json',
			root: 'objects',
		},
		writer: {
			type: 'json',
			writeAllFields: false
		}
	}
})
