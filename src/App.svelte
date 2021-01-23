<script>
	import Calendar from './Calendar.svelte'
	import StatCard from './StatCard.svelte'
	import Modal from './Modal.svelte';
	import store from './store.js';
	import { onMount } from 'svelte';
	$: current_view = 3
	let poops_count_7 = 0
	let wet_diapers_count_7 = 0
	let poops_count_30 = 0
	let wet_diapers_count_30 = 0
	let poops_count_3 = 0
	let wet_diapers_count_3 = 0
  let current_poops = 0
	let current_wet = 0
	let current_sleep =  ""
	let cal_events = []
	let sleep_3_total = 0
	let sleep_7_total = 0
	let sleep_30_total = 0
	
	onMount(() => {
		store.subscribe(received_msg => {
		let json = JSON.parse(received_msg)
			if(json.action != null){
				actionHandler(json)
			}else{
				console.error("Message from server did not have an action")
			}
		})
	})


	const initHandler = (json) => {
			console.debug(json)
			poops_count_3 = 0	
			poops_count_7 = 0	
			poops_count_30 = 0	
			sleep_3_total = 0	
			sleep_7_total = 0	
			sleep_30_total = 0	
			wet_diapers_count_3 = 0	
			wet_diapers_count_7 = 0	
			wet_diapers_count_30 = 0	
			console.log(current_sleep, current_wet, current_poops)

			let now = new Date().toISOString()
			let last_7 = new Date()
			last_7.setDate(last_7.getDate()  -  7)
			last_7 = last_7.toISOString()

			let last_30 = new Date()
			last_30.setDate(last_30.getDate()  -  30)
			last_30 = last_30.toISOString()

			let last_3 = new Date()
			last_3.setDate(last_3.getDate()  -  3)
			last_3 = last_3.toISOString()
			let place_holder = []
			let sleep_3 = []
			let sleep_7  = []
			let sleep_30 = []
			json.sleep.forEach(s => {
					let diff = new Date(s[2]) -  new Date(s[1])
				if(s[1] > last_30 ||  s[2] > last_30 && s[1] < now){
						sleep_30.push(diff)
				}
				if(s[1] > last_7 ||  s[2] > last_7 && s[1] < now){
						sleep_7.push(diff)
				}
				if(s[1] > last_3 ||  s[2] > last_3 && s[1] < now){
						sleep_3.push(diff)
				}
				let endTime
				let prefix
				if(diff > 10888888){
						prefix = "Sleep"
						endTime = s[2]
				}
				else if(diff > 1800000){
						prefix = "Nap"
						endTime = s[2]
				}
				else{
						prefix = "Nap"
						let date = new Date(s[1])
						date = new Date(date.getTime() + 30*60000)
						let isoEndTime = new Date(date.getTime() - 
							(date.getTimezoneOffset() * 60000)).toISOString(); 
						endTime = isoEndTime.slice(0, -1)
				}

				place_holder.push({
						title: s[3] == null|| s[3] === ""?`${prefix} ${timeConversion(s[3] * 1000)}`: s[3],
						start: s[1],
						end: endTime,
						color: s[4] == null? "#687ccc": s[4],
						data:{
							id: s[0],
							table: "sleep",
						}
				})
			})
			sleep_3_total = sleep_3.reduce((a, b) => a + b, 0)
			sleep_7_total = sleep_7.reduce((a, b) => a + b, 0)
			current_sleep = sleep_7_total
			sleep_30_total = sleep_30.reduce((a, b) => a + b, 0)
			json.poops.forEach(p => {
				if(p[1] > last_7 && p[1] < now) poops_count_7++;
				if(p[1] > last_30 && p[1] < now) poops_count_30++;
				if(p[1] > last_3 && p[1] < now) poops_count_3++;
				place_holder.push({
						title: p[2] == null || p[2] === ""? "Poopy Diaper": p[2],
						start: p[1],
						color: p[3] == null? "#fcaec0": p[3],
						data:{
							id: p[0],
							table: "poops",
						}
				})
			})
			json.wet_diaper.forEach(w => {
				if(w[1] > last_7 && w[1] < now ) wet_diapers_count_7++;
				if(w[1] > last_30 && w[1] < now) wet_diapers_count_30++;
				if(w[1] > last_3 && w[1] < now) wet_diapers_count_3++;
				place_holder.push({
						title: w[2] == null|| w[2] === ""? "Wet Diaper": w[2],
						start: w[1],
						color: w[3] == null? "#ffbf1c": w[3],
						data:{
							id: w[0],
							table: "wet_diaper",
						}
				})
			})
			cal_events = place_holder
			current_sleep = sleep_3_total
			current_poops= poops_count_3
			current_wet = wet_diapers_count_3
			console.log(current_sleep, current_wet, current_poops)
	}

	const actionHandler = (json) => {
			console.debug("action: ", json.action)
			switch (json.action) {
				case 'init':
						initHandler(json)
					break;
				case 'error':
						// TODO show error message on webpage
						console.error(json.message)
					break;
				case 'console':
						console.debug(json.message)
					break;
				case 'success':
						// TODO show some kind of success message
						console.debug(json.message)
					break;
				default:
						console.error("I do not know this action ", json.action)
			}
	}

	const statHandler = (view) => {
			switch (view) {
				case 3:
					current_view = 3
					current_sleep = sleep_3_total
					current_poops= poops_count_3
					current_wet = wet_diapers_count_3
					break;
				case 30:
					current_view = 30
					current_sleep = sleep_30_total
					current_poops= poops_count_30
					current_wet = wet_diapers_count_30
					break;
				case 7:
					current_view = 7
					current_sleep = sleep_7_total
					current_poops= poops_count_7
					current_wet = wet_diapers_count_7
					break;
				default:
					current_view = 7
					current_sleep = sleep_7_total
					current_poops= poops_count_7
					current_wet = wet_diapers_count_7
			}
	}

		function timeConversion(millisec) {
			var seconds = (millisec / 1000).toFixed(1);
			var minutes = (millisec / (1000 * 60)).toFixed(1);
			var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
			var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
			if (seconds < 60) {
					return seconds + " Sec";
			} else if (minutes < 60) {
					return minutes + " Min";
			} else if (hours < 24) {
					return hours + " Hrs";
			} else {
					return days + " Days"
			}
		}

</script>

<main>
	<h1>Pi Baby</h1>
	<StatCard days={current_view} 
						poops={current_poops} wet_diaper={current_wet}
						sleep={current_sleep}/>
	<div class="btn-group">
		<button on:click={() => {statHandler(30)}}>Month</button>
		<button on:click={() => {statHandler(7)}}>Week</button>
		<button on:click={() => {statHandler(3)}}>3 Days</button>
	</div>
	<Modal>
		<div class="card">
			<Calendar view={current_view} events={cal_events}/>
		</div>
	</Modal>
</main>

<style>
	:global(body) {
		background-color: #C1DDD8;
	}

	h1 {
		text-align: center;
		color: white;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 300;
	}

	.btn-group  {
		display:  flex;
		justify-content: center;
	}

	.btn-group button {
		color: white;
		background-color: #ffa98a; /* White text */
		padding: 10px 24px; /* Some padding */
		cursor: pointer; /* Pointer/hand icon */
		float: left; /* Float the buttons side by side */
		border: none; /* Prevent double borders */
		font-weight: 500;
	}

	.btn-group button:first-child {
		border-radius:none;
		border-right: 3px solid #f2d8cb; /* Green border */
		border-bottom-right-radius: none;
	}

	.btn-group button:last-child {
		border-radius:none;
		border-left: 3px solid #f2d8cb; /* Green border */
		border-bottom-right-radius: none;
	}

	/* Clear floats (clearfix hack) */
	.btn-group:after {
		content: "";
		clear: both;
		display: table;
	}

	/* Add a background color on hover */
	.btn-group button:focus {
		background-color: #F5E4DC;
		color: #ffa98a; /* White text */
	}

	button {
		background-color: #F5E4DC;
		color: #d16c3d;
		font-size:  2em;	
	}

	.card {
		background-color: white;
		color: gray;
		padding: 20px;
		margin: 10px;
		border-radius: 20px;
	}

</style>
