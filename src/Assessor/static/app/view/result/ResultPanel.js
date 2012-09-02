Ext.define('Assessor.view.result.ResultPanel', {
	extend: 'Assessor.view.BasePanel',
	alias: 'widget.resultpanel',
	itemId: 'resultpanel',
	title : 'Results',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	bbar: {
        xtype: 'statusbar',
        itemId: 'scorestatus',
        defaultText: ''
    },
	items: [{
		xtype: 'explanationgrid',
		flex: 1
	}]
});
