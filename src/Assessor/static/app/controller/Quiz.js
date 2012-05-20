Ext.define('Assessor.controller.Quiz', {
	extend: 'Ext.app.Controller',
	id: 'quizcontroller',
	// Custom Functions
	startQuiz: function(args) {
		Assessor.localState.set('curQuestionNum', 0);
		Assessor.localState.set('quizStarted', true);
	},
	//
	createQuestionCards: function(num_questions) {
		var questions = Ext.getStore('questionstore').getRange(0,num_questions-1);
		for (var i=0; i<num_questions; i++) {
			var question = questions[i].data['text'];
			var choices = Ext.getStore('choicestore');
		};
	},
	//
	finishQuiz: function(args) {
		Assessor.localState.set('quizFinished', true);
	},
 	//
 	init: function(){
		this.control({
			'#nextbutton': {
				click: this.showQuestion
			},
			'#startbutton': {
				click: this.showQuestion
			},
		})
	}
})
