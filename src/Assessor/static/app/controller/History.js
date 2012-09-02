Ext.define('Assessor.controller.History', {
	extend : 'Ext.app.Controller',
	itemId : 'historycontroller',
	id : 'historycontroller',
	models : ['PerCatResults'],
	stores : ['PerCatResults'],
	views : ['history.PerCatResults'],

	// Custom Functions
	setupHistogram : function() {
		var hp = Ext.ComponentQuery.query('#historyPanel')[0];
		hp.removeAll();
		hp.add({
			xtype : 'histogram',
			flex : 1
		});
		hp.enable();
	}, 

	setupPerCatResultsChart : function() {
		var hp = Ext.ComponentQuery.query('#historyPanel')[0];
		hp.removeAll();
		hp.add({
			xtype : 'percatresultschart',
			flex : 1
		});
		hp.enable();
	},

	setupHistogramStore : function() {
		var hs = Ext.getStore('Histogram');
		var hsMask = Ext.create('Ext.LoadMask', Ext.ComponentQuery.query('viewport')[0], {
			store : hs,
			msg : "Loading Histogram"
		});
		hs.proxy.headers['X-Username'] = Assessor.username;
		hs.proxy.headers['X-Password'] = Assessor.password;
		hs.load({
			scope : this,
			params : {},
			callback : function() {
				this.setupHistogram();
			}
		});
	}, 

	setupPerCatResultsStore : function() {
		var pcrs = Ext.getStore('PerCatResults');
		var pcrsMask = Ext.create('Ext.LoadMask', Ext.ComponentQuery.query('viewport')[0], {
			store : pcrs,
			msg : "Loading Results..."
		});
		pcrs.proxy.headers['X-Username'] = Assessor.username;
		pcrs.proxy.headers['X-Password'] = Assessor.password;
		pcrs.load({
			scope : this,
			params : {},
			callback : function() {
				this.setupPerCatResultsChart();
			}
		});
	},

	init : function() {
		Ext.log({
			level : 'info',
			msg : 'History controller loaded.'
		});
		
		this.control({
			'viewport' : {logincomplete : this.setupPerCatResultsStore}
		});
	}
});
