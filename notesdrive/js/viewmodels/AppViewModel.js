function AppViewModel() {
    let self = this;

    self.isLoggedIn = ko.observable(checkUserSession());
}