function addPics(weather) {
	if (weather.cloudiness === "Ясно") {
		return '<i class="fas fa-sun fa-4x"></i>';
	} else if (
		weather.cloudiness === "Облачно" &&
		weather.snow === false &&
		weather.rain === true
	) {
		return '<i class="fas fa-cloud-showers-heavy fa-4x"></i>';
	} else if (
		weather.cloudiness === "Облачно" &&
		weather.snow === true &&
		weather.rain === false
	) {
		return '<i class="fas fa-snowflake fa-4x"></i>';
	} else if (
		weather.cloudiness === "Облачно" &&
		weather.snow === true &&
		weather.rain === true
	) {
		return '<i class="fas fa-cloud-rain fa-4x"></i>';
	} else {
		return '<i class="fas fa-cloud fa-4x"></i>';
	}
}

function addRainfall(weather) {
	if (weather.snow === false && weather.rain === true) {
		return "дождь";
	} else if (weather.snow === true && weather.rain === false) {
		return "снег";
	} else if (weather.snow === true && weather.rain === true) {
		return "дождь со снегом";
	} else {
		return "без осадков";
	}
}

function getWeekday(date) {
	let day = new Date(date).toLocaleString("ru", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	let today = new Date().toLocaleString("ru", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	let dateWeekday = new Date(date).toLocaleString("ru", {
		weekday: "long"
	});
	if (day === today) {
		return "cегодня";
	} else {
		return dateWeekday;
	}
}

function convertDate(date) {
	let day = new Date(date).toLocaleString("ru", {
		day: "numeric",
		month: "long"
	});
	return day;
}

function createRow(weather) {
	return `<div class="weather-block">
	            <span>${getWeekday(weather.date)}</span>
	            <h2 class="date">${convertDate(weather.date)}</h2>
	            ${addPics(weather)}
	            <h2>днем ${weather.day}°</h2>
	            <span>ночью ${weather.night}°</span>
	            ${addRainfall(weather)}
	        </div>`;
}

function renderTable(blocks) {
	$(".weather-wrapper").append(
		blocks.map(weather => {
			return createRow(weather);
		})
	);
}

function fetchWeather() {
	$.get("http://localhost:3000/weather", response => {
		response.length = 4;
		renderTable(response);
	});
}

$(document).ready(() => {
	fetchWeather();
});
