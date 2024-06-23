export type ScriptSection = {
	slideTitle: string;
	bulletPoints: {
		bulletPoint: string;
		narration: string;
		len?: number;
	}[];
}

export type Script = {
	id: string,
	tag: string,
	sections: ScriptSection[],
}

export type VideoGenerateJob = {
	id: string;
	createdAt: number,
	scriptId: string,
	status: 'queued' | 'processing' | 'done' | 'failed',
}

export type Quiz = {
	id: string;
	scriptId: string;
	questions: {
		question: string;
		choices: string[];
		answerIndex: number;
	}[];
}