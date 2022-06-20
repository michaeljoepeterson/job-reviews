<template>
    <form @submit="(e) => search(e)">
        <div>
            <label for="job">Job url</label>
            <input v-model="urlInput" id="job"/>
        </div>
        <div>
            <label for="start-page">Start Page</label>
            <input type="number" id="start-page" v-model="startPage"/>
        </div>
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
                error: '',
                startPage: 1
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