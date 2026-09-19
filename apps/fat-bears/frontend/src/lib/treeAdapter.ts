export interface TreeNode {
	winner: { id: number, nickname: string } | null;
	left: TreeNode | null;
	right: TreeNode | null;
}

export function treeToMap(tree: TreeNode | any): Record<string, any[]> {
	const m: Record<string, any[]> = {
		northwest: [null, null, null],
		southwest: [null, null, null],
		northeast: [null, null, null],
		southeast: [null, null, null],
		finals: [null, null, null]
	};

	// If the backend hasn't been updated yet, it might still return the map format.
	// This makes the adapter backwards compatible while the BE is being worked on.
	if (tree && typeof tree === 'object' && 'finals' in tree && Array.isArray(tree.finals)) {
		return tree;
	}

	if (!tree) return m;

	const getWinner = (node: TreeNode | null) => {
		if (!node || !node.winner || node.winner.id === 0) return null;
		return node.winner;
	};

	m.finals[2] = getWinner(tree);
	
	if (tree.left) {
		m.finals[0] = getWinner(tree.left);
		if (tree.left.left) {
			m.northwest[2] = getWinner(tree.left.left);
			if (tree.left.left.left) m.northwest[0] = getWinner(tree.left.left.left);
			if (tree.left.left.right) m.northwest[1] = getWinner(tree.left.left.right);
		}
		if (tree.left.right) {
			m.southwest[2] = getWinner(tree.left.right);
			if (tree.left.right.left) m.southwest[0] = getWinner(tree.left.right.left);
			if (tree.left.right.right) m.southwest[1] = getWinner(tree.left.right.right);
		}
	}

	if (tree.right) {
		m.finals[1] = getWinner(tree.right);
		if (tree.right.left) {
			m.northeast[2] = getWinner(tree.right.left);
			if (tree.right.left.left) m.northeast[0] = getWinner(tree.right.left.left);
			if (tree.right.left.right) m.northeast[1] = getWinner(tree.right.left.right);
		}
		if (tree.right.right) {
			m.southeast[2] = getWinner(tree.right.right);
			if (tree.right.right.left) m.southeast[0] = getWinner(tree.right.right.left);
			if (tree.right.right.right) m.southeast[1] = getWinner(tree.right.right.right);
		}
	}

	return m;
}

export function mapToTree(m: Record<string, any[]>): TreeNode {
	const b = (id: number) => ({ id, nickname: '' });

	return {
		winner: m.finals?.[2] || null,
		left: {
			winner: m.finals?.[0] || null,
			left: {
				winner: m.northwest?.[2] || null,
				left: { 
					winner: m.northwest?.[0] || null, 
					left: { winner: b(132), left: null, right: null }, 
					right: { winner: b(284), left: null, right: null } 
				},
				right: { 
					winner: m.northwest?.[1] || null, 
					left: { winner: b(806), left: null, right: null }, 
					right: { winner: b(901), left: null, right: null } 
				}
			},
			right: {
				winner: m.southwest?.[2] || null,
				left: { 
					winner: m.southwest?.[0] || null, 
					left: { winner: b(909), left: null, right: null }, 
					right: { winner: b(428), left: null, right: null } 
				},
				right: { 
					winner: m.southwest?.[1] || null, 
					left: { winner: b(131), left: null, right: null }, 
					right: { winner: b(910), left: null, right: null } 
				}
			}
		},
		right: {
			winner: m.finals?.[1] || null,
			left: {
				winner: m.northeast?.[2] || null,
				left: { 
					winner: m.northeast?.[0] || null, 
					left: { winner: b(694), left: null, right: null }, 
					right: { winner: b(620), left: null, right: null } 
				},
				right: { 
					winner: m.northeast?.[1] || null, 
					left: { winner: b(610), left: null, right: null }, 
					right: { winner: b(89), left: null, right: null } 
				}
			},
			right: {
				winner: m.southeast?.[2] || null,
				left: { 
					winner: m.southeast?.[0] || null, 
					left: { winner: b(32), left: null, right: null }, 
					right: { winner: b(164), left: null, right: null } 
				},
				right: { 
					winner: m.southeast?.[1] || null, 
					left: { winner: b(151), left: null, right: null }, 
					right: { winner: b(903), left: null, right: null } 
				}
			}
		}
	};
}
