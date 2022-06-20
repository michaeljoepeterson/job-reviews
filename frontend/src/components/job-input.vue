<template>
    <form @submit="(e) => search(e)">
        <input v-model="urlInput"/>
        <button type="submit">Search</button>
    </form>
    <p v-if="error">
        {{error}}
    </p>
</template>

<script>
    export default{
        name: 'job-input',
        emits: ['search'],
        data(){
            return{
                urlInput: '',
                jobName: '',
                error: ''
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
                if(this.jobName){
                    this.error = null;
                    this.$emit('search', this.jobName);
                }
                else{
                    this.error = `Can't parse url`;
                }
            }
        }
    }
</script>

<style>

</style>