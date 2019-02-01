import '../../unit-test/fixture/consul'
import webpack from 'webpack'
import ConsulPlugin from '../'

test('show fail load consul', () => {
  const consul = new ConsulPlugin()
  const showError = () => {
    consul.showErrors()
  }

  expect(showError).toThrow('Fail to load consul, verify the consul server.')
})

test('get empty definitions', () => {
  const consul = new ConsulPlugin()

  expect(consul.buildDefinitions()).toEqual({})
})

test('get valid definitions', () => {
  const consul = new ConsulPlugin()
  const data = '{ "prop": true }'
  const result = { "process.env.prop": "true" }

  expect(consul.buildDefinitions(data)).toEqual(result)
})

test('load definitions with error', () => { 
  const consul = new ConsulPlugin({ path: true })
  const error = new Error('Fail to load consul, verify the consul server.')

  expect.assertions(1);
  
  return expect(consul.getDefinitions()).rejects.toEqual(error);
})

test('load definitions with error', () => { 
  const consul = new ConsulPlugin({ path: 'front/data' })
  const result = { "process.env.prop": "true" }

  expect.assertions(1);

  return consul.getDefinitions().then(defs => expect(defs).toEqual(result))
})

test('should apply compiler', () => {
  const tapPromise = jest.fn()
  const compiler = { hooks: { beforeCompile: { tapPromise } } }
  const consul = new ConsulPlugin()

  consul.apply(compiler)

  expect(tapPromise).toHaveBeenCalled()
})
