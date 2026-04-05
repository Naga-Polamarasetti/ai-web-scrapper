import joi from 'joi';

const scrapeSchema = joi.object({
  url: joi.string().uri({ scheme: ['http', 'https'] }).required(),
  userPrompt: joi.string().required().min(15).max(300),
});

export { scrapeSchema };
