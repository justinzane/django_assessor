Ext.define('Assessor.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Assessor.view.Header', 
		'Assessor.view.Footer',
		'Assessor.view.IndexPanel',
		'Assessor.view.IndexMenu',
		'Assessor.view.ButtonPanel',
		'Assessor.view.QuizCards',
		'Assessor.view.QuestionCard'],
	layout: 'border',
	padding: 5,
	items: [{
		xtype: 'headerpanel',
		region: 'north'
	}, {
		xtype: 'indexpanel',
		split: 'true',
		width: 200,
		region: 'west'
	}, {
		xtype: 'panel',
		region: 'center',
		alias: 'widget.contentpanel',
		id: 'contentpanel',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'quizcards',
			flex: 85
		}, {
			xtype: 'buttonpanel',
			flex: 15
		}]
	}, {
		xtype: 'footerpanel',
		region: 'south'
	}]
})
