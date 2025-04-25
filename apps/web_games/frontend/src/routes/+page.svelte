<script lang="ts">
	type ServerResponse = {
		status: number;
		message: string;
	};

	console.log('hello world!');

	let message = $state('');
	let timeout: number | undefined = $state();

	const pingPong = async () => {
		const response = await fetch('http://localhost:8080/ping');
		const json: ServerResponse = await response.json();

		if (response.status !== 200) {
			console.error('Error!!!', response.status);
			return;
		}

		clearTimeout(timeout);
		message = json.message;
		timeout = setTimeout(() => {
			message = '';
		}, 5000);
	};
</script>

<h1>Hello World!</h1>
<button onclick={pingPong}>Ping!</button>
