/*
    Soak testing involves testing a system with a typical production 
    load, over a continuous availability period, to validate system 
    behavior under production use. It may be required to extrapolate 
    the results, if not possible to conduct such an extended test.
*/

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '2m', target: 400 }, // scale up to threshold load
        { duration: '3h56m', target: 400 }, // sustain ~4 hours at load
        { duration: '2m', target: 0 }, // scale down to 0
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