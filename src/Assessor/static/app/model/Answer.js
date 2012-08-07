Ext.define('Assessor.model.Answer', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'string', defaultValue: undefined, persist: false},
		{name: 'question_id', type: 'string'},
		{name: 'choice_id', type: 'string'},
		{name: 'user_id', type: 'string'},
		{name: 'resource_uri', type: 'string', defaultValue: undefined, persist: false}
	],
	proxy: {
		appendId: false,
		batchActions: true,
		headers: {
			'accept':'application/json',
			'content-type':'application/json'
		},
		noCache: false,
		type: 'rest',
		url: '/api/v1/answer/',
		reader: {
			type: 'json',
			root: 'objects',
			idAddribute: 'id'
		},
		writer: {
			type: 'json',
			writeAllFields: false
		}
	}
})
