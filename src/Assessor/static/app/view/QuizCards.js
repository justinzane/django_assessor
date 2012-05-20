Ext.define('Assessor.view.QuizCards', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.quizcards',
	itemId: 'quizcards',
	layout: 'card',
	bbar: [{
		xtype: 'buttongroup',
		itemId: 'quizbuttongroup',
		items: [{
			xtype: 'button',
			itemId: 'prevbutton',
			text: 'Previous Question',
			disabled: true
		}, {
			xtype: 'button',
			itemId: 'nextbutton',
			text: 'Next Question',
			disabled: true
		}, {
			xtype: 'button',
			itemId: 'finishbutton',
			text: 'Finish Quiz',
			disabled: true
		}]
	}],
	items: [{
		xtype: 'quizpanel'
	}]
})
