<script lang="ts">
import { h, defineComponent } from 'vue';

export default defineComponent({
    props: {
        lessonBody: {
            type: String,
            required: true,
        },
    },
    render() {
        return h({
            template: `<p class="lesson-body text-start mb-0">${this.lessonBody}</p>`,
            methods: {
                checkWord(ev: Event) {
                    this.$emit('checkWord', (ev.target as HTMLSpanElement).innerText.toLowerCase());
                },
            },
            emits: {
                checkWord(word: Lowercase<string>) {
                    return true;
                },
            },
        });
    },
});
</script>
