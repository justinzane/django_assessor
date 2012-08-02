Ext.define('Assessor.view.Viewport', {
	extend: 'Ext.container.Viewport',
	itemId: 'viewport',
	requires: [
		'Assessor.view.Header',
		'Assessor.view.auth.LoginPanel'
	],
	layout: 'border',
	items: [{
		xtype: 'headerpanel',
		region: 'north'
	}, {
		xtype: 'panel',
		region: 'center',
		alias: 'widget.contentpanel',
		itemId: 'contentpanel',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		border: false,
		items: [{
			xtype: 'loginpanel',
			flex: 1
		}]
	}]
})
