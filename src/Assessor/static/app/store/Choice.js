Ext.define('Assessor.store.Choice', {
	extend: 'Ext.data.Store',
	model: 'Assessor.model.Choice',
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
	storeId: 'choicestore'
})
