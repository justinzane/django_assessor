Ext.define('Assessor.view.IndexPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.indexpanel',
	itemId: 'indexpanel',
	layout: 'anchor',
	autoScroll: true,
	items: [{
		xtype: 'indexmenu'
	}]
})
