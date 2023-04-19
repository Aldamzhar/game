<template>
    <div>
        <h2>История результатов пользователя</h2>
        <table>
            <tr>
                <th>Дата</th>
                <th>Время</th>
            </tr>
            <tr v-for="result in results" :key="result.id">
                <td>{{ new Date(result.created_at).toLocaleDateString() }}</td>
                <td>{{ result.time }} сек</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const results = ref([]);

        async function fetchUserResults() {
            try {
                const response = await fetch('/api/user-results', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }

                });
                const data = await response.json();
                results.value = data;
            } catch (error) {
                console.error('Error fetching user results:', error);
            }
        }

        onMounted(() => {
            fetchUserResults();
        });

        return {
            results
        };
    }
};
</script>
