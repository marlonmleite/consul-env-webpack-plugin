import consul from 'consul'
import webpack from 'webpack'

class ConsulPlugin {
  constructor (config = {}) {
    this.config = config
    this.consul = consul(config.consul)
  }

  showErrors () {
    throw new Error('Fail to load consul, verify the consul server.')
  }

  buildDefinitions (values = '{}') {
    const envs = JSON.parse(values)
    const defs = {}

    Object.keys(envs).forEach(key => {
      defs[`process.env.${key}`] = JSON.stringify(envs[key])
    })

    return defs
  }

  getDefinitions () {
    const { path } = this.config

    return new Promise((resolve) => {
      this.consul.kv.get(path, (error, item, response) => {
        let defs

        if (error) {
          this.showErrors()
        } else if (!item && response) {
          console.log(response.req._header)

          throw new Error('HTTP status code: 404. Fail to load key/values from the endpoint.')
        } else if (item) {
          defs = this.buildDefinitions(item.Value)
        }

        resolve(defs)
      })
    })
  }

  apply (compiler) {
    compiler.hooks.beforeCompile.tapPromise('ConsulPlugin', async () => {
      const definitions = await this.getDefinitions()

      if (definitions) {
        new webpack.DefinePlugin(definitions).apply(compiler)
      }
    })
  }
}

export default ConsulPlugin
