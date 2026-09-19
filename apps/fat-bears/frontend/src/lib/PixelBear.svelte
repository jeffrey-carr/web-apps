<script lang="ts">
	export let id: number | null = null;

	function pseudoRandom(seed: number) {
		let x = Math.sin(seed * 1.2345) * 10000;
		return x - Math.floor(x);
	}

	const palettes = [
		{ base: '#8a5a33', dark: '#5c3a21', snout: '#c49a6c' }, // Classic brown
		{ base: '#6b4423', dark: '#4a2e1b', snout: '#a67b5b' }, // Dark brown
		{ base: '#4a331c', dark: '#2b1e10', snout: '#8b6038' }, // Very dark brown
		{ base: '#c19a6b', dark: '#8b6038', snout: '#e0c097' }, // Blonde / light
		{ base: '#997a5c', dark: '#66523d', snout: '#cca37a' }, // Cinnamon
		{ base: '#3a3a3a', dark: '#1f1f1f', snout: '#7a7a7a' }, // Black bearish
		{ base: '#d1bfae', dark: '#8a7968', snout: '#f0e6dd' }, // Light blonde
		{ base: '#735b40', dark: '#4d3d2b', snout: '#a68a6b' }, // Muddy brown
		{ base: '#b57b45', dark: '#7a4e25', snout: '#e0a972' }, // Orange-brown
		{ base: '#5e432f', dark: '#382619', snout: '#967459' }  // Chocolate
	];

	$: p = id !== null ? palettes[Math.floor(pseudoRandom(id) * palettes.length)] : palettes[0];
	
	$: hasScar = id !== null && pseudoRandom(id + 1) > 0.7;
	$: hasGlasses = id !== null && pseudoRandom(id + 2) > 0.8;
	$: eyeColor = id !== null && pseudoRandom(id + 3) > 0.95 ? '#f00' : '#000';
	$: hasBowtie = id !== null && pseudoRandom(id + 4) > 0.6;
	$: bowtieColor = id !== null ? `hsl(${Math.floor(pseudoRandom(id + 5) * 360)}, 80%, 50%)` : '#f00';
</script>

<svg width="48" height="48" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated; width: 100%; height: auto; max-width: 64px;">
	<!-- Ears -->
	<rect x="2" y="1" width="2" height="2" fill={p.dark}/>
	<rect x="8" y="1" width="2" height="2" fill={p.dark}/>
	<!-- Inner Ears -->
	<rect x="2" y="2" width="1" height="1" fill={p.base}/>
	<rect x="9" y="2" width="1" height="1" fill={p.base}/>
	<!-- Head -->
	<rect x="2" y="3" width="8" height="6" fill={p.base}/>
	<!-- Eyes -->
	<rect x="3" y="4" width="1" height="1" fill={eyeColor}/>
	<rect x="8" y="4" width="1" height="1" fill={eyeColor}/>
	
	<!-- Scar -->
	{#if hasScar}
		<rect x="7" y="3" width="1" height="3" fill="#ff9999" opacity="0.6"/>
	{/if}
	
	<!-- Glasses -->
	{#if hasGlasses}
		<rect x="2" y="3.5" width="3" height="2" fill="none" stroke="#fff" stroke-width="0.5"/>
		<rect x="7" y="3.5" width="3" height="2" fill="none" stroke="#fff" stroke-width="0.5"/>
		<rect x="5" y="4" width="2" height="0.5" fill="#fff"/>
	{/if}

	<!-- Snout -->
	<rect x="4" y="5" width="4" height="3" fill={p.snout}/>
	<!-- Nose -->
	<rect x="5" y="5" width="2" height="1" fill="#000"/>
	<!-- Body / Shoulders -->
	<rect x="1" y="9" width="10" height="3" fill={p.base}/>
	
	<!-- Bowtie -->
	{#if hasBowtie}
		<rect x="4" y="9" width="1" height="1" fill={bowtieColor}/>
		<rect x="7" y="9" width="1" height="1" fill={bowtieColor}/>
		<rect x="5" y="9" width="2" height="1" fill={bowtieColor} opacity="0.8"/>
	{/if}
</svg>
