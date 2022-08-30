import axios from 'axios';

// export const apiAcc = axios.create({
//     baseURL: process.env.REACT_APP_ACCOUNT_SERVICE,
// });

// export const apiQuiz = axios.create({
//     baseURL: process.env.REACT_APP_QUIZ_SERVICE,
// });

export const apiAcc = axios.create({
        baseURL: 'http://localhost:8091',
    });
    
    export const apiQuiz = axios.create({
        baseURL: 'http://localhost:8080',
    });

// export const apiAcc = axios.create({
//         baseURL: 'https://d5d3-171-241-21-42.ap.ngrok.io',
//     })
    
//     export const apiQuiz = axios.create({
//         baseURL: 'https://0958-171-241-21-42.ap.ngrok.io',
//     })