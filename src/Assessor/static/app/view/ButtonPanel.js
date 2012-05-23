Ext.define('Assessor.view.ButtonPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.buttonpanel',
	layout: 'anchor',
	align: 'center',
	bbar: [{
		xtype: 'buttongroup',
		itemId: 'quizbuttongroup',
		items: [{
			xtype: 'button',
			itemId: 'startbutton',
			text: 'Start Quiz',
			disabled: false
		}, {
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
	}]
})