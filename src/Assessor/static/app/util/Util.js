Ext.define('Assessor.util.Util', {
	extend: 'Ext.Base',
	statics: {
		createStores: function(){
        	if (Ext.getStore('questionstore') == null) {
        		Ext.create('Assessor.store.Question');
        	};
        	if (Ext.getStore('choicestore') == null) {
        		Ext.create('Assessor.store.Choice');
        	};
        /**	if (Ext.getStore('userstore') == null) {
        		Ext.create('Assessor.store.User');
        	};
			if (Ext.getStore('quizstore') == null) {
        		Ext.create('Assessor.store.Quiz');
        	};
        	if (Ext.getStore('quizquestionstore') == null) {
        		Ext.create('Assessor.store.QuizQuestion');
        	}; */
    	} //end createStores
	} //end statics
})
