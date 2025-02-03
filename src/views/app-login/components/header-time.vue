<script setup lang="ts">
import { ref, onMounted,  } from "vue";
import moment from "moment";
const date = ref();
const time = ref();
const greeting = ref('');
const isLogout = ref(false)

const updateCurrentTime = () => {   // function for run time that use moment liary 
    time.value = moment(new Date()).format('hh:mm:ss A');
};

onMounted(() => {
    greeting.value = checkTimeShift()
    date.value = moment(new Date()).format('DD-MM-YYYY') // real date 
    updateCurrentTime()
    setInterval(() => {
        updateCurrentTime()
    }, 1000);
});


const checkTimeShift = () => {
    const hour = new Date().getHours();
    if (hour === 5 || hour < 12) {
        return "Good Morning";
    } else if (hour === 12 || hour < 18) {
        return "Good Afternoon";
    } else if (hour === 18 || hour < 22) {
        return "Good Evening";
    } else {
        return "Goodnight";
    }
};


</script>
<template>
    <div class="flex w-full  ">
        <div class="flex ">
            <div class="hidden  md:flex justify-between w-full ">
                <div class="bgHeader flex border-none rounded-[30px] mx-1 p-2 shadow-2xl shadow-green-900/35">
                    <i class="pi pi-stopwatch p-1 mr-1" style="color: #F5F5F7 "></i>
                    <p>{{ time }}</p>
                </div>
                <div class="bgHeader flex border-none rounded-[30px] mx-1 p-2 shadow-2xl shadow-green-900/35">
                    <i class="pi pi-calendar p-1 mr-1" style="color: #F5F5F7"></i>
                    <p>{{ date }}</p>
                </div>
            </div>
        </div>
        <div class="flex ">
            <div class="flex justify-between w-full">
                <div class="bgHeader flex border-none rounded-[30px] mx-1 p-2 shadow-2xl shadow-green-900/35">
                    <i class="pi pi-shop p-1 mr-1" style="color: #F5F5F7"></i>
                    <p>{{greeting}} </p>
                </div>

            </div>
        </div>
    </div>

</template>
<style scoped>
.bgHeader {
    background: linear-gradient(to bottom, #78a5c9, #A7B5FF);
}
</style>
