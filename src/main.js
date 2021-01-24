import App from './App.svelte';

Date.prototype.toDateInputValue = (function(add = 0 ) {
	var local = new Date(this);
	local.setMinutes((this.getMinutes() - this.getTimezoneOffset()) + add);
	return local.toJSON().slice(0,-1);
});

Date.prototype.toTimeInputValue = (function(add = 0 ) {
	var local = new Date(this);
	local.setMinutes((this.getMinutes()) + add);
	return `${local.getHours()}:${local.getMinutes()}:${local.getSeconds()}`
});

const app = new App({
	target: document.body
});

export default app;
