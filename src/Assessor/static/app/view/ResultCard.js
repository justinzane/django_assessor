Ext.define('Assessor.view.ResultCard', {
	extend: 'Ext.form.Panel',
	alias: 'widget.resultcard',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	autoScroll: true,
	border: false,
	items: [{
		xtype: 'panel',
		itemId: 'resultpanel',
		html: ''
	}, {
		xtype: 'explanationgrid',
		flex: 1,
	}, {
		xtype: 'fieldset',
		layout: 'anchor',
		border: false,
		items: [{
			xtype: 'button',
			itemId: 'restartbutton',
			text: 'Restart Quiz',
			disabled: false
		}]
	}]
})
