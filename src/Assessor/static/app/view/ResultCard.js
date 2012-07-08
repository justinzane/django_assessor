Ext.define('Assessor.view.ResultCard', {
	extend: 'Ext.form.Panel',
	alias: 'widget.resultcard',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	autoScroll: true,
	items: [{
		xtype: 'panel',
		itemId: 'resultpanel',
		flex: 1,
		html: ''
	}, {
		xtype: 'explanationgrid',
		flex: 4,
	}, {
		xtype: 'fieldset',
		flex: 0,
		layout: 'anchor',
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
