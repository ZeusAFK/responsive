const importJs = (scripts, index, callback) => {
    var script = document.createElement("script");
    var file = scripts[index];

    console.log('Loading js: ' + file);

    script.src = file;
    document.head.appendChild(script);

    if(++index < scripts.length){
        script.onload = () => importJs(scripts, index, callback);
    }else{
        if(callback){
            script.onload = callback;
        }
    }
}

const api = (axios.default ?? axios).create({ baseURL: 'https://notesdrive-qa.azurewebsites.net/api', timeout: 15_000 });

const scripts = [
    './js/services/auth.service.js',
    './js/components/login-page.component.js',
    './js/components/home-page.component.js',
    './js/viewmodels/AppViewModel.js',
];

importJs(scripts, 0, () => {
    console.log('Starting app');
    ko.applyBindings(new AppViewModel());
});
