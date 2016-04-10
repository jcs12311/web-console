var WebConsole = function() {
    var implement = function(host, params) {
        if (!host) {
            console.error('you must specfiy a host to connect');
        }
        var defaults = {
            methods: ['log', 'error', 'warn', 'time', 'timeEnd'], // console methods
        }
        var p = params ? params : {};
        for (var def in defaults) {
            if (!p.hasOwnProperty(def)) {
                p[def] = defaults[def];
            }
        }
        var socket = io(host);

        function bindConsoleWidthSocket(method) {
            var oldMethod = console[method];
            console[method] = function() {
                socket.emit('echo', {
                    type: method,
                    args: arguments
                })
                oldMethod.apply(console, arguments);
            }
        }
        var methods = p.methods;
        methods.forEach(function(method) {
            bindConsoleWidthSocket(method);
        });
    }

    return {
        implement: implement
    }
}
