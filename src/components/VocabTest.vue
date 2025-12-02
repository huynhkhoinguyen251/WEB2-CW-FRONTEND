<template>
  <div>
    <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

    <div class="test-mode" v-if="!testStarted">
      <h3>Select test mode:</h3>
      <button class="ui button" @click="startTest('english')">English → German & Vietnamese</button>
      <button class="ui button" @click="startTest('german')">German → English & Vietnamese</button>
      <button class="ui button" @click="startTest('vietnamese')">Vietnamese → English & German</button>
    </div>

    <form v-if="testStarted" action="#" @submit.prevent="onSubmit">
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i :class="getFlag(testMode)"></i> {{ capitalize(testMode) }}
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord[testMode]"/>
      </div>

      <div v-if="testMode === 'english'">
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="germany flag"></i> German
          </div>
          <input type="text" placeholder="Enter word..." v-model="german" :disabled="testOver" autocomplete="off" />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="vietnam flag"></i> Vietnamese
          </div>
          <input type="text" placeholder="Nhập từ..." v-model="vietnamese" :disabled="testOver" autocomplete="off" />
        </div>
      </div>

      <div v-if="testMode === 'german'">
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="united kingdom flag"></i> English
          </div>
          <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver" autocomplete="off" />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="vietnam flag"></i> Vietnamese
          </div>
          <input type="text" placeholder="Nhập từ..." v-model="vietnamese" :disabled="testOver" autocomplete="off" />
        </div>
      </div>

      <div v-if="testMode === 'vietnamese'">
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="united kingdom flag"></i> English
          </div>
          <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver" autocomplete="off" />
        </div>
        <div class="ui labeled input fluid">
          <div class="ui label">
            <i class="germany flag"></i> German
          </div>
          <input type="text" placeholder="Enter word..." v-model="german" :disabled="testOver" autocomplete="off" />
        </div>
      </div>

      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [],
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      english: '',
      german: '',
      vietnamese: '',
      score: 0,
      testOver: false,
      testStarted: false,
      testMode: 'english'
    };
  },
  computed: {
    currWord: function() {
      return this.randWords.length ? this.randWords[0] : '';
    }
  },
  methods: {
    startTest(mode) {
      this.testMode = mode;
      this.testStarted = true;
      this.randWords = [...this.words.sort(() => 0.5 - Math.random())];
    },
    getFlag(mode) {
      if (mode === 'english') return 'united kingdom flag';
      if (mode === 'german') return 'germany flag';
      if (mode === 'vietnamese') return 'vietnam flag';
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    onSubmit: function() {
      let isCorrect = false;

      if (this.testMode === 'english') {
        isCorrect = this.german === this.currWord.german && this.vietnamese === this.currWord.vietnamese;
      } else if (this.testMode === 'german') {
        isCorrect = this.english === this.currWord.english && this.vietnamese === this.currWord.vietnamese;
      } else if (this.testMode === 'vietnamese') {
        isCorrect = this.english === this.currWord.english && this.german === this.currWord.german;
      }

      if (isCorrect) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score += 1;
      } else {
        this.flash('Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push(this.currWord[this.testMode]);
      }

      this.english = '';
      this.german = '';
      this.vietnamese = '';
      this.randWords.shift();

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults: function() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    }
  }
};
</script>

<style scoped>
.test-mode {
  margin: 20px 0;
}

.test-mode button {
  margin: 10px 5px;
  display: inline-block !important;
}

.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>