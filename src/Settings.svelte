<script>
	export let settings = {}
	export let toggle
	import store from './store.js'

	function sendUpdate(){
		console.debug(settings)
		store.sendMessage(JSON.stringify({
				action:"settings",
				settings:settings
		}))
	}
</script>


<div class="main">
	<div class="column">
		<div class="setting">
			<label for="track">White Noise Track</label>
			<p>Options of music tracks coming from <code>pi_baby/noise</code> directory</p>
			<select id="track" bind:value={settings.selected_noise}>
				{#each settings.available_noises as noise}
					<option>{noise}</option>
				{/each}
			</select>
		</div>

		<div class="setting">
			<label for="vol-control">White Noise Volume Offset </label>
			<p>adust the white noise volume up or down in db. This will restart the audio track if playing</p>
			<input id="vol-control" type="range" bind:value={settings.volume_offset} min="-10" max="10" step="1"/>
			<h3>{settings.volume_offset}</h3>
		</div>

		<div class="setting">
			<label for="delay">Timer delay in secs:</label>
			<p>After first button press a timer starts and when finished counts the amount of button presses. This delay is in seconds</p>
			<input id="delay" min=0.1 bind:value={settings.delay} type="number"/>
		</div>


		<div class="setting">
			<label for="long_press">Delete last event long press delay</label>
			<p>On long press pi baby will delete the last event recorded for deleting accidental presses. This setting is the delay from when the long press is counted in seconds.</p>
			<input id="long_press" min=0.1 bind:value={settings.long_press} type="number"/>
		</div>

		<div class="setting">
			<label for="sleep_track_limit">Sleep track duration</label>
			<p class="subtitle">Duration in minutes for a sleep event to be saved </p>
			<input id="sleep_track_limit" min=0 bind:value={settings.sleep_track_limit} type="number"/>
		</div>

	</div>
	<div class="buttons">
		<button on:click={toggle}>
			Cancel
		</button>
		<button class="save" on:click={sendUpdate}>
			Save
		</button>
	</div>

</div>

<style>
	.main{
		margin:1em;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.column{
		display:flex;
		flex-direction:column;
		justify-content: space-between;
		width: fit-content;
		flex-grow: 1;
	}
	label {
		font-size: 1.3em;
		font-weight: 500;
	}
	.buttons {
		display: flex;
	}
	p{
		font-size: 1em;
		color: rgba(0,0,0,0.5);
		margin:0
	}
	button{
		padding: 1em;
		font-size: 1.2em;
		font-weight:500;
	}

	.setting{
		margin-bottom:20px;
		background-color: white;
		border-radius: 10px;
		padding: 1em;
		display: flex;
		flex-direction: column;
	}
	.setting h3{
		text-align: center
	}

	.save {
		background-color: #16c79a;
		color: white;
		flex-grow: 1;
		margin-left: 10px;
	}
	.cancel {
		background-color: #f6ecf0;
	}
	
</style>
