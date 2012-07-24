Ext.define('Assessor.view.Viewport', {
	extend: 'Ext.container.Viewport',
	itemId: 'viewport',
	requires: [
		'Assessor.view.Header',
		'Assessor.view.Footer',
//		'Assessor.view.IndexPanel',
//		'Assessor.view.IndexMenu',
		'Assessor.view.ButtonPanel',
		'Assessor.view.QuizCards',
		'Assessor.view.StartCard',
		'Assessor.view.QuestionCard'],
	layout: 'border',
	items: [{
		xtype: 'headerpanel',
		region: 'north'
	}, {
		xtype: 'panel',
		region: 'center',
		alias: 'widget.contentpanel',
		id: 'contentpanel',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		border: false,
		items: [{
			xtype: 'quizcards',
			flex: 1
		}, {
			xtype: 'buttonpanel',
		}]
	}]
})
