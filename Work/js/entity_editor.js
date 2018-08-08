// let socket = io.connect('https://arialtest.herokuapp.com/',{'forceNew':false});

// socket.on('connect', function(socket){
// 	console.log('Socket is connected!');
// });

// socket.on('data', function(data){
// 	console.log(data);
// });

let entitys = [
	{
		name: "Player",
		id: 1,
		img: "entity1.png",
		big_img: "entity1_big.png",
		params: {
			position_x: 22,
			position_y: 5,
			description: "Игрок"
		}
	},
	{
		name: "Entity",
		id: 2,
		img: "entity2.png",
		big_img: "entity2_big.png",
		params: {
			position_x: 22,
			position_y: 22,
			description: "Какая-то сущность"
		}
	},
	{
		name: "Test",
		id: 3,
		img: "entity3.png",
		big_img: "entity3_big.png",
		params: {
			position_x: 6,
			position_y: 55,
			description: "Тест"
		}
	},
	{
		name: "Enemy1",
		id: 4,
		img: "entity4.png",
		big_img: "entity4_big.png",
		params: {
			position_x: 2,
			position_y: 1,
			description: "Какая-то плохая сущность"
		}
	}
];

for(var i = 0; i < entitys.length; i++){
	var html = document.getElementById('entity_list_body').innerHTML;
	html += '<div class="entity_in_list clearfix my-1" onclick="entity_edit('+entitys[i].id+');"><div class="float-left"><img src="img/'+entitys[i].img+'" width="41" height="41"></div><div class="center">'+entitys[i].name+'</div><div class="float-right">Id: '+entitys[i].id+'</div></div>';

	document.getElementById('entity_list_body').innerHTML = html;
}

function entity_edit(id) {
	$('#editor_entity').attr('src', 'img/'+entitys[id-1].big_img);
	$('#editor_name').val(entitys[id-1].name);
	$('#editor_description').val(entitys[id-1].params.description);
	$('#editor_id').text(entitys[id-1].id);
	$('#editor_posx').val(entitys[id-1].params.position_x);
	$('#editor_posy').val(entitys[id-1].params.position_y);
	$('#editor_img').val(entitys[id-1].img);
	$('#editor_bigimg').val(entitys[id-1].big_img);

	document.getElementById('editor_save').setAttribute('onClick','save('+entitys[id-1].id+');');

	document.getElementById('entity_list').style.display = "none";
	document.getElementById('editor').style.display = "block";
}

function save(id){
	entitys[id-1].big_img = $('#editor_bigimg').val(); 
	entitys[id-1].name = $('#editor_name').val();
	entitys[id-1].params.description = $('#editor_description').val();
	entitys[id-1].id = $('#editor_id').text();
	entitys[id-1].params.position_x = $('#editor_posx').val();
	entitys[id-1].params.position_y = $('#editor_posy').val();
	entitys[id-1].img = $('#editor_img').val();

	document.getElementById('entity_list').style.display = "block";
	document.getElementById('editor').style.display = "none";
}

function newentity(){
	var eid = entitys.length+1;

	entitys.push({
		name: "NONAME",
		id: eid,
		img: "entity1.png",
		big_img: "entity1_big.png",
		params: {
			position_x: 1,
			position_y: 1,
			description: "DESCRIPTION"
		}
	});

	var html = document.getElementById('entity_list_body').innerHTML;
	html += '<div class="entity_in_list clearfix my-1" onclick="entity_edit('+entitys[eid-1].id+');"><div class="float-left"><img src="img/'+entitys[eid-1].img+'" width="41" height="41"></div><div class="center">'+entitys[eid-1].name+'</div><div class="float-right">Id: '+entitys[eid-1].id+'</div></div>';

	document.getElementById('entity_list_body').innerHTML = html;

	entity_edit(eid);
}