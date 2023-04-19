<template>
    <div>
        <div class="timer">{{ timer }} seconds</div>
        <div class="game-board">
            <div
                v-for="(letter, index) in letters"
                :key="index"
                class="letter"
                @click="clickLetter(index)"
            >
                {{ letter }}
            </div>
        </div>
        <button @click="startGame">Start Game</button>
    </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
    setup() {
        const letters = ref([]);
        const timer = ref(0);
        let intervalId = null;

        function startGame() {
            timer.value = 0;
            letters.value = generateRandomLetters();
            intervalId = setInterval(() => {
                timer.value++;
            }, 1000);
        }

        function clickLetter(index) {
            if (letters.value[index] === getNextLetter()) {
                letters.value[index] = getRandomLetter();

                if (letters.value[index] === 'Я') {
                    clearInterval(intervalId);
                    submitResult(timer.value);
                }
            }
        }

        function generateRandomLetters() {
            let randomLetters = [];
            const alphabet = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
            for (let i = 0; i < 25; i++) {
                randomLetters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
            }
            return randomLetters;
        }

        function getNextLetter() {
            const alphabet = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
            const currentLetterIndex = alphabet.indexOf(letters.value.find(letter => alphabet.includes(letter)));
            return alphabet[currentLetterIndex + 1];
        }

        function getRandomLetter() {
            const alphabet = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
            return alphabet[Math.floor(Math.random() * alphabet.length)];
        }

        async function submitResult(time) {
            try {
                const response = await fetch('/api/results', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({ time: time })
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error submitting result:', error);
            }
        }

        onMounted(() => {
            startGame();
        });

        onUnmounted(() => {
            clearInterval(intervalId);
        });

        return {
            letters,
            timer,
            startGame,
            clickLetter
        };
    }
};
</script>

<style scoped>
.game-board {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
}

.letter {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    height: 50px;
    font-size: 18px;
    cursor: pointer;
}
</style>
