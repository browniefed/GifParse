load('application');

action('index', function () {

    render({
        title: "GifParse"
    });
});

action('view', function () {
	var id = requst.params.id;
	//search database for id
	//return link
	//GIF Parser
	//Use History/State API on client to udpate
    render({
        title: "gif#view",
        id: request.params.id
    });
});

action('add', function () {
	var link = request.params.link;
	//validate link
	//return and just echo the shit out
    render({
        title: "gif#add"
    });
});