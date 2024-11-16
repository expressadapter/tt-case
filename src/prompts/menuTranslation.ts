const menuTranslationSystemPrompt = ` - Please ensure that **any values associated with keys named \`image\`** remain **exactly as they are**. For example, if the key is:
      \`\`\`json
      "image": "/images/Placeholder.jpg"
       \`\`\`
       the URL value ("/images/Placeholder.jpg") **must remain unchanged** and not be modified, translated, or otherwise altered in any way.
      - For any value that is 'NOT FOUND', replace it with appropriate information based on your knowledge.
      - Preserve the JSON structure, and return only the updated JSON object.`;

export default menuTranslationSystemPrompt;
