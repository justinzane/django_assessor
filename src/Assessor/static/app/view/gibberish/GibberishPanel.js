Ext.define('Assessor.view.gibberish.GibberishPanel', {
	extend: 'Assessor.view.BasePanel',
	alias: 'widget.gibberishpanel',
	itemId: 'gibberishpanel',
	layout: 'fit',
	loader: {
		url: '/static/app/view/gibberish/gibberish.html',
		autoLoad: true,
		renderer: 'html',
		ajaxOptions: {
			noCache: false,
			disableCache: false
		},
		loadMask: 'Loading Gibberish...'
	}
});
