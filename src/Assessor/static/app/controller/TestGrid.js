Ext.define('Assessor.controller.TestGrid', {
	extend: 'Ext.app.Controller',
	requires: ['Assessor.model.Choice', 'Assessor.proxy.BaseRest', 'Assessor.store.Choice', 'Assessor.view.TestGrid'],
	init: function(){
		console.log('controller.TestGrid init');
		var cp = Ext.ComponentQuery.query('contentpanel')[0]
		cp.add(Ext.create(Assessor.view.TestGrid));
	}
})
