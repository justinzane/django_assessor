Ext.define('Assessor.store.Choice', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	autoSync: true,
	model: 'Assessor.model.Choice',
	storeId: 'choicestore'
})
