<template>
    <div>
        <h1>Users dashboard</h1>
        <div class="level-item">
        <table class="table is-striped is-hoverable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Role_ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td><button class="button is-danger" @click="showUserModal(user.id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        </div>
        <div :class="{ modal: true, 'is-active': showModal }">
            <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">Warning!</p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                            Do you really want to delete this user? This action cannot be reversed.
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" class="card-footer-item" @click="hideModal">Cancel</a>
                            <a href="#" class="card-footer-item" @click="deleteUser">Yes</a>
                        </footer>
                    </div>
                </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal"></button>
        </div>
    </div> 
</template>

<script>
    import axios from 'axios';
    export default {
        created() {
            var req = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
            axios.get('http://localhost:3000/user', req).then(res => {
                this.users = res.data;
            }).catch(err => {
                console.log(err);
            });
        },
        data() {
            return {
                users: [],
                showModal: false,
                deleteUserId: 0
            }
        },
        methods: {
            hideModal() {
                this.showModal = false;
            },
            showUserModal(id) {
                this.showModal = true;
                this.deleteUserId = id;
            },
            deleteUser() {
                var req = {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
                axios.delete('http://localhost:3000/user/' + this.deleteUserId, req).then(res => {
                    console.log(res);
                    this.showModal = false;
                    this.users = this.users.filter(u => u.id != this.deleteUserId);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
}
</script>

<style scoped>
    table { margin: 10px 0; }
    button { margin: 0 4px; }
</style>