#### loader

loaders in require：

``` javascript
require('./loader!./dir/file.txt');

require('jade!./template.jade');

require('!style!css!less!bootstrap/less/bootstrap.less');
```



loader in Configuration

``` javascript
{
    module: {
        loaders: [
            { test: /\.jade$/, loader: 'jade' },
            // => "jade" loader is used for ".jade' files
            { test: /\.css/, loader: 'style!css' },
            // => "style" and "css" loader is used for ".css" files
            // Alternative syntax;
            { test: /\.css/, loader: ['style', 'css'] }
        ]
    }
}
```

