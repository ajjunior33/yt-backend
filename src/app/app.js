require('dotenv').config()
const express = require('express');
const ytdl = require("ytdl-core")
const cors = require('cors');
const { getPostLink } = require('./service/instagram');
const app = express();

app.use(cors());
app.use(express.json());

app.post("/yt", async (request, response) => {
	try {
		const { url } = request.body;
		console.log(url)

		const v_id = url.split("v=")[1];
		const info = await ytdl.getInfo(url);

		console.log(info.formats[4]);
		console.log(info.formats[1]);

		return response.status(200).json({
			url: `https://www.youtube.com/embed/${v_id}`,
			info: info.formats.sort((a, b) => {
				return a.mimeType < b.mimeType
			})
		});

	} catch (err) {
		console.log(err);
		return response.status(400).json({
			error: "Não foi possivel listar os videos"
		})
	}
});

app.post("/instagram", async (request, response) => {
	try {
		const { url } = request.body;
		const item = await getPostLink(url);
		return response.status(200).json({ item });
	} catch (err) {
		return response.status(400).json({
			error: "Houve um erro ao tentar buscar o vídeo."
		})
	}
});

module.exports = app;