Ext.define('Assessor.view.history.Histogram', {
	extend : 'Ext.chart.Chart',
	store : 'Histogram',
	itemId : 'histogram',
	alias : 'widget.histogram',
	height: 8000,
	legend: {
      position: 'right'
    },
	axes : [{
		title : 'Question ID',
		type : 'Category',
		position : 'left',
		fields : ['question_id']
	}, {
		title : 'Correct',
		type : 'Numeric',
		position : 'top',
		fields : ['correct']
	}, {
		title : 'Incorrect',
		type : 'Numeric',
		position : 'bottom',
		fields : ['incorrect']
	}],
	series : [{
		type : 'bar',
        axis: 'bottom',
        highlight: true,
        label: {
          display: 'insideEnd',
            field: 'correct',
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#00ff00',
            'text-anchor': 'middle'
        },
		xField : ['correct', 'incorrect'],
		yField : 'question_id'
	}]
});
