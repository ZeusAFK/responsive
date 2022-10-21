ko.components.register('home-page', {
    template: { element: 'home-page-template' },
    viewModel: function(params) {
        let self = this;

        self.logout = () => {
            removeUserSession();
            params.trigger(false);
        }
    }
});