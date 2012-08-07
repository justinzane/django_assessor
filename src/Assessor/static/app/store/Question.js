Ext.define('Assessor.store.Question', {
	extend: 'Ext.data.Store',
	model: 'Assessor.model.Question',
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
	storeId: 'questionstore'
})
