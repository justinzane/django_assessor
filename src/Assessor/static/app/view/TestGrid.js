Ext.define('Assessor.view.TestGrid',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.testgrid',
	title: 'TestStore',
	store: 'choicestore',
	columns: {
		items: [{
			text: 'id',
			dataIndex: 'id',
		}, {
			text: 'question',
			dataIndex: 'question',
		}, {
			text: 'text',
			dataIndex: 'text'
		}, {
			text: 'is_correct',
			dataIndex: 'is_correct',
		}]
	}
})
