<template>
    <div>
        <h1>User login</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="notification is-danger" v-if="error != undefined">
                    <p>{{ error }}</p>
                </div>
                <input type="email" class="input" name="email" placeholder="User e-mail..." v-model="email">
                <input type="password" class="input" name="password" placeholder="User password..." v-model="password">
                <button class="button is-info" @click="login">Login!</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                email: '',
                password: '',
                error: undefined
            }
        },
        methods: {
            login() {
                axios.post('http://localhost:3000/login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    console.log(res);
                    localStorage.setItem('token', res.data.token);
                    this.$router.push({ name: 'Users' });
                }).catch(err => {
                    var errMsg = err.response.data;
                    this.error = errMsg;
                });
            }
        }
    }
</script>

<style scoped>
    input, button { margin: 8px 0; }
</style>