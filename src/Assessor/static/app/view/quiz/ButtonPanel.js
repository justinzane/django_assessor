Ext.define('Assessor.view.quiz.ButtonPanel', {
	extend: 'Ext.panel.Panel',
	requires: 'Assessor.view.quiz.TimerBar',
	alias: 'widget.buttonpanel',
	bbar: [{
		xtype: 'buttongroup',
		itemId: 'quizbuttongroup',
	layout: 'hbox',
	width: '100%',
		items: [{
			xtype: 'button',
			itemId: 'prevbutton',
			text: 'Previous',
			disabled: true
		}, {
			xtype: 'button',
			itemId: 'nextbutton',
			text: 'Next',
			disabled: true
		}, {
			xtype: 'button',
			itemId: 'finishbutton',
			text: 'Finish',
			disabled: true
		}, {
			xtype: 'button',
			itemId: 'bogusbutton',
			text: 'Report Bogosity',
			disabled: true
		}, {
			xtype: 'timerbar',
			itemId: 'timerbar',
			flex: 1
		}, {
			xtype: 'button',
			itemId: 'restartbutton',
			text: 'Restart Quiz',
			disabled: true
		}]
	}]
});
