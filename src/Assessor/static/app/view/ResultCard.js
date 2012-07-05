Ext.define('Assessor.view.ResultCard', {
	extend: 'Ext.form.Panel',
	alias: 'widget.resultcard',
	layout: 'anchor',
	autoScroll: true,
	items: [{
		xtype: 'panel',
		itemId: 'resultpanel',
		html: ''
	}, {
		xtype: 'explanationgrid',
		colspan: 2,
		anchor: '100%'
	}, {
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
})
