<template>
    <form @submit="(e) => search(e)">
        <input v-model="urlInput"/>
        <button type="submit">Search</button>
    </form>
        {{jobName}}
</template>

<script>
    export default{
        name: 'job-input',
        data(){
            return{
                urlInput: '',
                jobName: ''
            }
        },
        watch:{
            urlInput(newInput){ 
                const urlRegex = /https:\/\/www.glassdoor.ca\/[R][e][v][i][e][w][s]\/(.+)\.htm/;
                const pageRegex = /_[P]\d+/;
                try{
                    const matches = newInput.match(urlRegex);
                    if(matches?.length > 0){
                        this.jobName = matches[1].replace(pageRegex, '') + '.htm';
                    }
                    console.log(this.jobName);
                }
                catch(e){
                    console.warn(e);
                }
            }
        },
        methods:{
            search(event){
                event.preventDefault();
                console.log('find reviews', this.jobName);
            }
        }
    }
</script>

<style>

</style>