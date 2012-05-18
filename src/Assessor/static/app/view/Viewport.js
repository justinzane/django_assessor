Ext.define('Assessor.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: ['Assessor.view.Header', 'Assessor.view.Footer'],
	layout: 'border',
	padding: 5,
	items: [{
		xtype: 'headerpanel',
		region: 'north'
	}, {
		xtype: 'panel',
		region: 'center',
		alias: 'widget.contentpanel',
		id: 'contentpanel',
		items: []
	}, {
		xtype: 'footerpanel',
		region: 'south'
	}]
})
