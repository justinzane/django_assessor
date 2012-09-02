Ext.define('Assessor.controller.Quiz', {
	extend : 'Ext.app.Controller',
	itemId : 'quizcontroller',
	id : 'quizcontroller',
	models : ['User', 'Question', 'Choice', 'Answer'],
	stores : ['User', 'Question', 'Choice', 'Answer'],
	views : ['quiz.ButtonPanel', 'quiz.ExplanationGrid', 'quiz.QuestionCard', 'quiz.QuizCards', 'quiz.StartCard', 'quiz.TimerBar'],

	// Custom Functions
	/** update the buttons based on the state of the quiz cards */
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
		}
		if (index > 0) {
			pb.enable();
		} else {
			pb.disable();
		}
	}, //end updateButtons

	/** get active question card index */
	getCardIndex : function() {
		return (Ext.ComponentQuery.query('quizcards')[0].getLayout().activeItem.itemId.split('-')[1]);
	},

	/** set active question card index */
	setCardIndex : function(index) {
		Ext.ComponentQuery.query('quizcards')[0].getLayout().setActiveItem('questioncard-' + index);
	},

	/** Setup the timer task */
	startTimer : function(num) {
		var timerBar = Ext.ComponentQuery.query('#timerbar')[0];
		var startTime = new Date().getTime() / 1000.0;
		var totalTime = timerBar.numToTime(num);
		var updateTimer = function() {
			var curTime = new Date().getTime() / 1000.0;
			var elapsedTime = (curTime - startTime);
			var progress = elapsedTime / totalTime;
			if (progress >= 1.0) {
				Ext.MessageBox.alert("Time Expired", "Please try to answers questions more promptly.");
				timerBar.updateProgress(1.0, "Time Expired!");
			} else {
				var elTimeMin = (elapsedTime / 60.0).toFixed(0).toString();
				var elTimeSec = (elapsedTime - (60 * elTimeMin)).toFixed(0).toString();
				var elText = "";
				if (elTimeMin.length == 1) {
					elTimeMin = "0" + elTimeMin;
				}
				if (elTimeSec.length == 1) {
					elTimeSec = "0" + elTimeSec;
				}
				elText = elTimeMin + ":" + elTimeSec + " elapsed";
				timerBar.updateProgress(progress, elText);
			}
		};
		var timerTask = Ext.TaskManager.start({
			itemId : 'timertask',
			run : updateTimer,
			interval : 2000,
			duration : totalTime * 1000
		});
	},

	setupAssessment : function() {
		var tp = Ext.ComponentQuery.query('#tabs')[0];
		var ap = Ext.ComponentQuery.query('#assessmentPanel')[0];
		ap.removeAll();
		ap.add({
			xtype : 'quizcards',
			flex : 1
		});
		ap.add({
			xtype : 'buttonpanel'
		});
		ap.enable();
		tp.setActiveTab(ap);
	},
	
	disableAssessment: function() {
		var tp = Ext.ComponentQuery.query('#tabs')[0];
		var ap = Ext.ComponentQuery.query('#assessmentPanel')[0];
		ap.removeAll();
		ap.disable();
	},

	startQuiz : function(args) {
		// find number requested
		var numQuestions = Ext.ComponentQuery.query('numberfield')[0].value;
		// remove startCard
		Ext.ComponentQuery.query('quizcards')[0].removeAll();
		// load numQuestions records from store.Questions
		var qs = Ext.getStore('Question');
		var qsMask = Ext.create('Ext.LoadMask', Ext.ComponentQuery.query('viewport')[0], {
			store : qs,
			msg : "Loading Questions"
		});
		qs.proxy.headers['X-Username'] = Assessor.username;
		qs.proxy.headers['X-Password'] = Assessor.password;
		qs.load({
			scope : this,
			params : {
				limit : numQuestions
			},
			callback : function() {
				this.createQuestionCards(numQuestions);
				this.startTimer(numQuestions);
				this.updateButtons();
			}
		});
		var cs = Ext.getStore('Choice');
		var csMask = Ext.create('Ext.LoadMask', Ext.ComponentQuery.query('viewport')[0], {
			store : cs,
			msg : "Loading Choices"
		});
		cs.proxy.headers['X-Username'] = Assessor.username;
		cs.proxy.headers['X-Password'] = Assessor.password;
		var us = Ext.getStore('User');
		var usMask = Ext.create('Ext.LoadMask', Ext.ComponentQuery.query('viewport')[0], {
			store : us,
			msg : "Loading Users"
		});
		us.proxy.headers['X-Username'] = Assessor.username;
		us.proxy.headers['X-Password'] = Assessor.password;
		us.load();
		var as = Ext.getStore('Answer');
		as.proxy.headers['X-Username'] = Assessor.username;
		as.proxy.headers['X-Password'] = Assessor.password;
	},

	/** REstart the quiz */
	reStartQuiz : function(args) {
		Ext.ComponentQuery.query('#restartbutton')[0].disable();
		// Clear the relevant stores
		var qs = Ext.getStore('Question');
		var cs = Ext.getStore('Choice');
		var as = Ext.getStore('Answer');
		qs.removeAll();
		cs.removeAll();
		as.removeAll();
		this.setupAssessment();
	},

	/** callback to create radiogroups with data from association store */
	createRadioGroup : function(records, operation, success) {
		if (success) {
			for (var i = 0; i < records.length; i++) {
				var rg = Ext.ComponentQuery.query('#choicegroup-'+records[i].data['question_id'])[0];
				var bl = Ext.create('Ext.form.Checkbox', {
					boxLabel : i + ' - ' + records[i].data['text'],
					name : 'rb' + records[i].data['id'],
					itemId : 'rb' + records[i].data['id'],
					inputValue : records[i].data['id']
				});
				rg.add(bl);
			}
		}
	},

	/** create the UI cards with questions from server. */
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
			//var rg = Ext.create('Ext.form.RadioGroup', {
			var rg = Ext.create('Ext.form.CheckboxGroup', {
				itemId : 'choicegroup-' + qs.getAt(i).data['id'],
				alias : 'widget.choicegroup-' + qs.getAt(i).data['id'],
				columns : 1,
				vertical : true
			});
			var qs_cs = qs.getAt(i).getChoices();
			qs_cs.load({
				callback : this.createRadioGroup,
				addRecords : true
			});
			var card = Ext.create('Assessor.view.quiz.QuestionCard', {
				itemId : 'questioncard-' + i,
				questionId : qs.getAt(i).data['id'],
				items : [df, rg]
			});
			qc.add(card);
		}
		this.updateButtons();
	},

	/** record answer by adding model to store */
	recordAnswer : function(questionId, choiceId, userId) {
		var answer = Ext.create('Assessor.model.Answer', {
			question_id : "/api/v1/question/" + questionId + "/",
			choice_id : "/api/v1/choice/" + choiceId + "/",
			user_id : "/api/v1/user/" + userId + "/"
		});
		answer.save();
	},

	/** finishQuiz -- finishes and scores the quiz */
	finishQuiz : function(args) {
		// stop the timer
		Ext.TaskManager.stopAll();
		// disable the quiz buttons
		Ext.ComponentQuery.query('#nextbutton')[0].disable();
		Ext.ComponentQuery.query('#prevbutton')[0].disable();
		Ext.ComponentQuery.query('#finishbutton')[0].disable();
		Ext.ComponentQuery.query('#bogusbutton')[0].disable();
		//
		Ext.ComponentQuery.query('#restartbutton')[0].enable();
		//
		var cs = Ext.getStore('Choice');
		var es = Ext.getStore('Explanation');
		var qs = Ext.getStore('Question');
		var us = Ext.getStore('User');
		//
		var userId = us.data.getAt(us.find('username',Assessor.username)).data['id'];
		// Empty Explanation store/model/proxy.
		es.model.proxy.clear();
		var num_questions = Ext.ComponentQuery.query('quizcards')[0].items.length;
		var num_correct = 0;
		// loop through quiz cards
		for ( i = 0; i < num_questions; i++) {
			var questionId = Ext.ComponentQuery.query('quizcards')[0].items.getAt(i).questionId;
			//get selected radiofield id
			try {
				var selectedObj = Ext.ComponentQuery.query('#choicegroup-'+questionId)[0].getValue();
				var selectedId = selectedObj[[Object.keys(selectedObj)[0]]];
				this.recordAnswer(qs.getById(questionId).data['id'], qs.getById(questionId).getChoices().getById(selectedId).data['id'], userId);
				if (qs.getById(questionId).getChoices().getById(selectedId).data['is_correct']) {
					num_correct += 1;
				} else {
					var exp = Ext.create('Assessor.model.Explanation', {
						question : qs.getById(questionId).data['text'],
						choice : qs.getById(questionId).getChoices().getById(selectedId).data['text'],
						explanation : qs.getById(questionId).data['explanation']
					});
					exp.save();
					es.add(exp);
				}
			} catch (e) {
				Ext.log({
					level : 'warn',
					msg : 'Problem calculating score.',
					dump : e
				});
			}
		}
		var score = num_correct / num_questions;
		var rc = this.getController('Result');
		rc.showScore(score);
	},

	reportBogus : function(args) {
		var questionId = Ext.ComponentQuery.query('quizcards')[0].items.getAt(i).questionId;
		var req = Ext.Ajax.request({
			url : 'util/reportbogus/',
			headers : {
				'X-Username' : Assessor.username,
				'X-Password' : Assessor.password
			},
			params : {
				'question_id' : questionId
			},
			success : function(response) {
				Ext.Msg.alert('Bogosity', 'Bogus question reported.');
			},
			failure : function(response) {
				Ext.log({
					level : 'warn',
					msg : 'Bogosity report failed.',
					dump : response
				});
			}
		});
	},
	//
	nextQuestion : function(args) {
		var cardlayout = Ext.ComponentQuery.query('quizcards')[0].getLayout();
		var activeIndex = cardlayout.activeItem.itemId.split('-')[1];
		if (activeIndex < Ext.getStore('Question').count()) {
			activeIndex++;
			this.setCardIndex(activeIndex);
		}
		this.updateButtons();
	},
	//
	prevQuestion : function(args) {
		var cardlayout = Ext.ComponentQuery.query('quizcards')[0].getLayout();
		var activeIndex = cardlayout.activeItem.itemId.split('-')[1];
		if (activeIndex > 0) {
			activeIndex--;
			this.setCardIndex(activeIndex);
		}
		this.updateButtons();
	},
	//
	init : function() {
		Ext.log({
			level : 'info',
			msg : 'Quiz controller loaded.'
		});
		
		if (!Object.keys) {
			Object.keys = (function() {
				var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !( {
					toString : null
				}).propertyIsEnumerable('toString'), dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'], dontEnumsLength = dontEnums.length

				return function(obj) {
					if ( typeof obj !== 'object' && typeof obj !== 'function' || obj === null)
						throw new TypeError('Object.keys called on non-object')

					var result = []

					for (var prop in obj) {
						if (hasOwnProperty.call(obj, prop))
							result.push(prop)
					}

					if (hasDontEnumBug) {
						for (var i = 0; i < dontEnumsLength; i++) {
							if (hasOwnProperty.call(obj, dontEnums[i]))
								result.push(dontEnums[i])
						}
					}
					return result
				}
			})()
		};

		this.control({
			'viewport': {
				logincomplete: this.setupAssessment,
				logoutcomplete: this.disableAssessment,
			},
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
			'#bogusbutton' : {
				click : this.reportBogus
			}
		});
	}
});
