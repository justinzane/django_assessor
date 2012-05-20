Ext.application({
    requires: 'Assessor.view.Viewport',
    name: 'Assessor',
    appFolder: 'app',
    models: [
    	'Assessor.model.Question',
    	'Assessor.model.Choice' 
//    	'Assessor.model.Quiz', 
 //   	'Assessor.model.QuizQuestion', 
	],
    stores: [
    	'Assessor.store.Question',
    	'Assessor.store.Choice' 
//    	'Assessor.store.Quiz', 
//    	'Assessor.store.QuizQuestion', 
	],
    controllers: ['Assessor.controller.Quiz'],
    requires: ['Assessor.util.Util'],
    launch: function() {
    	Assessor.localState = Ext.create('Ext.state.LocalStorageProvider');
    	Assessor.localState.set('quizStarted', false);
    	Assessor.localState.set('quizFinished', false);
    	Assessor.util.Util.createStores();
        Ext.create('Assessor.view.Viewport');
    }
});