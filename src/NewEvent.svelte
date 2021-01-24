<script>
  import { getContext } from 'svelte';
	import store from './store.js'
	export let onCancel = () => {};
	let tables = ["sleep","wet_diaper","poops"]
	let colors = ["#687ccc","#ffbf1c","#fcaec0"] 
	let selection = 0
	let randomTitle = [
		"having a rough time right now",
		"wowza",
		"quite the stinker",
		"best nap ever, I got so much done",
		"teething for sure",
		"Sleep",
		"I think it was the broccolli",
		"im the one that needs a nap"
	]

  const { close } = getContext('simple-modal');
	
	let value;
	let onChange = () => {};

	function sendInsert(){
		let update = {}
		update.color = document.getElementById("event-color")
		update.start = document.getElementById("from-time")
		update.end = document.getElementById("to-time")
		update.title = document.getElementById("title")
		update.table =document.getElementById("table") 
		Object.keys(update).forEach(x => {
				if(update[x] == null){
					update[ x ] = null
				}else{
					update[x] = update[x].value
				}
		})

		// doing a quick value swap to get tablename
		update.table = tables[update.table]
		console.debug("sendInsert", update)
			store.sendMessage(JSON.stringify({
					action:"insert",
					data:update
				}))
			store.sendMessage(JSON.stringify({
					action:"init"
			}))
		close()
	}
	
	function _onCancel() {
		onCancel();
		close();
	}
	
	
	$: onChange(value)
</script>

<style>
  h2 {
		font-size: 2rem;
		text-align: center;
	}

	#event-color{
		height:40px;
		width:80px;
		border-radius: 5%;
		background-color: white;
	}	

	input {
		width: 100%;
	}

	.main{
		color: white;
		text-align: left;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		padding-top: 20px;
	}

	label {
		font-size: 1em;
		font-weight: 700;
	}

	button {
		font-size:  1em;	
		border-radius: 5%;
		margin:5px;
		border: none;
	}

	.save {
		background-color: #16c79a;
		color: white;
		flex-grow:1;
	}
	.cancel {
		background-color: #f6ecf0;
	}

</style>

<div class="main">
	{#if selection == 0}
		<label for="from-time">From:</label>
		<input id="from-time" value={new Date().toDateInputValue()} name="from-time" type="datetime-local" />
		<label for="to-time">To:</label>
		<input id="to-time" value={new Date().toDateInputValue(30)} name="to-time" type="datetime-local" />
	{:else}
		<label for="from-time">Time:</label>
		<input id="from-time" value={new Date().toDateInputValue()} name="from-time" type="datetime-local" />
	{/if}

	<label for="table">Category:</label>
	<select bind:value={selection} id="table">
		<option value=0>Sleep/Nap</option>
		<option value=1>Wet Diaper</option>
		<option value=2>Poops</option>
	</select>
	<label for="title">Title:</label>
	<input id="title" placeholder={randomTitle[Math.floor(Math.random() * randomTitle.length)]}/>
	<div style="width: fit-content;">
		<label for="event-color">Color</label>
		<input id="event-color" value={colors[selection]} type="color"/>
	</div>

	<div class="buttons">
		<button class="cancel" on:click={_onCancel}>
			Cancel
		</button>
		<button class="save" on:click={sendInsert}>
			Save
		</button>
	</div>

</div>
