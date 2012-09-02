Ext.define('Assessor.store.PerCatResults', {
	extend : 'Ext.data.Store',
	model : 'Assessor.model.PerCatResults',
	autoLoad : false,
	listenters : {
		beforeload : function(store, op) {
			if (Assessor.username === null) {
				return false;
			} else {
				return true;
			}
		}
	},
	storeId : 'percatresultsstore'
});
