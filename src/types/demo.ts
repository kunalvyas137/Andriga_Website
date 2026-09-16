// TypeScript types for RAG and Agentic AI Demo

export interface WorkflowStep {
    id: string;
    name: string;
    status: "pending" | "running" | "completed" | "failed";
    timestamp: number;
    details?: string;
    error?: string;
}

export interface ContextChunk {
    content: string;
    startIndex: number;
    endIndex: number;
    relevanceScore?: number;
}

export interface RAGResponse {
    response: string;
    workflowSteps: WorkflowStep[];
    sourcesUsed: ContextChunk[];
    functionCalls?: FunctionCall[];
    confidence?: number;
    tokenUsage?: {
        prompt: number;
        completion: number;
        total: number;
    };
}

export interface FunctionCall {
    name: string;
    args: Record<string, any>;
    result?: any;
    timestamp: number;
}

export interface DemoMessage extends Message {
    workflowSteps?: WorkflowStep[];
    sourcesUsed?: ContextChunk[];
}

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}
