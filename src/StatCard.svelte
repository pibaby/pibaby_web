<script>
	export let days = 7;
	export let poops = 0;
	export let wet_diaper  = 0;
	export let sleep =  0;

	console.log(days,poops,wet_diaper,sleep)
	function timeConversion(millisec) {
		var seconds = (millisec / 1000).toFixed(1);
		var minutes = (millisec / (1000 * 60)).toFixed(1);
		var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
		if (seconds < 60) {
				return seconds + " Sec";
		} else if (minutes < 60) {
				return minutes + " Min";
		} else {
				return hours + " Hrs";
		} 
	}


</script>
	<div class="rows">
		<div class="stat-card orange">
			<p>Wet Diapers Last {days} Days:  </p>
			<h1>{wet_diaper}</h1>
		</div>
		<div class="stat-card red">
			<p>Poops Last {days} Days:  </p>
			<h1>{poops}</h1>
		</div>
		<div class="stat-card blue">
			<p>Sleep Last {days} Days: </p>
			<h1>{timeConversion(sleep)}</h1>
		</div>
	</div>

<style>
	.stat-card {
		color: gray;
		margin: 10px;
		border-radius: 10px;
		width: 100%;
		padding-left: 10px;
		padding-right: 10px;
	}
	.blue{
		background-color: #687ccc;
	}
	.red{
		background-color: #fcaec0;
	}
	.orange{
		background-color: #ffbf1c;
	}
	.stat-card h1{
		color: white;
		font-size: 3em;
		font-weight: 800;
		text-align:  center;
	}
	.stat-card p{
		text-align: center;
		color: white;
		font-size: 24px;
		font-weight: 600;
	}

	.rows {
		display: flex;
		flex-direction: row;
		justify-content:space-around;
		max-width: 100%;
	}
</style>
