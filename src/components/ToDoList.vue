<template>
    <div>
        {{ props.monthName }}--{{ props.currentYear }}
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props= defineProps({
    monthName: {type:String, required:true},
    currentYear: {type:Number, required:true}
})
</script>