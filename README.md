# web-console

`npm install jsweb-console -g`

1.on shell run `jsweb-console`

2.add script to you website

```
<script src="http://127.0.0.1:3000/node_modules/socket.io-client/socket.io.js"></script>
<script src="http://127.0.0.1:3000/web-console.js"></script>
<script type="text/javascript">
    new WebConsole({
        host: "http://192.168.88.32:3000",
        methods: ['log', 'error', 'warn', 'time', 'timeEnd']// default is ['log', 'error', 'warn']
    })
</script>
```

3.open http://127.0.0.1:3000 and try to log something on your website

4.you will see your log result on http://127.0.0.1:3000 Browser Console panel
