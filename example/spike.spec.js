/*
    Spike testing is a type of performance testing in which an application receives 
    a sudden and extreme increase or decrease in load. The goal of spike testing is 
    to determine the behavior of an application when it receives extreme variations
    in traffic.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '10s', target: 100 }, // below normal load
        { duration: '1m', target: 100 }, // sustain 1 minute below normal load
        { duration: '10s', target: 1400 }, // spike to 1400 users
        { duration: '3m', target: 1400 }, // sustain 1400 users for 3 minutes
        { duration: '10s', target: 100 }, // scale down to 100 users
        { duration: '3m', target: 100 }, // sustain 100 users for 3 minutes
        { duration: '10s', target: 0 }, // scale down to 0 users
    ]
};

const BASE_URL = 'https://test.k6.io';

export default () => {
    http.batch([
        ['GET', `${BASE_URL}/endpoint1`],
        ['GET', `${BASE_URL}/endpoint2`],
        ['GET', `${BASE_URL}/endpoint3`],
    ]);
    sleep(1);
};