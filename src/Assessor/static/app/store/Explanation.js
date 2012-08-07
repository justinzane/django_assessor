Ext.define('Assessor.store.Explanation', {
	extend: 'Ext.data.Store',
	model: 'Assessor.model.Explanation',
	autoLoad: false,
	autoSync: false,
	listenters: {
	    beforeload: function(store, op){
	        if (Assessor.username == null){
	            return false;
          	} else {
          		return true;
          	}
	    }
	},
	storeId: 'explanationstore',
	pageSize: 200
})
