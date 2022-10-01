/* eslint-disable */
import mockServer from 'axios-mock-server'
import mock0 from './api/user/login'
import mock1 from './api/user/current'

export default (client) => mockServer([
  {
    path: '/api/user/login',
    methods: mock0
  },
  {
    path: '/api/user/current',
    methods: mock1
  }
], client, '')
