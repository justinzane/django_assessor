Ext.define('Assessor.controller.Result', {
	extend : 'Ext.app.Controller',
	itemId : 'resultcontroller',
	id : 'resultcontroller',
	models : ['Explanation'],
	stores : ['Explanation'],
	views : [],

	// Custom Functions
	/**
	 * @param {float} score: 0.0 <= score <= 1.0
	 */
	showScore: function(score) {
		var ss = Ext.ComponentQuery.query('#scorestatus')[0];
		var scoreContent = 'Score: <b>' + (100.0 * score) + '% ';
		if (score >= 0.70) {
			ss.style = {backgroundColor: '#7fff7f'};
			ss.setStatus(scoreContent + 'PASS</b>');
		} else {
			ss.style = {backgroundColor: '#ff7f7f'};
			ss.setStatus(scoreContent + 'FAIL</b>');
		}
		this.showExplanations();
	},
	
	showExplanations: function() {
		var es = Ext.getStore('Explanation');
		es.load();
		var rp = Ext.ComponentQuery.query('#resultpanel')[0];
		var tp = Ext.ComponentQuery.query('#tabs')[0];
		tp.setActiveTab(rp);
	},

	init : function() {
		Ext.log({
			level : 'info',
			msg : 'Result controller loaded.'
		});
		
		this.control({
		});
	}
});
