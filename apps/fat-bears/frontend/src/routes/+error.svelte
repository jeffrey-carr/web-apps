<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-page" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: calc(100vh - 120px); text-align: center; padding: 2rem; box-sizing: border-box;">
	<h1 style="font-size: 4rem; color: #ff4500; text-shadow: 4px 4px 0 #000; margin-bottom: 1rem;">
		{page.status}
	</h1>
	
	<img src="/images/sad_bear_404.jpg" alt="Sad Bear" style="width: 256px; height: 256px; border-radius: 16px; margin-bottom: 2rem; border: 4px solid var(--box-border); image-rendering: pixelated;" />
	
	<h2 style="font-size: 1.5rem; color: #fff; text-shadow: 2px 2px 0 #000; margin-bottom: 2rem; line-height: 1.5;">
		{page.error?.message || 'Page Not Found'}
	</h2>
	
	<a href="/" class="pixel-button" style="font-size: 1rem; padding: 1rem 2rem; text-decoration: none;">
		Return to Tournaments
	</a>
</div>

<style>
	.error-page {
		font-family: 'Press Start 2P', monospace;
	}
</style>
