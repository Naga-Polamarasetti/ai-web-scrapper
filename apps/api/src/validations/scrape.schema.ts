import joi from 'joi';

const scrapeSchema = joi.object({
  url: joi
    .string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages({
      'string.uri': 'Please provide a valid URL (e.g. https://example.com)',
      'string.empty': 'URL is required',
    }),
  userPrompt: joi.string().required().min(15).max(300).messages({
    'string.min': 'Prompt must be at least 15 characters long',
    'string.max': 'Prompt cannot exceed 300 characters',
    'string.empty': 'Prompt is required',
  }),
});

export { scrapeSchema };
