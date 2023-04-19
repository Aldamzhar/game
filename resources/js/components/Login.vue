<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="submit">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const email = ref('');
        const password = ref('');

        async function submit() {
            try {
                await fetch('/sanctum/csrf-cookie');
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email.value, password: password.value }),
                });
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        }

        return {
            email,
            password,
            submit,
        };
    },
};
</script>
