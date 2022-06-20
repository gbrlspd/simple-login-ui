import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/RegisterView.vue';
import Login from '../views/LoginView.vue';
import Users from '../views/UsersView.vue';
import axios from 'axios';

function adminAuth(to, before, next) {
    if(localStorage.getItem('token') != undefined) {
        var req = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.post('http://localhost:3000/validate', {}, req).then(res => {
            console.log(res);
            next();
        }).catch(err => {
            console.log(err.response.data);
            next('/login');
        });
    } else {
        next('/login');
    }
}

const routes = [
	{
        path: '/',
        name: 'Users',
        component: Users,
        beforeEnter: adminAuth
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
