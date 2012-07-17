Ext.define('Assessor.view.TimerBar', {
	extend: 'Ext.ProgressBar',
	alias: 'widget.timerbar',
	autoRender: false,
	autoWidth: true,
	minWidth: 100,
	/**
	 * For the BBS MFT Exam, 4 hours/200 questions
	 */
	secPerQuestion: 144.0,
	/**
	 * Returns time for a given number of questions based on the factor 
	 * secPerQuestion
	 * @param {Object} num
	 */
	numToTime: function(num) {
		if (num <= 0) {
			console.warn("Non-positive number.");
			return 0;
		} else {
			return (this.secPerQuestion * num);
		}
	}
})
