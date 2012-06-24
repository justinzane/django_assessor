Ext.define('Assessor.view.StartCard', {
	extend: 'Ext.form.Panel',
	alias: 'widget.startcard',
	layout: 'anchor',
	items: [{
		xtype: 'numberfield',
		fieldLabel: 'Number of Questions',
		alias: 'widget.numQuestionsField',
		name: 'numQuestions',
		minValue: 10,
		maxValue: 200,
		value: 20,
		step: 5
	}, {
		xtype: 'button',
		itemId: 'startbutton',
		text: 'Start Quiz',
		disabled: false
	}],
	html: '<h2>The Assessor</h2>' + 
		'<p>The Assessor is a practice exam for the California BBS ' +  
		'Marriage and Family Therapy License Exam. The real exam consists of 200 ' + 
		'questions. You may choose to try between 10 and 200. Pick how many you ' + 
		'want and click the start button.</p>'
})
