A webpack plugin that convert the [KV Store Endpoints](https://www.consul.io/api/kv.html) in environment variables.

The KV Store Endpoints is a feature of [consul.io](https://www.consul.io).

<div align="center">
  <h1>
    <img width="30" heigth="30" src="https://www.consul.io/assets/images/og-image-6ef0ad8b.png" alt="dotenv" />
    <img width="30" heigth="30" src="https://webpack.js.org/assets/icon-square-big.svg" alt="webpack">
    consul-env-webpack-plugin
  </h1>
</div>

### Installation

Include the package locally in your repository.


```
npm install consul-env-webpack-plugin -D

yarn add consul-env-webpack-plugin -D
```

### Description

`consul-env-webpack-plugin` wraps [node-consul](https://github.com/silas/node-consul) and `Webpack.DefinePlugin`. As such, it takes the  `JSON` from the `consul server` and parse the keys to `process.env` with `Webpack.DefinePlugin`.

### Usage

The plugin can be installed with little configuration needed. Once installed, you can access the variables within your code using `process.env`.

The example bellow shows a standard use-case

> ##### Configure the JSON in your consul server
```json
{
  "MY_API": "https://10.5.1.1"
}
```

> ##### Add it to your Webpack config file
```javascript
// webpack.config.js
const ConsulPlugin = require('consul-env-webpack-plugin')

module.exports = {
  ...
  plugins: [
    new ConsulPlugin({
      url: 'config/front/data', //path to keys
      consul: {
        ... //node-consul options - see https://github.com/silas/node-consul
      }
    })
  ]
  ...
};
```

> ##### Use in your code

```javascript
// provider.js
console.log(process.env.MY_API);
// 'https://10.5.1.1'
```

### Properties

Use the following properties to configure your instance.

* **path** (`'config/front/data'`) - The path API to your data endpoints.
* **consul** (`options`) - This options are necessary to config your consul, see default options in [node-consul](https://github.com/silas/node-consul#init).

The following example shows how to set any/all arguments.

```javascript
module.exports = {
  ...
  plugins: [
    new ConsulPlugin({
      path: 'config/front/data',
      consul: null //load the default options of node-consul
    })
  ]
  ...
};
```