import { builder, Builder } from "@builder.io/sdk";

// Initialize Builder with your API key
// Replace with your actual Builder.io public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || "");

// Export for use in other files
export { builder, Builder };
