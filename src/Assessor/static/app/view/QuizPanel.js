Ext.define('Assessor.view.QuizPanel', {
	extend: 'Ext.form.Panel',
	alias: 'widget.quizpanel',
	layout: 'anchor',
	items: [{
		xtype: 'displayfield',
		itemId: 'questionfield',
		name: 'questionfield',
		fieldLabel: 'Question',
		value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin, mauris et consectetur congue, est diam lacinia nulla, at porttitor felis lorem at massa. Aenean blandit dolor non magna tincidunt vel laoreet purus aliquam. Vestibulum elit dolor, egestas at varius non, aliquet id velit. Praesent pellentesque augue at odio elementum ornare. Ut malesuada rhoncus tincidunt. Nullam accumsan, magna vel elementum congue, quam tellus convallis sem, quis ultricies nulla mi nec purus. Donec tempor neque pretium nunc convallis nec tempus dui cursus. Aenean risus odio, pellentesque ut tincidunt nec, mollis ut lorem.'
	}, {
		xtype: 'radiogroup',
		itemId: 'choicegroup',
		columns: 1,
		vertical: true,
		items: [{
			boxLabel: 'This is a possible answer.',
			name: 'choice',
			value: 1
		}, {
			boxLabel: 'This is another possible answer.',
			name: 'choice',
			value: 2
		}, {
			boxLabel: 'This is also a possible answer.',
			name: 'choice',
			value: 3
		}]
	}]
})
