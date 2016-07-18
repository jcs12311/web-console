window.WebConsole = function(params) {
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
            var args = [].slice.apply(arguments);
            switch (method) {
                /* navtive time timeEnd was not accuracy
                because network delay, so need to send Date.now() */
                case 'time':
                case 'timeEnd':
                    args = [Date.now()].concat(args);
                    break;
                default:
                    //donothig
            }
            socket.emit('echo', {
                type: method,
                args: args
            })
            oldMethod.apply(console, arguments);
        }
    }
    var methods = this.params.methods;
    methods.forEach(function(method) {
        bindConsoleWidthSocket(method);
    });
}