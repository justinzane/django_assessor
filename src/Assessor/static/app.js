Ext.Loader.setConfig({
	disableCaching : false,
	enabled : true
});

Ext.application({
	name : 'Assessor',
	appFolder : 'app',
	controllers : [
		'Assessor.controller.Auth', 
		'Assessor.controller.Quiz', 
		'Assessor.controller.Result',
		'Assessor.controller.History'
	],
	requires : [
		'Ext.ux.statusbar.StatusBar', 
		'Assessor.view.Viewport'
	],
	launch : function() {
		Ext.create('Assessor.view.Viewport');
	}
}); 