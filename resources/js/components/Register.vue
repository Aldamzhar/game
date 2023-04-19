<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div>
                <label for="name">Name</label>
                <input type="text" id="name" v-model="name" required />
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
        };
    },
    methods: {
        async register() {
            try {
                await this.getCsrfToken();
                const response = await axios.post("/api/register", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });

                // Сохраните токен и перенаправьте пользователя на нужную страницу
                localStorage.setItem("token", response.data.token);
                this.$router.push("/game");
            } catch (error) {
                console.error("Error during registration:", error);
            }
        },
        async getCsrfToken() {
            await axios.get("/sanctum/csrf-cookie");
        },
    },
};
</script>
