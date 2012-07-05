Ext.define('Assessor.view.ExplanationGrid', {
	extend: 'Ext.grid.Panel',
	title: 'Explanations',
	alias: 'widget.explanationgrid',
	store: 'Explanation',
	columns: [
		{header: 'Question', dataIndex: 'question', flex: 0.3},
		{header: 'Your Choice', dataIndex: 'choice', flex: 0.2},
		{header: 'Explanation', dataIndex: 'explanation', flex: 0.5}
	],
	autoHeight: true,
	autoRender: true,
	flex: 1
})
