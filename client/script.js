let app = new Vue({
    el: '#app',
    data : {
        token : '',
        email : '',
        name : '',
        location : '',
        address : '',
        password : '',
        keyword : '',
        events : []
    },
    created: function(){
        this.allProduct()
        // this.token  = localStorage.getItem('token')
    },
    methods : {
        allProduct: function () {
            axios({
                method : 'GET',
                url : 'http://localhost:3000/events'
            })
            .then(eventList => {
                console.log(eventList.data)
                app.events = eventList.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        signin : function(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/users/login',
                data : {
                    email : this.email,
                    password : this.password
                }
            })
            .then(user => {
                console.log(user.data.token)
                localStorage.setItem('token', user.data.token)

            })
            .catch(err => {
                console.log(err)
            })
        },
        addEvent : function(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/events',
                data : {
                    name : this.name,
                    location : this.location,
                    address : this.address
                },
                headers : {
                    access_token : localStorage.getItem('token')
                }
            })
            .then(user => {
                this.allProduct()

            })
            .catch(err => {
                console.log(err)
            })
        },
        search : function(){
            axios({
                method : 'GET',
                url : `http://localhost:3000/events/search/${this.keyword}`,
                headers : {
                    access_token : localStorage.getItem('token')
                }
            })
            .then(user => {
                app.events = user.data
                console.log(user)

            })
            .catch(err => {
                console.log(err)
            })
        }
    }


})