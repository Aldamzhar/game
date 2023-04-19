<template>
    <div>
        <h2>Общий рейтинг</h2>
        <table>
            <tr>
                <th>Пользователь</th>
                <th>Дата</th>
                <th>Время</th>
            </tr>
            <tr v-for="result in leaderboard" :key="result.id">
                <td>{{ result.user.name }}</td>
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
        const leaderboard = ref([]);

        async function fetchLeaderboard() {
            try {
                const response = await fetch('/api/leaderboard', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                leaderboard.value = data;
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        }

        onMounted(() => {
            fetchLeaderboard();
        });

        return {
            leaderboard
        };
    }
};
</script>
