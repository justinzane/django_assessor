Ext.application({
    requires: 'Assessor.view.Viewport',
    name: 'Assessor',
    appFolder: 'app',
    models: ['Assessor.model.Choice', 'Assessor.model.Question'],
    stores: ['Assessor.store.Choice', 'Assessor.store.Question'],
    requires: ['Assessor.util.Util'],
    launch: function() {
    	Assessor.util.Util.createStores();
        Ext.create('Assessor.view.Viewport');
        var cp = Ext.ComponentQuery.query('#contentpanel')[0];
        var tg = Ext.create('Assessor.view.TestGrid');
		cp.add(tg);
    }
});