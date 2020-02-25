//server opstarten in de terminal met hs

import { getData } from './modules/api.js';
import { setNode } from './modules/render.js';
import { setDetailNode } from './modules/render.js';
import { router } from './modules/route.js';

// createNode();

getData()
    .then((results)=> {
        setNode(results);
        setDetailNode(results);
        router();
        console.log(results);
    });