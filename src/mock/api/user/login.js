import { MockMethods, MockResponse } from 'axios-mock-server';

const login = {
    post: async() => {
        let data = {'status': 'success', 'token': 'WpSDe85R'}
        return [200, data]
    }
}

export default login;
