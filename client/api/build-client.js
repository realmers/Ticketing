import axios from "axios";

export default ({ req }) => {
    if (typeof window === 'undefined'){
        // we're on the server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // we're on the browser
        return axios.create({
            baseURL: '/'
        });
    }
};