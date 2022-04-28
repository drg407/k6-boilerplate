/*
    Load testing generally refers to the practice of modeling the expected 
    usage of a software program by simulating multiple users accessing the 
    program concurrently. As such, this testing is most relevant for 
    multi-user systems; often one built using a client/server model, such 
    as web servers.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '5m', target: 100 }, // scale up in 5 minutes to normal load
        { duration: '10m', target: 100 }, // sustain 10 minutes at normal load
        { duration: '5m', target: 0 }, // scale down in 5 minutes
    ],
    thresholds: {
        'http_req_duration': ['p(99)<150'], // 99% of requests must complete below 150ms
    }
};

const BASE_URL = 'https://test.k6.io';

export default () => {
    http.get(`${BASE_URL}/endpoint1`);
    sleep(1);
};