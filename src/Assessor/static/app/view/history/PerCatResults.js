Ext.define('Assessor.view.history.PerCatResults', {
	extend : 'Ext.chart.Chart',
	store : 'PerCatResults',
	itemId : 'percatresultschart',
	alias : 'widget.percatresultschart',
	legend : {
		position : 'right'
	},
	axes : [{
		title : 'Category',
		type : 'Category',
		position : 'left',
		fields : ['category']
	}, {
		title : 'Correct % / Incorrect %',
		type : 'Numeric',
		position : 'bottom',
		label : {
			renderer : Ext.util.Format.numberRenderer('0.0')
		},
		fields : ['correct', 'incorrect'],
		minimum : 0,
		grid : true
	}],
	series : [{
		type : 'bar',
		axis : 'bottom',
		highlight : true,
		stacked : true,
		label : [{
			display : 'insideEnd',
			field : 'correct',
			renderer : Ext.util.Format.numberRenderer('0.0'),
			orientation : 'horizontal',
			color : '#7fff7f',
			'text-anchor' : 'left'
		}, {
			display : 'insideEnd',
			field : 'incorrect',
			renderer : Ext.util.Format.numberRenderer('0.0'),
			orientation : 'horizontal',
			color : '#ff7f7f',
			'text-anchor' : 'right'
		}],
		yField : ['correct', 'incorrect'],
		xField : 'category'
	}]
});
