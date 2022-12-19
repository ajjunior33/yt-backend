const express = require('express');
const ytdl = require("ytdl-core")
const cors = require('cors');
const app = express();

app.use(cors());


app.use(express.json());

app.get("/", async (request,response) => {
	try{

		console.log(request.query.url)

		const v_id = request.query.url.split("v=")[1];
		const info = await ytdl.getInfo(request.query.url);

		console.log(info.formats[4]);
		console.log(info.formats[1]);

		return response.status(200).json({
			url: `https://www.youtube.com/embed/${v_id}`,
			info: info.formats.sort((a,b) => {
				return a.mimeType < b.mimeType
			})
		});

	}catch(err){
		console.log(err);
		return response.status(400).json({
			error:"Não foi possivel listar os videos"
		})
	}
});

module.exports = app;