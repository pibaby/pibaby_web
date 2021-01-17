<script>
	import Calendar from './Calendar.svelte'
	$: sleep = []
	$: poops = []
	$: wet_diapers = []
		$: cal_events = []
	let ws = new WebSocket('ws://localhost:8765');
	ws.onopen = function() {
			console.debug("connected to pi_baby server");
			ws.send(JSON.stringify({action:"init"}))
	};
	ws.onmessage = (evt)  => {
		var received_msg = evt.data;
		let json = JSON.parse(received_msg)
		console.debug(json)
			if(json.action != null){
				actionHandler(json)
			}else{
				console.error("Message from server did not have an action")
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

	const initHandler = (json) => {
			let place_holder = []
			json.sleep.forEach(s => {
				place_holder.push({
						title: `sleep ${timeConversion(s[3] * 1000)}`,
						start: s[1],
						end: s[2]
				})
			})
			json.poops.forEach(p => {
				place_holder.push({
						title: "poop",
						start: p[1]
				})
			})
			json.wet_diaper.forEach(w => {
				place_holder.push({
						title: "wet diaper",
						start: w[1],
				})
			})
			cal_events = place_holder
	}

	const actionHandler = (json) => {
			switch (json.action) {
				case 'init':
						initHandler(json)
					break;
				case 'error':
						console.error(json.message)
					break;
				case 'console':
						console.debug(json.message)
					break;
				case 'success':
						console.debug(json.message)
					break;
				default:
						console.error("I do not know this action ", json.action)
			}
	}
</script>

<main>
	<h1>Pi Baby</h1>
	<div class="card">
		<Calendar events={cal_events}/>
	</div>
	<h2>Sleep</h2>
	<div class="card">
	{#each sleep as s}
		<div class="rows">
			<p>{s[1]}</p>
			<p>{s[2]}</p>
		</div>
	{/each}
	</div>
	<h2>Wet Diapers</h2>
	{#each wet_diapers as w}
		<p>{w[1]}</p>
	{/each}
	<h2>Poops</h2>
	{#each poops as p}
		<p>{p[1]}</p>
	{/each}
	
	<div>

	</div>
</main>

<style>
	main {
		margin: 0 auto;
	}

	:global(body) {
		background-color: #C1DDD8;
	}

	h1 {
		padding-top: 10px;
		text-align: center;
		color: white;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 300;
	}

	h2 {
		color: #728e8f;
	}

	button {
		background-color: #F5E4DC;
		color: #d16c3d;
		border-radius: 5px;
	}

	.card {
		background-color: white;
		color: gray;
		padding: 10px;
		margin: 10px;
		border-radius: 20px;
	}

	.rows {
		display: flex;
		flex-direction: row;
		justify-content:space-around;
		max-width: 100%;
	}

</style>
