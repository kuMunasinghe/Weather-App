let weather={
    apiKey:"51ef37e1efd21c35f024809b233c462e",
    fetchWeather:function(city){
        fetch("http://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&units=metric&appid="
        +this.apiKey
        )
        .then((response)=>response.json())
        .then((data)=>this.displayWeather(data));

    },
    displayWeather:function(data){
        const{name}=data;
        const{icon,description}=data.weather;
        const{temp,humidity}=data.main;
        const{speed}=data.wind;
        console.log(name,description,temp,icon)
    }
}