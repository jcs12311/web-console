var WebConsole = function(params) {
    var defaults = {
        methods: ['log', 'error', 'warn', 'time', 'timeEnd'], // console methods
    }

    var p = {};
    for(var def in defaults) {
         if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
    this.params = params;
    
    if (!this.params.host) {
        console.error('you must specfiy a host to connect');
    }
    
    var socket = io(this.params.host);

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
    var methods = this.params.methods;
    methods.forEach(function(method) {
        bindConsoleWidthSocket(method);
    });
}