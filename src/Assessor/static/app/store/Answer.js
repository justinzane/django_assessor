Ext.define('Assessor.store.Answer', {
	extend: 'Ext.data.Store',
	autoLoad: false,
	autoSync: true,
	model: 'Assessor.model.Answer',
	storeId: 'answerstore'
})
