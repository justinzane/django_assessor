Ext.define('Assessor.controller.Quiz', {
	extend : 'Ext.app.Controller',
	itemId : 'quizcontroller',
	id: 'quizcontroller',
	models : ['User', 'Question', 'Choice', 'Explanation', 'Answer'],
	stores : ['User', 'Question', 'Choice', 'Explanation', 'Answer'],
	views : [
		'auth.LoginPanel', 
		'quiz.ButtonPanel',
		'quiz.ExplanationGrid', 
		'quiz.QuestionCard', 
		'quiz.QuizCards',
		'quiz.ResultCard', 
		'quiz.StartCard', 
		'quiz.TimerBar'
	],

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
	 * Setup the timer task
	 */
	startTimer: function (num) {
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
				elText = elTimeMin + ":" + elTimeSec + " elapsed"
				timerBar.updateProgress(progress, elText);
			}
		};
		var timerTask = Ext.TaskManager.start({
			itemId: 'timertask',
			run: updateTimer,
			interval: 2000,
			duration: totalTime * 1000
		});
	},
	/** clear the login panel and start the quiz. */
	finishLogin: function() {
		var cp = Ext.ComponentQuery.query('#contentpanel')[0];
		cp.removeAll();
		cp.add({
			xtype: 'quizcards',
			flex: 1
		});
		cp.add({
			xtype: 'buttonpanel'
		});
	},
	/** clear the login panel and start the quiz. */
	showLogin: function() {
		var cp = Ext.ComponentQuery.query('#contentpanel')[0];
		cp.removeAll();
		cp.add({
			xtype: 'loginpanel',
			flex: 1
		});
	},
	/** start the quiz */
	startQuiz : function (args) {
		// find number requested
		var numQuestions = Ext.ComponentQuery.query('numberfield')[0].value;
		// remove startCard
		Ext.ComponentQuery.query('quizcards')[0].removeAll();
		// load numQuestions records from store.Questions
		var qs = Ext.getStore('Question');
		var qsMask = Ext.create('Ext.LoadMask', 
								Ext.ComponentQuery.query('viewport')[0],
								{store: qs, msg: "Loading Questions"}
								);
		qs.proxy.headers['X-Username'] = Assessor.username;
		qs.proxy.headers['X-Password'] = Assessor.password;
		qs.load({
			scope: this,
			params: {
				limit: numQuestions
			},
			callback: function () {
				this.createQuestionCards(numQuestions);
				this.startTimer(numQuestions);
				this.updateButtons();
			}
		});
		var cs = Ext.getStore('Choice');
		var csMask = Ext.create('Ext.LoadMask', 
								Ext.ComponentQuery.query('viewport')[0],
								{store: cs, msg: "Loading Choices"}
								);
		cs.proxy.headers['X-Username'] = Assessor.username;
		cs.proxy.headers['X-Password'] = Assessor.password;
		var us = Ext.getStore('User');
		var usMask = Ext.create('Ext.LoadMask', 
								Ext.ComponentQuery.query('viewport')[0],
								{store: us, msg: "Loading Users"}
								);
		us.proxy.headers['X-Username'] = Assessor.username;
		us.proxy.headers['X-Password'] = Assessor.password;
		us.load();
		var as = Ext.getStore('Answer');
		as.proxy.headers['X-Username'] = Assessor.username;
		as.proxy.headers['X-Password'] = Assessor.password;
		
	},
	/**
	 * REstart the quiz
	 */
	reStartQuiz : function (args) {
		Ext.ComponentQuery.query('#restartbutton')[0].hide();
		//TODO: Actually restart
		location.reload();
	},
	/**
	 * callback to create radiogroups with data from association store
	 */
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
			//var rg = Ext.create('Ext.form.RadioGroup', {
			var rg = Ext.create('Ext.form.CheckboxGroup', {
				itemId : 'choicegroup-' + qs.getAt(i).data['id'],
				alias : 'widget.choicegroup-' + qs.getAt(i).data['id'],
				columns : 1,
				vertical : true
			});
			var qs_cs = qs.getAt(i).getChoices();
			qs_cs.load({
				callback: this.createRadioGroup,
				addRecords: true
			});
			var card = Ext.create('Assessor.view.quiz.QuestionCard', {
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
	recordAnswer: function(questionId, choiceId, userId) {
		var answer = Ext.create('Assessor.model.Answer', {
			question_id: "/api/v1/question/" + questionId + "/",
			choice_id: "/api/v1/choice/" + choiceId + "/",
			user_id: "/api/v1/user/" + userId + "/"
		});
		answer.save();
//		Ext.getStore('Answer').add(answer);
	},
	/**
	 * finishQuiz -- finishes and scores the quiz
	 * @param {Object} args
	 */
	finishQuiz : function(args) {
		Ext.TaskManager.stopAll();
		this.disableButtons();
		Ext.ComponentQuery.query('#restartbutton')[0].show();
		var cs = Ext.getStore('Choice');
		var es = Ext.getStore('Explanation');
		var qs = Ext.getStore('Question');
		var us = Ext.getStore('User');
		//
		var userId = us.data.getAt(us.find('username',Assessor.username)).data['id']
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
				this.recordAnswer(qs.getById(questionId).data['id'],
								  qs.getById(questionId).getChoices().getById(selectedId).data['id'],
								  userId
								 );
				if (qs.getById(questionId).getChoices().getById(selectedId).data['is_correct']) {
					num_correct += 1;
				} else {
					var exp = Ext.create('Assessor.model.Explanation', {
						question: qs.getById(questionId).data['text'],
						choice: qs.getById(questionId).getChoices().getById(selectedId).data['text'],
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
		rc = Ext.create('Assessor.view.quiz.ResultCard', {});
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
	attemptLogin: function() {
        var form = Ext.ComponentQuery.query('#loginpanel')[0].form;
        if (form.isValid()) {
            form.submit({
            	headers: {'X-CSRFToken': Ext.util.Cookies.get('csrftoken')},
                success: function(form, action) {
                   	Assessor.username = Ext.ComponentQuery.query('#usernamefield')[0].value;
					Assessor.password = Ext.ComponentQuery.query('#passwordfield')[0].value;
					//console.info('logged in.');
					Assessor.controller.Quiz.prototype.finishLogin();
                },
                failure: function(form, action) {
                    Ext.ComponentQuery.query('#loginpanel')[0].form.reset();
					Ext.Msg.alert('Invalid username or password.');
                }
            });
        }
    },
	//
	attemptLogout: function() {
		Ext.Ajax.request({
		    url: '/auth/logout',
		    headers: {'X-CSRFToken': Ext.util.Cookies.get('csrftoken')},
            params: {},
		    success: function(response){
		        console.info(response);
		        Assessor.username = null;
		        Assessor.password = null;
		        Assessor.controller.Quiz.prototype.showLogin();
		    },
            failure: function(response) {
				Ext.Msg.alert('Logout failed! This is a bug!');
            }
		});
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
			'#restartbutton' : {
				click : this.reStartQuiz
			},
			'#finishbutton' : {
				click : this.finishQuiz
			},
			'#loginbutton' : {
				click : this.attemptLogin
			},
			'#logoutbutton' : {
				click : this.attemptLogout
			}
		})
	}
})
