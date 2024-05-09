let weather={
    apiKey:"51ef37e1efd21c35f024809b233c462e",
    fetchWeather:function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&units=metric&appid="
        +this.apiKey
        )
        .then((response)=>response.json())
        .then((data)=>this.displayWeather(data));

    },
    displayWeather:function(data){
        const{name}=data;
        const{icon,description}=data.weather[0];
        const{feels_like,humidity}=data.main;
        const{speed}=data.wind;
        var {deg}=data.wind;
        var dir=["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
        var index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
        var direction=dir[index];
        //console.log(name,description,icon,humidity,speed);
        document.querySelector(".city").innerText="Weather in "+name;
        document.querySelector(".temp").innerText=feels_like+" °C";
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+icon+".png"
        document.querySelector(".description").innerText=description;
        document.querySelector(".direction").innerText="Wind direction: "+direction;
        document.querySelector(".wind").innerText="Wind speed: "+speed+"km/hr";
        document.querySelector(".humidity").innerText="Humidity: "+humidity+"%";
        document.querySelector(".weather").classList.remove("loading"); 
        document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1600x900/?" + name + "')";
        document.body.style.backgroundSize = "cover";



    },
    search:function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button")
.addEventListener("click",function(){
weather.search();
})

document.querySelector(".search-bar")
.addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        weather.search();
    }
})

weather.fetchWeather("Colombo");


if ("geolocation" in navigator) {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(function(position) {
        // The user's latitude and longitude are in position.coords.latitude and position.coords.longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }, function(error) {
        // Handle errors, if any
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
        }
    });
} else {
    console.error("Geolocation is not available in this browser.");
}