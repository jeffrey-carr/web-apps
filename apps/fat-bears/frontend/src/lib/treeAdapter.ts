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

	const getWinner = (node: TreeNode | any) => {
		if (!node || !node.winner || node.winner.id === 0) return null;
		return { ...node.winner, leftVotes: node.leftVotes, rightVotes: node.rightVotes };
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
	const w = (m: Record<string, any[]>, region: string, index: number) => {
		const choice = m[region]?.[index];
		return choice ? { id: choice.id, nickname: choice.nickname, leftVotes: choice.leftVotes, rightVotes: choice.rightVotes } : null;
	};
	const makeNode = (region: string, index: number, left: TreeNode | null, right: TreeNode | null): TreeNode => {
		const winner = w(m, region, index);
		return { winner, leftVotes: winner?.leftVotes, rightVotes: winner?.rightVotes, left, right };
	};
	const makeStatic = (id: number) => ({ winner: b(id), left: null, right: null });

	return {
		winner: w(m, 'finals', 2),
		leftVotes: w(m, 'finals', 2)?.leftVotes,
		rightVotes: w(m, 'finals', 2)?.rightVotes,
		left: makeNode('finals', 0,
			makeNode('northwest', 2,
				makeNode('northwest', 0, makeStatic(132), makeStatic(284)),
				makeNode('northwest', 1, makeStatic(806), makeStatic(901))
			),
			makeNode('southwest', 2,
				makeNode('southwest', 0, makeStatic(909), makeStatic(428)),
				makeNode('southwest', 1, makeStatic(131), makeStatic(910))
			)
		),
		right: makeNode('finals', 1,
			makeNode('northeast', 2,
				makeNode('northeast', 0, makeStatic(694), makeStatic(620)),
				makeNode('northeast', 1, makeStatic(610), makeStatic(89))
			),
			makeNode('southeast', 2,
				makeNode('southeast', 0, makeStatic(32), makeStatic(164)),
				makeNode('southeast', 1, makeStatic(151), makeStatic(903))
			)
		)
	};
}
