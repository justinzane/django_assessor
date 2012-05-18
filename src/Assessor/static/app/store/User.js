Ext.define('Assessor.store.User', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	autoSync: true,
	model: 'Assessor.model.User',
	storeId: 'userstore'
})
