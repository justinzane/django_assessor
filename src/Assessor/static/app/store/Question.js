Ext.define('Assessor.store.Question', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	autoSync: true,
	model: 'Assessor.model.Question',
	storeId: 'questionstore'
})
