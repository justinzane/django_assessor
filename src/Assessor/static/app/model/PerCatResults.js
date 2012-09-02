/**
 *  [{"id": 1,
 *    "category": "Crisis Management", 
 *    "incorrect": 12, 
 *    "correct": 8}, ...]
 */ 
Ext.define('Assessor.model.PerCatResults', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'string'},
		{name: 'category', type: 'string'},
		{name: 'correct', type: 'float'},
		{name: 'incorrect', type: 'float'}
	],
	proxy: {
		type: 'ajax',
		url: '/json/per_cat_results/',
		headers: {
			'accept':'application/json',
			'content-type':'application/json'
		},
		limitParam: null,
		pageParam: null,
		sortParam: null,
		startParam: null,
		noCache: false,
		reader: {
			type: 'json',
			root: '',
			idAttribute: 'id'
		}
	}
});
