// Models
window.Choice = Backbone.Model.extend();
 
window.ChoiceCollection = Backbone.Collection.extend({
    model:Choice,
    url:"/api/v1/choice/"
});
 
// Views
window.ChoiceListView = Backbone.View.extend({
    tagName:'ul',
    initialize:function () {
        this.model.bind("reset", this.render, this);
    },
    render:function (eventName) {
        _.each(this.model.models, function (choice) {
            $(this.el).append(new ChoiceListItemView({model:choice}).render().el);
        }, this);
        return this;
    }
});
 
window.ChoiceListItemView = Backbone.View.extend({
    tagName:"li",
    template:_.template($('#tpl-choice-list-item').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
 
});
 
window.ChoiceView = Backbone.View.extend({
    template:_.template($('#tpl-choice-details').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
 
});
 
// Router
var AppRouter = Backbone.Router.extend({
    routes:{
        "":"list",
        "choices/:id":"choiceDetails"
    },
    list:function () {
        this.choiceList = new ChoiceCollection();
        this.choiceListView = new ChoiceListView({model:this.choiceList});
        this.choiceList.fetch();
        $('#sidebar').html(this.choiceListView.render().el);
    },
    choiceDetails:function (id) {
        this.choice = this.choiceList.get(id);
        this.choiceView = new ChoiceView({model:this.choice});
        $('#content').html(this.choiceView.render().el);
    }
});
 
var app = new AppRouter();
Backbone.history.start();