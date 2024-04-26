<template>
    <div>
        <section class="currentDate">
            <p >{{ props.currentYear }}-{{ props.monthName }}</p>
        </section>
        <section class="table">
            <table>
                <tr>
                    <th>Samstag</th>
                    <th>Sonnstag</th>
                    <th>Montag</th>
                    <th>Dienstag</th>
                    <th>Mittwoch</th>
                    <th>Donnerstag</th>
                    <th>Freitag</th>
                </tr>
                <tr>
                    <td></td>
                    
                </tr>
            </table>
        </section>
        
    </div>
</template>

<script setup lang="ts">
import{defineProps, PropType} from 'vue'

const props=defineProps({
    currentYear : {type:Number, required:true},
    months:{type: Array as PropType<Array<Array<string|number>>>, required:true},
        monthName:{type:String, required:true}
})


</script>

<style scoped>
.currentDate{
    border-bottom: 1px solid black;
    text-align: center;
    line-height: 40%;


}
table th{
    border: 1px solid black;
    height: 50px;
    width: 70px;
}

table td{
    border: 1px solid black;
    border-radius: 50%;
    height: 60px;
    text-align: center;
    line-height: 40%;
}
</style>