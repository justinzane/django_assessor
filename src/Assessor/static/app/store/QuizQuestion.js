Ext.define('Assessor.store.QuizQuestion', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	autoSync: true,
	model: 'Assessor.model.QuizQuestion',
	storeId: 'quizquestionstore'
})
