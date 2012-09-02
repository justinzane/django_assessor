Ext.define('Assessor.view.Viewport', {
	extend : 'Ext.container.Viewport',
	itemId : 'viewport',
	requires : [],
	layout : 'border',
	items : [{
		xtype : 'headerpanel',
		region : 'north'
	}, {
		xtype : 'tabs',
		region : 'center'
	}]
});
