const fs = require('fs');
const file = '/Users/jeff/dev/web_apps/apps/fat-bears/frontend/src/lib/BracketView.svelte';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
	/function getBearName\(b: any\) \{\n\t\tif \(\!b\) return 'Pick Winner';\n\t\treturn b\.nickname \? `\$\{b\.id\} - \$\{b\.nickname\}` : `Bear \$\{b\.id\}`;\n\t\}/,
	`function getBearName(b: any) {
		if (!b) return 'Pick Winner';
		return \`Bear \${b.id}\`;
	}
	function getBearNickname(b: any) {
		return b?.nickname || '';
	}`
);

content = content.replace(
	/<div class="bear-icon"><PixelBear \/><\/div>\s*<div class="bear-name"([^>]*)>\{getBearName\((.*?)\)\}<\/div>/g,
	`{#if getBearNickname($2)}
									<div class="bear-nickname"$1>{getBearNickname($2)}</div>
								{/if}
								<div class="bear-icon"><PixelBear /></div>
								<div class="bear-name"$1>{getBearName($2)}</div>`
);

content = content.replace(
	/\.bear-name \{/,
	`.bear-nickname {
		font-weight: bold;
		font-size: 0.55rem;
		line-height: 1.1;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-shadow: 1px 1px 0 #000;
		color: #ffd700;
		margin-bottom: 2px;
	}
	.bear-name {`
);

fs.writeFileSync(file, content);
