// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-COACoWCQqUGQs7WBGBFVD9nw",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

import { Configuration, OpenAIApi , } from 'openai';

if (!process.env.OPENAI_API_KEY){// && !process.env.OPENAI_API_KEY_ORG) {
	throw new Error('Please add your OPENAI_API_KEY'); //or OPENAI_API_KEY_ORG to .env');
}

const configuration = new Configuration({
	//organization: process.env.OPENAI_API_KEY_ORG, //modified here
	apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);