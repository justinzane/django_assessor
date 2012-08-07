Ext.define('Assessor.store.Answer', {
	extend: 'Ext.data.Store',
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
	model: 'Assessor.model.Answer',
	storeId: 'answerstore'
})
