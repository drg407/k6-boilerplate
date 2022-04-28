/*
    Stress testing (sometimes called torture testing) is a form of 
    deliberately intense or thorough testing used to determine the 
    stability of a given system, critical infrastructure or entity. 
    It involves testing beyond normal operational capacity, often 
    to a breaking point, in order to observe the results.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '2m', target: 100 }, // below normal load
        { duration: '5m', target: 100 }, // sustain 2 minutes below normal load
        { duration: '2m', target: 200 }, // scale up in 2 minutes to normal load
        { duration: '5m', target: 200 }, // sustain normal load for 5 minutes
        { duration: '2m', target: 300 }, // scale up in 2 minutes to threshold load
        { duration: '5m', target: 300 }, // sustain threshold load for 5 minutes
        { duration: '2m', target: 400 }, // scale up in 2 minutes beyond beyond threshold
        { duration: '5m', target: 400 }, // sustain beyond threshold load for 5 minutes
        { duration: '10m', target: 0 },  // scale down in 2 minutes
    ]
};

const BASE_URL = 'https://test.k6.io';

export default () => {
    const res = http.get(BASE_URL);
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
};