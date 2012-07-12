Ext.define('Assessor.view.StartCard', {
	extend: 'Ext.form.Panel',
	alias: 'widget.startcard',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	autoScroll: true,
	border: false,
	items: [{
		xtype: 'panel',
		itemId: 'startpanel',
		flex: 1,
		border: false,
		html: '<p>The Assessor is a practice exam for the California BBS ' +  
		'Marriage and Family Therapy License Exam. The real exam consists of 200 ' + 
		'questions. You may choose to try between 5 and 200. Pick how many you ' + 
		'want and click the start button.</p>'
	}, {
		xtype: 'fieldset',
		flex: 0,
		layout: 'hbox',
		border: false,
		items: [{
			xtype: 'numberfield',
			fieldLabel: 'Num. Questions',
			alias: 'widget.numQuestionsField',
			name: 'numQuestions',
			minValue: 5,
			maxValue: 200,
			value: 5,
			step: 5
		}, {
			xtype: 'button',
			itemId: 'startbutton',
			text: 'Start Quiz',
			disabled: false
		}]
	}]
})
