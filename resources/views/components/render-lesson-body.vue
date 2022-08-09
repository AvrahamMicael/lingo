<script lang="ts">
import { h, defineComponent } from 'vue';

export default defineComponent({
    props: {
        lesson_body: {
            type: String,
            required: true,
        },
    },
    render() {
        return h({
            template: `<p class="lesson-body mb-0">${this.lesson_body}</p>`,
            methods: {
                checkWord(ev: Event) {
                    this.$emit('checkWord', (ev.target as HTMLSpanElement).innerText.toLowerCase());
                },
            },
            emits: ['checkWord'],
        });
    },
});
</script>
