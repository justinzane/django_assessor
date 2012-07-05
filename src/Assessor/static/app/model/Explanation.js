Ext.define('Assessor.model.Explanation', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'question', type: 'string'},
		{name: 'choice', type: 'string'},
		{name: 'explanation', type: 'string'}
	],
	proxy: {
		type: 'localstorage',
		id: 'explanations'
	}
})
