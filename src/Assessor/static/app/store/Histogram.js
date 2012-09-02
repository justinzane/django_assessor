Ext.define('Assessor.store.Histogram', {
	extend : 'Ext.data.Store',
	model : 'Assessor.model.Histogram',
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
	storeId : 'histogramstore'
});
