<template>
    <div>
        <h1>User registration</h1>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="notification is-danger" v-if="error != undefined">
                    <p>{{ error }}</p>
                </div>
                <input type="text" class="input" name="name" placeholder="User name..." v-model="name">
                <input type="email" class="input" name="email" placeholder="User e-mail..." v-model="email">
                <input type="password" class="input" name="password" placeholder="User password..." v-model="password">
                <button class="button is-info" @click="register">Register!</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                error: undefined
            }
        },
        methods: {
            register() {
                axios.post('http://localhost:3000/user', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(res => {
                    console.log(res);
                    this.$router.push({ name: 'Home' });
                }).catch(err => {
                    var errMsg = err.response.data.err;
                    this.error = errMsg;
                });
            }
        }
    }
</script>

<style scoped>
    input, button { margin: 8px 0; }
</style>