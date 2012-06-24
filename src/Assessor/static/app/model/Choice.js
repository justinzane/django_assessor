Ext.define('Assessor.model.Choice', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'question_id', type: 'int'}, //fk(Question)
		{name: 'text', type: 'string'},
		{name: 'is_correct', type: 'boolean'},
		{name: 'resource_uri', type: 'string'}
	],
	associations: {
		type: 'belongsTo',
		model: 'Assessor.model.Question',
		name: 'getQuestion'
	},
	proxy: {
		type: 'rest',
		url: '/api/v1/choice/',
			headers: {
			'accept':'application/json',
			'content-type':'application/json'
		},
		groupParam: null,
		limitParam: null,
		pageParam: null,
		sortParam: null,
		startParam: null,
		noCache: false,
	    /**
	     * Customized to send ../?prop=val&prop2=val2 urls.
	     */
	    buildUrl: function(request) {
	    	var url = this.url;
	    	var filters = eval(request.params['filter']);
	        if (filters) {
	        	delete request.params['filter'];
	        	url += '?'
		        for (var i = 0; i < filters.length; i++) {
		        	var filterString = filters[i].property + "=" + filters[i].value;
			        if (url.slice(url.length-1) === '?') {
			        	url += filterString;
		        	} else {
		        		url += '&' + filterstring;
		        	} 
		        }
	        };
	        return url;
	    },
		reader: {
			type: 'json',
			root: 'objects',
			metaData: 'meta',
			idProperty: 'id'
		},
		writer: {
			type: 'json'
		}
	}
})
