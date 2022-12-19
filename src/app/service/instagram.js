
async function getPostLink(url) {

  url = url + 'embed' + '/captioned';


  let res = axios.get(url).then(async (response) => {
    const root = parse(response.data);

    let link = "";
    if (response.data.search("video_url") != -1)
      link = getVideoLinkFromHtml(response.data);
    else
      link = root.querySelector('img.EmbeddedMediaImage').getAttribute("src");





    while (link.search("&amp;") != -1) {
      link = link.replace("&amp;", "&");
    }
    let caption = await getCaptionFromHtml(response.data);

    return { link, caption };

  });

  return res;

}


module.exports = { getPostLink };