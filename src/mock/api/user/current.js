import { MockMethods, MockResponse } from 'axios-mock-server';

const current = {
    get: async() => {
        let data = {'status': 'success', 'username': 'admin'}
        return [200, data]
    }
}

export default current;
