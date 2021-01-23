<script>
  import { getContext } from 'svelte';
  export let info;
	export let onCancel = () => {};
	export let onOkay = () => {};
	console.log(info)

  const { close } = getContext('simple-modal');

	function dateTimeLocalFormat(value){
			// html input datetime-local
			// does not like -07:00
			// coming from python datetime.now()
			let split = value.split("-")
			let result = split.slice(0, split.length - 1).join("-");
			console.debug(result)
			return result
	}
	
	let value;
	let onChange = () => {};

	function sendDelete(){
		let id = info.extendedProps.data.id
		let table = info.extendedProps.data.table
		console.debug("sendDelete", id, table)
		close()
	}

	function sendUpdate(){
		let update = {}
		update.color = document.getElementById("event-color")
		update.start = document.getElementById("from-time")
		update.end = document.getElementById("to-time")
		update.title = document.getElementById("title")
		Object.keys(update).forEach(x => {
				if(update[x] == null){
					update[ x ] = null
				}else{
					update[x] = update[x].value
				}
		})
		console.debug("sendUpdate", update)
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

	.delete {
		background-color: #e5707e;
		color: white;
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

		{#if info.startStr !== ""}
			{#if info.endStr !== ""}
			 <label for="from-time">From:</label>
			 {:else}
			 <label for="from-time">Date & Time:</label>
			{/if}
			<input id="from-time" value={dateTimeLocalFormat(info.startStr)} name="from-time" type="datetime-local" />
		{/if}
		{#if info.endStr !== ""}
			<label for="to-time">To:</label>
			<input id="to-time" value={dateTimeLocalFormat(info.endStr)} name="to-time" type="datetime-local" />
		{/if}

	<label for="title">Title:</label>
	<input id="title" value={info.title}/>
	<div style="width: fit-content;">
		<label for="event-color">Color</label>
		<input id="event-color" value={info.backgroundColor} type="color"/>
	</div>

	<div class="buttons">
		<button class="cancel" on:click={_onCancel}>
			Cancel
		</button>
		<button class="delete" on:click={sendDelete}>
			Delete
		</button>
		<button class="save" on:click={sendUpdate}>
			Save
		</button>
	</div>

</div>
