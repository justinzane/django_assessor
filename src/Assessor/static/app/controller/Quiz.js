Ext.define('Assessor.controller.Quiz', {
	extend : 'Ext.app.Controller',
	itemId : 'quizcontroller',
	models : ['Question', 'Choice'],
	stores : ['Question', 'Choice'],
	views : ['QuestionCard'],

	// Custom Functions
	/**
	 * update the buttons based on the state of the quiz cards
	 */
	updateButtons : function() {
		var index = this.getCardIndex();
		var nb = Ext.ComponentQuery.query('#nextbutton')[0];
		var pb = Ext.ComponentQuery.query('#prevbutton')[0];
		var fb = Ext.ComponentQuery.query('#finishbutton')[0];
		console.debug("Index: ", index, " QuestCount: ", Ext.getStore('Question').count());
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
	 * callback to create radiogroups with data from association store
	 */
	createRadioGroup : function(records, operation, success) {
		if (success) {
			for (var i = 0; i < records.length; i++) {
				console.info('question_id: ', records[i].data['question_id']);
				var rg = Ext.ComponentQuery.query('#choicegroup-'+records[i].data['question_id'])[0];
				var bl = Ext.create('Ext.form.field.Radio', {
					boxLabel : records[i].data['text'],
					name : 'rb',
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
				itemId : 'questioncard-' + i, // qs.getAt(i).data['id'], using hash as ID now.
				items : [df, rg]
			});
			qc.add(card);
		};
		this.updateButtons();
	},
	/**
	 * finishQuiz -- finishes and scores the quiz
	 * @param {Object} args
	 */
	finishQuiz : function(args) {
		var num_questions = Ext.ComponentQuery.query('quizcards')[0].items.length;
		var num_correct = 0;
		// loop through quiz cards
		for ( i = 0; i < num_questions; i++) {
			//var card = Ext.ComponentQuery.query('quizcards')[0].items[i];
			//get question id
			var question_id = Ext.ComponentQuery.query('quizcards')[0].items.getAt(i).itemId.split('-')[1];
			//get selected radiofield id
			try {
				var selected_id = Ext.ComponentQuery.query('#choicegroup-'+question_id)[0].getValue()['rb'];
				qs = Ext.getStore('Choice');
				if (qs.getById(selected_id).data['is_correct']) {
					num_correct += 1;
				}
			} catch (e) {
				console.log(e);
			}
		}
		console.log('Score: ', 100.0 * num_correct / num_questions);
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
			'#finishbutton' : {
				click : this.finishQuiz
			},
		})
	}
})
