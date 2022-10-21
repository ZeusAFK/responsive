ko.components.register('login-page', {
    template: { element: 'login-page-template' },
    viewModel: function(params) {
        let self = this;

        self.email = ko.observable();
        self.password = ko.observable();
        self.loginError = ko.observable(false);
        self.loading = ko.observable(false);
        self.errorMessage = ko.observable();

        self.login = () => {
            let request = { email: self.email(), password: self.password() };
            self.loading(true);
            authenticate(request)
            .then(({ data }) => {
                setUserSession(data.token, data);

                self.loginError(false);
                
                Toastify({
                    text: `Welcome ${data.firstname}  ${data.lastname}`,
                    duration: 3000
                }).showToast();
                
                params.trigger(true);
            }).catch((error) => {
                console.log(error);
                self.loginError(true);
                self.errorMessage(error.response.status == 400 ? 'Invalid email or password' : error.message);
            }).then(() => self.loading(false));
        }
    }
});