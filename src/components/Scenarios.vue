<template>
    <div class="scenarios">
        <v-card flat>
            <v-card-title>Scenarios</v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle v-for="scenario in scenarios" :key="scenario.id">
                {{scenario.title}}
            <v-divider></v-divider>
            </v-card-subtitle>
            <v-card-actions>
                <v-btn color="primary">
                    + Add Scenarios
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nameScenarios: '',
            scenarios:[
                {
                    title: 'Scenarios_#1'
                }
            ]
        }
    },
}
</script>