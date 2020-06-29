<template>
    <div class="cards">
        <cards />
    </div>
</template>
<script>
import cards from '../components/cards'
import checkSessionCards from '../mixins/httpHandler'
export default {
    components: {
        cards
    },
    data() {
        return {
            sessionId: 'session_id'
        }
    },
    mounted(){
        this.post({router : this.sessionId}, true)
    },
    updated() {
        this.post({router : this.sessionId}, true)
    },
    mixins: [checkSessionCards]
}
</script>