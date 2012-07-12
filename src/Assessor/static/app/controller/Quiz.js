Ext.define('Assessor.controller.Quiz', {
	extend : 'Ext.app.Controller',
	itemId : 'quizcontroller',
	models : ['Question', 'Choice', 'Explanation', 'Answer'],
	stores : ['Question', 'Choice', 'Explanation', 'Answer'],
	views : ['QuestionCard', 'ResultCard', 'ExplanationGrid'],

	// Custom Functions
	/**
	 * update the buttons based on the state of the quiz cards
	 */
	updateButtons : function() {
		var index = this.getCardIndex();
		var nb = Ext.ComponentQuery.query('#nextbutton')[0];
		var pb = Ext.ComponentQuery.query('#prevbutton')[0];
		var fb = Ext.ComponentQuery.query('#finishbutton')[0];
		if (index < (Ext.getStore('Question').count() - 1)) {
			nb.enable();
			fb.disable();
		} else {
			nb.disable();
			fb.enable();
		};
		if (index > 0) {
			pb.enable();
		} else {
			pb.disable();
		};
	}, //end updateButtons
	/**
	 * disable the buttons 
	 */
	disableButtons : function() {
		Ext.ComponentQuery.query('#nextbutton')[0].disable();
		Ext.ComponentQuery.query('#prevbutton')[0].disable();
		Ext.ComponentQuery.query('#finishbutton')[0].disable();
	}, //end updateButtons
	/**
	 * get active question card index
	 */
	getCardIndex : function() {
		return (Ext.ComponentQuery.query('quizcards')[0].getLayout().activeItem.itemId.split('-')[1]);
	},
	/**
	 * set active question card index
	 */
	setCardIndex : function (index) {
		Ext.ComponentQuery.query('quizcards')[0].getLayout().setActiveItem('questioncard-' + index);
	},
	/**
	 * start the quiz
	 */
	startQuiz : function (args) {
		// find number requested
		var numQuestions = Ext.ComponentQuery.query('numberfield')[0].value;
		// remove startCard
		Ext.ComponentQuery.query('quizcards')[0].removeAll();
		// load numQuestions records from store.Questions
		Ext.getStore('Question').load({
			scope: this,
			params: {
				limit: numQuestions
			},
			callback: function () {
				this.createQuestionCards(numQuestions);
				this.updateButtons();
			}
		});
	},
	/**
	 * REstart the quiz
	 */
	reStartQuiz : function (args) {
		location.reload();
	},
	/**
	 * callback to create radiogroups with data from association store
	 */
	createRadioGroup : function(records, operation, success) {
		if (success) {
			for (var i = 0; i < records.length; i++) {
				var rg = Ext.ComponentQuery.query('#choicegroup-'+records[i].data['question_id'])[0];
				var bl = Ext.create('Ext.form.field.Radio', {
					boxLabel : i + ' - ' + records[i].data['text'],
					name : 'rb' + records[i].data['id'],
					inputValue : records[i].data['id']
				});
				rg.add(bl);
			};
		};
	},
	/**
	 * create the UI cards with questions from server.
	 */
	createQuestionCards : function(numQuestions) {
		var qs = Ext.getStore('Question');
		var cs = Ext.getStore('Choice');

		//create components
		var qc = Ext.ComponentQuery.query('quizcards')[0];
		for ( i = 0; i < numQuestions; i++) {
			var df = Ext.create('Ext.form.field.Display', {
				itemId : 'questionfield-' + qs.getAt(i).data['id'],
				name : 'questionfield-' + qs.getAt(i).data['id'],
				fieldLabel : 'Question ' + qs.getAt(i).data['id'],
				value : qs.getAt(i).data['text']
			});
			var rg = Ext.create('Ext.form.RadioGroup', {
				itemId : 'choicegroup-' + qs.getAt(i).data['id'],
				alias : 'widget.choicegroup-' + qs.getAt(i).data['id'],
				columns : 1,
				vertical : true
			});
			var qs_cs = qs.getAt(i).getChoices();
			qs_cs.load(this.createRadioGroup);
			var card = Ext.create('Assessor.view.QuestionCard', {
				itemId : 'questioncard-' + i,
				questionId : qs.getAt(i).data['id'],
				items : [df, rg]
			});
			qc.add(card);
		};
		this.updateButtons();
	},
	/**
	 * record answer by adding model to store
	 */
	recordAnswer: function(questionUri, choiceUri) {
		var answer = Ext.create('Assessor.model.Answer', {
			question_uri: questionUri,
			choice_uri: choiceUri
		});
		answer.save();
//		Ext.getStore('Answer').add(answer);
	},
	/**
	 * finishQuiz -- finishes and scores the quiz
	 * @param {Object} args
	 */
	finishQuiz : function(args) {
		this.disableButtons();
		var cs = Ext.getStore('Choice');
		var es = Ext.getStore('Explanation');
		var qs = Ext.getStore('Question');
		// Empty Explanation store/model/proxy.
		es.model.proxy.clear();
		var scoreContent = '';
		var num_questions = Ext.ComponentQuery.query('quizcards')[0].items.length;
		var num_correct = 0;
		// loop through quiz cards
		for ( i = 0; i < num_questions; i++) {
			var questionId = Ext.ComponentQuery.query('quizcards')[0].items.getAt(i).questionId;
			//get selected radiofield id
			try {
				var selectedObj = Ext.ComponentQuery.query('#choicegroup-'+questionId)[0].getValue();
				var selectedId = selectedObj[[Object.keys(selectedObj)[0]]];
				this.recordAnswer(qs.getById(questionId).data['resource_uri'], cs.getById(selectedId).data['resource_uri']);
				if (cs.getById(selectedId).data['is_correct']) {
					num_correct += 1;
				} else {
					var exp = Ext.create('Assessor.model.Explanation', {
						question: qs.getById(questionId).data['text'],
						choice: cs.getById(selectedId).data['text'],
						explanation: qs.getById(questionId).data['explanation']
					});
					exp.save();
					es.add(exp);
				}
			} catch (e) {
				console.log(e);
			}
		}
		var pctScore = 100.0 * num_correct / num_questions;
		scoreContent += 'Your score was <b>' + pctScore + '%</b>. ';
		if (pctScore>=70.0) {
			scoreContent += 'Congratulations, you passed!';
		} else {
			scoreContent += 'BBS requires at least a 70%, keep studying.';
		}
		Ext.ComponentQuery.query('quizcards')[0].removeAll();
		// make sure the grid has data
		es.load()
		rc = Ext.create('Assessor.view.ResultCard', {});
		Ext.ComponentQuery.query('#resultpanel')[0].html = scoreContent
		Ext.ComponentQuery.query('quizcards')[0].add(rc);
	},
	//
	nextQuestion : function(args) {
		var cardlayout = Ext.ComponentQuery.query('quizcards')[0].getLayout();
		var activeIndex = cardlayout.activeItem.itemId.split('-')[1];
		if (activeIndex < Ext.getStore('Question').count()) {
			activeIndex++;
			this.setCardIndex(activeIndex);
		};
		this.updateButtons();
	},
	//
	prevQuestion : function(args) {
		var cardlayout = Ext.ComponentQuery.query('quizcards')[0].getLayout();
		var activeIndex = cardlayout.activeItem.itemId.split('-')[1];
		if (activeIndex > 0) {
			activeIndex--;
			this.setCardIndex(activeIndex);
		};
		this.updateButtons();
	},
	//
	init : function() {
/**		var nextMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	    }]);
		var oneMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	        fn: Ext.ComponentQuery.query('#nextbutton')[0].fireEvent('click')
	    }]);
		var twoMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	        fn: Ext.ComponentQuery.query('#nextbutton')[0].fireEvent('click')
	    }]);
		var threeMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	        fn: Ext.ComponentQuery.query('#nextbutton')[0].fireEvent('click')
	    }]);
		var fourMap = Ext.create('Ext.util.KeyMap', Ext.getBody(), [{
	        key: Ext.EventObject.N, // Next
	        shift: false,
	        ctrl: false,
	        fn: Ext.ComponentQuery.query('#nextbutton')[0].fireEvent('click')
	    }]); */
		this.control({
			'#nextbutton' : {
				click : this.nextQuestion
			},
			'#prevbutton' : {
				click : this.prevQuestion
			},
			'#startbutton' : {
				click : this.startQuiz
			},
			'#restartbutton' : {
				click : this.reStartQuiz
			},
			'#finishbutton' : {
				click : this.finishQuiz
			},
		})
	}
})
