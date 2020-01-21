// import {expect} from 'chai'
// import {getAllProducts} from './user'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../../history'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {products: []}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)

//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('me', () => {
//     it('eventually dispatches the GET PRODUCT action', async () => {
//       const fakeInstrument = {name: 'Tuba'}
//       mockAxios.onGet('/api/products').replyOnce(200, fakeInstrument)
//       await store.dispatch(getAllProducts())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GOT_ALL_PRODUCTS')
//       expect(actions[0].user).to.be.deep.equal(fakeInstrument)
//     })
//   })

//   // describe('logout', () => {
//   //   it('logout: eventually dispatches the REMOVE_USER action', async () => {
//   //     mockAxios.on('/api/products').replyOnce(204)
//   //     await store.dispatch(logout())
//   //     const actions = store.getActions()
//   //     expect(actions[0].type).to.be.equal('REMOVE_USER')
//   //     expect(history.location.pathname).to.be.equal('/login')
//   //   })
//   // })
// })
