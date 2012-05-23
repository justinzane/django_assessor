Ext.Loader.setConfig({
	disableCaching: false,
	enabled: true
});

Ext.application({
    requires: 'Assessor.view.Viewport',
    name: 'Assessor',
    appFolder: 'app',
    controllers: ['Assessor.controller.Quiz'],
    requires: ['Assessor.view.Viewport'],
    launch: function() {
    	Ext.create('Assessor.view.Viewport');
    }
});