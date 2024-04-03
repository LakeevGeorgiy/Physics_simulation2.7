let x_frequency_text = document.getElementById("x_frequency_id");
let y_frequency_text = document.getElementById("y_frequency_id");
let amplitude_text = document.getElementById("amplitude_id");
let period_text = document.getElementById("period_id");
let button = document.getElementById("button_id");

let x_frequency = x_frequency_text.value;
let y_frequency = y_frequency_text.value;
let amplitude = amplitude_text.value;
let period = period_text.value;

function calculate(frequency, t){
	return amplitude * Math.cos(frequency * t);
}

function beatCalculate(t){
	let phase_shift = Math.abs(x_frequency - y_frequency);
	let frequency = Math.min(x_frequency, y_frequency);
	return 2 * amplitude * Math.cos(phase_shift / 2 * t) * Math.cos(frequency * t / 2);
}

function plot() {

    let x_coordinates = [];
	let first_coordinates = [];
	let second_coordinates = [];
	let third_coordinates = [];

	let i = 0;
	let start = 0;
	const phase_shift = Math.abs(x_frequency - y_frequency);
	const min_frequency = Math.min(x_frequency, y_frequency);
	let end = period * 2 * Math.PI / phase_shift;
	let cnt_steps = 100;
	let step = (end  / period - start) / cnt_steps;

	console.log(start, end, step);

    for (let x = start; x <= end; x += step){
		
		x_coordinates[i] = x;
		first_coordinates[i] = calculate(x_frequency, x);
		second_coordinates[i] = calculate(y_frequency, x);
		third_coordinates[i] = beatCalculate(x);
		++i;
	}

    let first = {
        x: x_coordinates, 
        y: first_coordinates, 
        mode: 'lines',
		name: 'I осциллятор'
    };

    let second = {
        x: x_coordinates,
        y: second_coordinates,
        mode: 'lines',
		name: 'II осциллятор'
    };

    let third = {
        x: x_coordinates,
        y: third_coordinates,
        mode: 'lines',
		name: 'сумма колебаний'
    };

	let layout = {
		autosize: true
	};

	Plotly.react('tester', [first, second, third], layout);
}

button.addEventListener("click", function(e){

	x_frequency = parseFloat(x_frequency_text.value);
	if (x_frequency < 0) {
		alert("Частота меньше 0!");
		return;
	}
	
	y_frequency = parseFloat(y_frequency_text.value);
	if (y_frequency < 0) {
		alert("Частота меньше 0!");
		return;
	}

	amplitude = parseFloat(amplitude_text.value);
	if (amplitude < 0) {
		alert("Амплитуда меньше 0!");
		return;
	}
	

	period = parseFloat(period_text.value);
	if (period < 0) {
		alert("Период меньше 0!");
		return;
	}
	
    plot();
});