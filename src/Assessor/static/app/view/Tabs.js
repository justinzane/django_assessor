Ext.define('Assessor.view.Tabs', {
	requires : [
		'Assessor.view.BasePanel', 
		'Assessor.view.gibberish.GibberishPanel',
		'Assessor.view.result.ResultPanel'
	],
	extend : 'Ext.tab.Panel',
	alias : 'widget.tabs',
	itemId : 'tabs',
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	items : [{
		xtype : 'basepanel',
		title : 'Account',
		itemId : 'accountPanel',
		items : [{
			xtype : 'loginpanel',
			flex : 1
		}]
	}, {
		xtype : 'basepanel',
		title : 'Assessment',
		itemId : 'assessmentPanel',
		disabled: true
	}, {
		xtype : 'resultpanel'
	}, {
		xtype : 'basepanel',
		title : 'History',
		itemId : 'historyPanel',
		disabled: true
	}, {
		xtype : 'gibberishpanel',
		title : 'Gibberish'
	}]
});
