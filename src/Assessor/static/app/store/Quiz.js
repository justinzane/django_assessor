Ext.define('Assessor.store.Quiz', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	autoSync: true,
	model: 'Assessor.model.Quiz',
	storeId: 'quizstore'
})
