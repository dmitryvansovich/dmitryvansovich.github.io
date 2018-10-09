let socket = io.connect('https://ancientwarserver.herokuapp.com/',{'forceNew':false});
// let socket = io.connect();
let money, pointers, player1, player2, this_player, game_key, player = 1, player_country;
let my_states_arr = [], enemy_states_arr = [];
let move = false;
let selected_state_movefrom;

let player_params = {
	// first_name: 'Дмитрий',
	// last_name: 'Вансович'
	first_name: null,
	last_name: null
};

let player_tehs = [
{
	name: "tanks",
	activated: false
},{
	name: "weapons",
	activated: false
}];

socket.on('connect', function(data){
	// VK.init(function(){
	// 	VK.api('users.get', {fields: "photo_50"}, function(data){
	// 		player_params.first_name = data.response[0].first_name;
	// 		player_params.last_name = data.response[0].last_name;

	// 		$('#game').css('display','block');
	// 		$('#menu').css('display','none');
	// 		$('#startgame').css('display','none');
	// 		$('#serverlist').css('display','none');

	// 		socket.emit('data', {
	// 			command: 'CD003',
	// 			player_params: player_params 
	// 		});
	// 	});
	// },'5.80');

	$('#game').css('display','block');
	$('#menu').css('display','none');
	$('#startgame').css('display','none');
	$('#serverlist').css('display','none');

	socket.emit('data', {
		command: 'CD003',
		player_params: player_params 
	});

	socket.emit('server-list', {
		command: 'CS003',
		id: 0,
		password: 12345
	});
});

socket.on('data', function(data){
	if(data.command == 'DC001'){
		money = data.money-2;
		pointers = data.pointers-2;
		this_player = data.user_socket;

		clicker(1);
		clicker(2);
	} else if(data.command == 'DC002'){
		if(data.key == game_key){
			if(player != data.player){
				socket.emit('data',{
					command: 'CD002',
					key: game_key,
					money: money,
					pointers: pointers,
					player: player
				})
			}
		}
	} else if(data.command == 'DC003'){
		if(data.key == game_key){
			if(data.player == player){
				$('#state_money').text(data.money);
				$('#state_pointers').text(data.pointers);
			}
		}
	} else if(data.command == 'DC004'){
		$('#servers_count').text(data.count);
		$('#server-list_count').text(data.count);
	}
});

socket.on('game', function(data){
	if(data.command == 'SG001' && !game_key){
		if(data.player1 != this_player && data.player2 != this_player) return;

		$('#game').css('display','block');
		$('#menu').css('display','none');
		$('#startgame').css('display','none');
		$('#serverlist').css('display','none');

		game_key = data.key;
		if(data.player1 == this_player){
			player = 1;
			
			let my_states;
			if(player == 1){ my_states = document.getElementsByClassName('model-green'); } else { my_states = document.getElementsByClassName('model-red'); }
			for(let i = 0; i < my_states.length; i++){
				my_states[i].style.opacity = '0.3';
			}

			my_states_arr = [{
				state: GLOBAL_MAP[8].id,
				army: 0
			},{
				state: GLOBAL_MAP[2].id,
				army: 0
			},{
				state: GLOBAL_MAP[12].id,
				army: 0
			},{
				state: GLOBAL_MAP[5].id,
				army: 0
			},{
				state: GLOBAL_MAP[9].id,
				army: 0
			},{
				state: GLOBAL_MAP[14].id,
				army: 0
			},{
				state: GLOBAL_MAP[71].id,
				army: 0
			},{
				state: GLOBAL_MAP[58].id,
				army: 0
			},{
				state: GLOBAL_MAP[59].id,
				army: 0
			},{
				state: GLOBAL_MAP[67].id,
				army: 0
			},{
				state: GLOBAL_MAP[61].id,
				army: 0
			},{
				state: GLOBAL_MAP[74].id,
				army: 0
			},{
				state: GLOBAL_MAP[60].id,
				army: 0
			},{
				state: GLOBAL_MAP[66].id,
				army: 0
			},{
				state: GLOBAL_MAP[62].id,
				army: 0
			},{
				state: GLOBAL_MAP[68].id,
				army: 0
			},{
				state: GLOBAL_MAP[64].id,
				army: 0
			},{
				state: GLOBAL_MAP[78].id,
				army: 0
			},{
				state: GLOBAL_MAP[73].id,
				army: 0
			},{
				state: GLOBAL_MAP[69].id,
				army: 0
			},{
				state: GLOBAL_MAP[70].id,
				army: 0
			},{
				state: GLOBAL_MAP[63].id,
				army: 0
			},{
				state: GLOBAL_MAP[7].id,
				army: 0
			},{
				state: GLOBAL_MAP[1].id,
				army: 0
			},{
				state: GLOBAL_MAP[4].id,
				army: 0
			},{
				state: GLOBAL_MAP[6].id,
				army: 0
			},{
				state: GLOBAL_MAP[72].id,
				army: 0
			},{
				state: GLOBAL_MAP[0].id,
				army: 0
			},{
				state: GLOBAL_MAP[65].id,
				army: 0
			},{
				state: GLOBAL_MAP[94].id,
				army: 0
			},{
				state: GLOBAL_MAP[79].id,
				army: 0
			},{
				state: GLOBAL_MAP[95].id,
				army: 0
			},{
				state: GLOBAL_MAP[81].id,
				army: 0
			},{
				state: GLOBAL_MAP[88].id,
				army: 0
			},{
				state: GLOBAL_MAP[11].id,
				army: 0
			},{
				state: GLOBAL_MAP[80].id,
				army: 0
			},{
				state: GLOBAL_MAP[3].id,
				army: 0
			},{
				state: GLOBAL_MAP[13].id,
				army: 0
			},{
				state: GLOBAL_MAP[15].id,
				army: 0
			},{
				state: GLOBAL_MAP[10].id,
				army: 0
			},{
				state: GLOBAL_MAP[43].id,
				army: 0
			},{
				state: GLOBAL_MAP[47].id,
				army: 0
			},{
				state: GLOBAL_MAP[49].id,
				army: 0
			},{
				state: GLOBAL_MAP[42].id,
				army: 0
			},{
				state: GLOBAL_MAP[50].id,
				army: 0
			},{
				state: GLOBAL_MAP[56].id,
				army: 0
			},{
				state: GLOBAL_MAP[37].id,
				army: 0
			},{
				state: GLOBAL_MAP[92].id,
				army: 0
			},{
				state: GLOBAL_MAP[90].id,
				army: 0
			},{
				state: GLOBAL_MAP[93].id,
				army: 0
			},{
				state: GLOBAL_MAP[84].id,
				army: 0
			},{
				state: GLOBAL_MAP[100].id,
				army: 0
			},{
				state: GLOBAL_MAP[51].id,
				army: 0
			},{
				state: GLOBAL_MAP[52].id,
				army: 0
			},{
				state: GLOBAL_MAP[45].id,
				army: 0
			},{
				state: GLOBAL_MAP[53].id,
				army: 0
			},{
				state: GLOBAL_MAP[48].id,
				army: 0
			},{
				state: GLOBAL_MAP[40].id,
				army: 0
			},{
				state: GLOBAL_MAP[41].id,
				army: 0
			}];

			enemy_states_arr = [{
				state: GLOBAL_MAP[29].id,
				army: 0
			},{
				state: GLOBAL_MAP[87].id,
				army: 0
			},{
				state: GLOBAL_MAP[77].id,
				army: 0
			},{
				state: GLOBAL_MAP[85].id,
				army: 0
			},{
				state: GLOBAL_MAP[86].id,
				army: 0
			},{
				state: GLOBAL_MAP[83].id,
				army: 0
			},{
				state: GLOBAL_MAP[22].id,
				army: 0
			},{
				state: GLOBAL_MAP[20].id,
				army: 0
			},{
				state: GLOBAL_MAP[35].id,
				army: 0
			},{
				state: GLOBAL_MAP[17].id,
				army: 0
			},{
				state: GLOBAL_MAP[26].id,
				army: 0
			},{
				state: GLOBAL_MAP[18].id,
				army: 0
			},{
				state: GLOBAL_MAP[30].id,
				army: 0
			},{
				state: GLOBAL_MAP[28].id,
				army: 0
			},{
				state: GLOBAL_MAP[33].id,
				army: 0
			},{
				state: GLOBAL_MAP[21].id,
				army: 0
			},{
				state: GLOBAL_MAP[36].id,
				army: 0
			},{
				state: GLOBAL_MAP[19].id,
				army: 0
			},{
				state: GLOBAL_MAP[16].id,
				army: 0
			},{
				state: GLOBAL_MAP[24].id,
				army: 0
			},{
				state: GLOBAL_MAP[76].id,
				army: 0
			},{
				state: GLOBAL_MAP[91].id,
				army: 0
			},{
				state: GLOBAL_MAP[96].id,
				army: 0
			},{
				state: GLOBAL_MAP[89].id,
				army: 0
			},{
				state: GLOBAL_MAP[25].id,
				army: 0
			},{
				state: GLOBAL_MAP[31].id,
				army: 0
			},{
				state: GLOBAL_MAP[34].id,
				army: 0
			},{
				state: GLOBAL_MAP[82].id,
				army: 0
			},{
				state: GLOBAL_MAP[32].id,
				army: 0
			},{
				state: GLOBAL_MAP[23].id,
				army: 0
			},{
				state: GLOBAL_MAP[27].id,
				army: 0
			},{
				state: GLOBAL_MAP[101].id,
				army: 0
			},{
				state: GLOBAL_MAP[117].id,
				army: 0
			},{
				state: GLOBAL_MAP[109].id,
				army: 0
			},{
				state: GLOBAL_MAP[75].id,
				army: 0
			},{
				state: GLOBAL_MAP[97].id,
				army: 0
			},{
				state: GLOBAL_MAP[110].id,
				army: 0
			},{
				state: GLOBAL_MAP[102].id,
				army: 0
			},{
				state: GLOBAL_MAP[111].id,
				army: 0
			},{
				state: GLOBAL_MAP[108].id,
				army: 0
			},{
				state: GLOBAL_MAP[104].id,
				army: 0
			},{
				state: GLOBAL_MAP[114].id,
				army: 0
			},{
				state: GLOBAL_MAP[106].id,
				army: 0
			},{
				state: GLOBAL_MAP[107].id,
				army: 0
			},{
				state: GLOBAL_MAP[116].id,
				army: 0
			},{
				state: GLOBAL_MAP[115].id,
				army: 0
			},{
				state: GLOBAL_MAP[99].id,
				army: 0
			},{
				state: GLOBAL_MAP[113].id,
				army: 0
			},{
				state: GLOBAL_MAP[46].id,
				army: 0
			},{
				state: GLOBAL_MAP[57].id,
				army: 0
			},{
				state: GLOBAL_MAP[39].id,
				army: 0
			},{
				state: GLOBAL_MAP[38].id,
				army: 0
			},{
				state: GLOBAL_MAP[44].id,
				army: 0
			},{
				state: GLOBAL_MAP[55].id,
				army: 0
			},{
				state: GLOBAL_MAP[98].id,
				army: 0
			},{
				state: GLOBAL_MAP[112].id,
				army: 0
			},{
				state: GLOBAL_MAP[105].id,
				army: 0
			},{
				state: GLOBAL_MAP[54].id,
				army: 0
			},{
				state: GLOBAL_MAP[103].id,
				army: 0
			}];

			// for(var i = 0; i < enemy_states_arr.length; i++){
			// 	$('#'+enemy_states_arr[i].state).css('fill','black');
			// 	console.log(enemy_states_arr[i].state);
			// }
		}

		if(data.player2 == this_player){
			player = 2;

			let my_states;
			if(player == 1){ my_states = document.getElementsByClassName('model-green'); } else { my_states = document.getElementsByClassName('model-red'); }
			for(let i = 0; i < my_states.length; i++){
				my_states[i].style.opacity = '0.3';
			}

			enemy_states_arr = [{
				state: GLOBAL_MAP[8].id,
				army: 0
			},{
				state: GLOBAL_MAP[2].id,
				army: 0
			},{
				state: GLOBAL_MAP[12].id,
				army: 0
			},{
				state: GLOBAL_MAP[5].id,
				army: 0
			},{
				state: GLOBAL_MAP[9].id,
				army: 0
			},{
				state: GLOBAL_MAP[14].id,
				army: 0
			},{
				state: GLOBAL_MAP[71].id,
				army: 0
			},{
				state: GLOBAL_MAP[58].id,
				army: 0
			},{
				state: GLOBAL_MAP[59].id,
				army: 0
			},{
				state: GLOBAL_MAP[67].id,
				army: 0
			},{
				state: GLOBAL_MAP[61].id,
				army: 0
			},{
				state: GLOBAL_MAP[74].id,
				army: 0
			},{
				state: GLOBAL_MAP[60].id,
				army: 0
			},{
				state: GLOBAL_MAP[66].id,
				army: 0
			},{
				state: GLOBAL_MAP[62].id,
				army: 0
			},{
				state: GLOBAL_MAP[68].id,
				army: 0
			},{
				state: GLOBAL_MAP[64].id,
				army: 0
			},{
				state: GLOBAL_MAP[78].id,
				army: 0
			},{
				state: GLOBAL_MAP[73].id,
				army: 0
			},{
				state: GLOBAL_MAP[69].id,
				army: 0
			},{
				state: GLOBAL_MAP[70].id,
				army: 0
			},{
				state: GLOBAL_MAP[63].id,
				army: 0
			},{
				state: GLOBAL_MAP[7].id,
				army: 0
			},{
				state: GLOBAL_MAP[1].id,
				army: 0
			},{
				state: GLOBAL_MAP[4].id,
				army: 0
			},{
				state: GLOBAL_MAP[6].id,
				army: 0
			},{
				state: GLOBAL_MAP[72].id,
				army: 0
			},{
				state: GLOBAL_MAP[0].id,
				army: 0
			},{
				state: GLOBAL_MAP[65].id,
				army: 0
			},{
				state: GLOBAL_MAP[94].id,
				army: 0
			},{
				state: GLOBAL_MAP[79].id,
				army: 0
			},{
				state: GLOBAL_MAP[95].id,
				army: 0
			},{
				state: GLOBAL_MAP[81].id,
				army: 0
			},{
				state: GLOBAL_MAP[88].id,
				army: 0
			},{
				state: GLOBAL_MAP[11].id,
				army: 0
			},{
				state: GLOBAL_MAP[80].id,
				army: 0
			},{
				state: GLOBAL_MAP[3].id,
				army: 0
			},{
				state: GLOBAL_MAP[13].id,
				army: 0
			},{
				state: GLOBAL_MAP[15].id,
				army: 0
			},{
				state: GLOBAL_MAP[10].id,
				army: 0
			},{
				state: GLOBAL_MAP[43].id,
				army: 0
			},{
				state: GLOBAL_MAP[47].id,
				army: 0
			},{
				state: GLOBAL_MAP[49].id,
				army: 0
			},{
				state: GLOBAL_MAP[42].id,
				army: 0
			},{
				state: GLOBAL_MAP[50].id,
				army: 0
			},{
				state: GLOBAL_MAP[56].id,
				army: 0
			},{
				state: GLOBAL_MAP[37].id,
				army: 0
			},{
				state: GLOBAL_MAP[92].id,
				army: 0
			},{
				state: GLOBAL_MAP[90].id,
				army: 0
			},{
				state: GLOBAL_MAP[93].id,
				army: 0
			},{
				state: GLOBAL_MAP[84].id,
				army: 0
			},{
				state: GLOBAL_MAP[100].id,
				army: 0
			},{
				state: GLOBAL_MAP[51].id,
				army: 0
			},{
				state: GLOBAL_MAP[52].id,
				army: 0
			},{
				state: GLOBAL_MAP[45].id,
				army: 0
			},{
				state: GLOBAL_MAP[53].id,
				army: 0
			},{
				state: GLOBAL_MAP[48].id,
				army: 0
			},{
				state: GLOBAL_MAP[40].id,
				army: 0
			},{
				state: GLOBAL_MAP[41].id,
				army: 0
			}];

			my_states_arr = [{
				state: GLOBAL_MAP[29].id,
				army: 0
			},{
				state: GLOBAL_MAP[87].id,
				army: 0
			},{
				state: GLOBAL_MAP[77].id,
				army: 0
			},{
				state: GLOBAL_MAP[85].id,
				army: 0
			},{
				state: GLOBAL_MAP[86].id,
				army: 0
			},{
				state: GLOBAL_MAP[83].id,
				army: 0
			},{
				state: GLOBAL_MAP[22].id,
				army: 0
			},{
				state: GLOBAL_MAP[20].id,
				army: 0
			},{
				state: GLOBAL_MAP[35].id,
				army: 0
			},{
				state: GLOBAL_MAP[17].id,
				army: 0
			},{
				state: GLOBAL_MAP[26].id,
				army: 0
			},{
				state: GLOBAL_MAP[18].id,
				army: 0
			},{
				state: GLOBAL_MAP[30].id,
				army: 0
			},{
				state: GLOBAL_MAP[28].id,
				army: 0
			},{
				state: GLOBAL_MAP[33].id,
				army: 0
			},{
				state: GLOBAL_MAP[21].id,
				army: 0
			},{
				state: GLOBAL_MAP[36].id,
				army: 0
			},{
				state: GLOBAL_MAP[19].id,
				army: 0
			},{
				state: GLOBAL_MAP[16].id,
				army: 0
			},{
				state: GLOBAL_MAP[24].id,
				army: 0
			},{
				state: GLOBAL_MAP[76].id,
				army: 0
			},{
				state: GLOBAL_MAP[91].id,
				army: 0
			},{
				state: GLOBAL_MAP[96].id,
				army: 0
			},{
				state: GLOBAL_MAP[89].id,
				army: 0
			},{
				state: GLOBAL_MAP[25].id,
				army: 0
			},{
				state: GLOBAL_MAP[31].id,
				army: 0
			},{
				state: GLOBAL_MAP[34].id,
				army: 0
			},{
				state: GLOBAL_MAP[82].id,
				army: 0
			},{
				state: GLOBAL_MAP[32].id,
				army: 0
			},{
				state: GLOBAL_MAP[23].id,
				army: 0
			},{
				state: GLOBAL_MAP[27].id,
				army: 0
			},{
				state: GLOBAL_MAP[101].id,
				army: 0
			},{
				state: GLOBAL_MAP[117].id,
				army: 0
			},{
				state: GLOBAL_MAP[109].id,
				army: 0
			},{
				state: GLOBAL_MAP[75].id,
				army: 0
			},{
				state: GLOBAL_MAP[97].id,
				army: 0
			},{
				state: GLOBAL_MAP[110].id,
				army: 0
			},{
				state: GLOBAL_MAP[102].id,
				army: 0
			},{
				state: GLOBAL_MAP[111].id,
				army: 0
			},{
				state: GLOBAL_MAP[108].id,
				army: 0
			},{
				state: GLOBAL_MAP[104].id,
				army: 0
			},{
				state: GLOBAL_MAP[114].id,
				army: 0
			},{
				state: GLOBAL_MAP[106].id,
				army: 0
			},{
				state: GLOBAL_MAP[107].id,
				army: 0
			},{
				state: GLOBAL_MAP[116].id,
				army: 0
			},{
				state: GLOBAL_MAP[115].id,
				army: 0
			},{
				state: GLOBAL_MAP[99].id,
				army: 0
			},{
				state: GLOBAL_MAP[113].id,
				army: 0
			},{
				state: GLOBAL_MAP[46].id,
				army: 0
			},{
				state: GLOBAL_MAP[57].id,
				army: 0
			},{
				state: GLOBAL_MAP[39].id,
				army: 0
			},{
				state: GLOBAL_MAP[38].id,
				army: 0
			},{
				state: GLOBAL_MAP[44].id,
				army: 0
			},{
				state: GLOBAL_MAP[55].id,
				army: 0
			},{
				state: GLOBAL_MAP[98].id,
				army: 0
			},{
				state: GLOBAL_MAP[112].id,
				army: 0
			},{
				state: GLOBAL_MAP[105].id,
				army: 0
			},{
				state: GLOBAL_MAP[54].id,
				army: 0
			},{
				state: GLOBAL_MAP[103].id,
				army: 0
			}];
		}

		if(player == 1){
			$('#player_country').text('Рейх');
			player_country = 'Рейх';
			$('#player_country_flag').attr('src','assets/img/germany_reich.png');
		} else if(player == 2){
			$('#player_country').text('СССР');
			player_country = 'СССР';
			$('#player_country_flag').attr('src','assets/img/ussr.png');
		}

		// updateStates();
	} else if(data.command == 'SG002'){
		if(game_key == data.key){
			$('body').css('display','none');
			alert('Ваш противник вышел из игры');
		}
	} else if(data.command == 'SG003'){
		if(game_key == data.key){
			if(data.byplayer != this_player){
				enemy_states_arr = data.newstates;
				my_states_arr = data.enemynewstates;
				updateStates();
			} else {
				my_states_arr = data.newstates;
				enemy_states_arr = data.enemynewstates;
				updateStates();
			}
		}
	} else if(data.command == 'SG004'){
		if(game_key == data.key){
			updateStates();
		}
	}
});

socket.on('chat', function(data){
	if(data.command == 'SC001'){
		if(game_key == data.key){
			let message;

			if(data.player == 2){
				message = '<div class="message"><label style="color:tomato;">[Рейх]</label> <b><ins>'+data.player_name+'</ins></b>: '+data.message+'</div>';
			} else if(data.player == 1){
				message = '<div class="message"><label style="color:#6cb361;">[СССР]</label> <b><ins>'+data.player_name+'</ins></b>: '+data.message+'</div>';
			}

			let html = document.getElementById('messages').innerHTML;
			html += message;
			document.getElementById('messages').innerHTML = html;

			var el = document.getElementsByClassName('chat-messages')[0];
			el.scrollTop = el.scrollHeight;
		}
	} else if(data.command == 'SC002'){
		if(game_key == data.key){
			let message;

			message = '<div class="message"><label style="color:#2d68b2;">[Игра]</label> '+data.message+'</div>';

			let html = document.getElementById('messages').innerHTML;
			html += message;
			document.getElementById('messages').innerHTML = html;

			var el = document.getElementsByClassName('chat-messages')[0];
			el.scrollTop = el.scrollHeight;
		}
	}
});

let selected_state;

document.getElementsByClassName('getArmy_range')[0].addEventListener('change', function(){
	document.getElementById('armyRange_text').innerHTML = document.getElementsByClassName('getArmy_range')[0].value+' (-20 очков)';
});

document.getElementsByClassName('deleteArmy_range')[0].addEventListener('change', function(){
	document.getElementById('armyRangeD_text').innerHTML = document.getElementsByClassName('deleteArmy_range')[0].value+' (0 очков)';
});

document.getElementsByClassName('moveBlock_range')[0].addEventListener('change', function(){
	for(let i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state_movefrom.toUpperCase()){
			document.getElementById('moveBlock_text').innerHTML = document.getElementsByClassName('moveBlock_range')[0].value+' (-30 очков)';		
		}
	}
});

let selected_state_move = null;
function click(state){
	if(selected_state != state){
		if(move == false){
			let states = document.getElementsByTagName('polygon');
			for(let i = 0; i < states.length; i++){
				states[i].style.opacity = '0.3';
			}

			selected_state = state;

			document.getElementById(state+'-raion').style.opacity = '1';

			$('.bottom_menu').css('display','none');
			$('.getArmy').css('display','none');
			$('.deleteArmy').css('display','none');

			$('.right-panel').css('display','block');
			$('.right-panel .buttons').css('display','none');

			for(var i = 0; i < GLOBAL_MAP.length; i++){
				if(GLOBAL_MAP[i].id == state+"-raion"){
					$('#state_terr').text(GLOBAL_MAP[i].name+'['+i+']');
				}
			}

			if(player_country == 'СССР'){
				$('#terr_player_country').text('Рейх');
				$('#terr_player_country_flag').attr('src','assets/img/germany_reich.png');

				let terrs_text = null;
				if(enemy_states_arr.length == 1) terrs_text = 'территория';
				if(enemy_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
				if(enemy_states_arr.length == 4) terrs_text = 'территории';
				if(enemy_states_arr.length >= 5) terrs_text = 'территорий'; 
				document.getElementById('terr_state_name').innerHTML = enemy_states_arr.length+' '+terrs_text;	
			} else {
				$('#terr_player_country').text('СССР');
				$('#terr_player_country_flag').attr('src','assets/img/ussr.png');

				let terrs_text = null;
				if(enemy_states_arr.length == 1) terrs_text = 'территория';
				if(enemy_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
				if(enemy_states_arr.length == 4) terrs_text = 'территории';
				if(enemy_states_arr.length >= 5) terrs_text = 'территорий'; 
				document.getElementById('terr_state_name').innerHTML = enemy_states_arr.length+' '+terrs_text;
			}

			if(player_country == 'Рейх'){
				$('#terr_owner').text('Территория СССР');
			} else {
				$('#terr_owner').text('Территория Рейха');
			}

			for(let i = 0; i < my_states_arr.length; i++){
				if(my_states_arr[i].state == state+'-raion'){
					$('#state_army').text(numberWithSpaces(my_states_arr[i].army));
					$('#state_popular').text(numberWithSpaces(my_states_arr[i].army*70));
				}
			}

			for(let i = 0; i < enemy_states_arr.length; i++){
				if(enemy_states_arr[i].state == state+'-raion'){
					$('#state_army').text(numberWithSpaces(enemy_states_arr[i].army));
					$('#state_popular').text(numberWithSpaces(my_states_arr[i].army*70));
				}
			}

			$('#state_money').text('?');
			$('#state_pointers').text('?');

			for(let i = 0; i < my_states_arr.length; i++){
				if(my_states_arr[i].state == state+'-raion'){
					$('.right-panel .buttons').css('display','flex');

					$('#state_money').text(money);
					$('#state_pointers').text(pointers);

					if(player_country == 'Рейх'){
						$('#terr_owner').text('Территория Рейха');
					} else {
						$('#terr_owner').text('Территория СССР');
					}

					if(player_country == 'СССР'){
						$('#terr_player_country').text('СССР');
						$('#terr_player_country_flag').attr('src','assets/img/ussr.png');

						let terrs_text = null;
						if(my_states_arr.length == 1) terrs_text = 'территория';
						if(my_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
						if(my_states_arr.length == 4) terrs_text = 'территории';
						if(my_states_arr.length >= 5) terrs_text = 'территорий'; 
						document.getElementById('terr_state_name').innerHTML = my_states_arr.length+' '+terrs_text;
					} else {
						$('#terr_player_country').text('Рейх');
						$('#terr_player_country_flag').attr('src','assets/img/germany_reich.png');

						let terrs_text = null;
						if(my_states_arr.length == 1) terrs_text = 'территория';
						if(my_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
						if(my_states_arr.length == 4) terrs_text = 'территории';
						if(my_states_arr.length >= 5) terrs_text = 'территорий'; 
						document.getElementById('terr_state_name').innerHTML = my_states_arr.length+' '+terrs_text;	
					}	
				}
			}
		} else if(!selected_state_move) {
			let states = document.getElementsByTagName('a');
			let thisstate = document.getElementById('state_'+state);	

			if(thisstate.style.opacity != '0.7') return;

			$('.move').css('display','block');

			selected_state_move = state;

			if(thisstate.style.opacity == '0.7'){
				thisstate.style.opacity = '1';
			}

			for(let i = 0; i < states.length; i++){
				if(states[i].style.opacity != '1'){
					states[i].style.opacity = '0.3';
				}
			}

			$('.bottom_menu').css('display','none');
			$('.getArmy').css('display','none');
			$('.deleteArmy').css('display','none');

			// for(let i = 0; i <states.length; i++){
			// 	states[i].style.opacity = '0.3';
			// }

			// let my_states = document.getElementsByClassName('state_player'+player);
			// for(let i = 0; i < my_states.length; i++){
			// 	my_states[i].style.opacity = '1';
			// }

			let this_army;

			for(let i = 0; i < my_states_arr.length; i++){
				if(my_states_arr[i].state == selected_state_movefrom.toUpperCase()){
					this_army = my_states_arr[i].army;
					updateMoveRange();
				}
			}
			function updateMoveRange(){
				document.getElementsByClassName('moveBlock_range')[0].min = "0";
				document.getElementsByClassName('moveBlock_range')[0].max = ""+this_army;
				document.getElementsByClassName('moveBlock_range')[0].value = ""+this_army/2;
				document.getElementById('moveBlock_text').innerHTML = document.getElementsByClassName('moveBlock_range')[0].value+' (-30 очков)';
			}

			selected_state = null;
		}
	} else {
		move_cancel();
	}
}

function clicker(item){
	if(item == 1) {
		money = money + 2;
		document.getElementById('gov_money').innerHTML = 'Казна: '+numberWithSpaces(money);
	} else if(item == 2) {
		pointers = pointers + 2;
		document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);
	}
}

function show_moveArmy() {
	$('.bottom_menu').css('display','none');
	$('.getArmy').css('display','none');
	$('.deleteArmy').css('display','none');

	for(var i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state.toUpperCase()){
			var states = document.getElementsByTagName('a');
			move = true;
			selected_state_movefrom = selected_state;

			if(selected_state == 'AC'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_am'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ro'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'AM'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_ac'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ro'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_mt'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_pa'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_rr'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'RR'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_am'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_pa'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'PA'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_rr'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_am'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_mt'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_to'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ma'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ap'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'AP'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_pa'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'RO'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_am'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_mt'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'MT'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_ro'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_am'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_pa'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_to'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ms'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_go'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'TO'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_mt'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_pa'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ma'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_pi'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ma'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_go'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ba'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'MA'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_pa'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_to'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ba'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_pi'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'MS'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_mt'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_go'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_mg'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_sp'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_pr'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'GO'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_ms'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_mt'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_to'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ba'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_mg'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'BA'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_mg'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_go'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_to'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ma'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_pi'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'PI'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_ma'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_to'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ba'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'MG'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_sp'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ms'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_go'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ba'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'SP'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_pr'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_ms'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_mg'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'PR'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_ms'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_sp'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_sc'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'SC'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_pr'){
						states[i].style.opacity = '0.7';
					}
					if(states[i].id == 'state_rs'){
						states[i].style.opacity = '0.7';
					}
				}
			} else if(selected_state == 'RS'){
				for(let i = 0; i < states.length; i++){
					if(states[i].id == 'state_sc'){
						states[i].style.opacity = '0.7';
					}
				}
			}
		} else if(i == my_states_arr.length - 1){
			return;
		}
	}
}

function show_getArmy() {
	$('.bottom_menu').css('display','none');
	$('.getArmy').css('display','block');
	$('.deleteArmy').css('display','none');

	document.getElementsByClassName('getArmy_range')[0].min = "0";
	if(player_tehs[1].activated == false){
		document.getElementsByClassName('getArmy_range')[0].max = ""+money;
	} else if(player_tehs[1].activated == true){
		document.getElementsByClassName('getArmy_range')[0].max = ""+Math.round(money*1.5);
	}
	document.getElementsByClassName('getArmy_range')[0].value = ""+money/2;
	document.getElementById('armyRange_text').innerHTML = document.getElementsByClassName('getArmy_range')[0].value+' (-20 очков)';
}

function show_deleteArmy() {
	$('.bottom_menu').css('display','none');
	$('.deleteArmy').css('display','block');

	for(let i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state){
			document.getElementsByClassName('deleteArmy_range')[0].min = "0";
			document.getElementsByClassName('deleteArmy_range')[0].max = ""+my_states_arr[i].army;
			document.getElementsByClassName('deleteArmy_range')[0].value = ""+my_states_arr[i].army/2;
			document.getElementById('armyRangeD_text').innerHTML = document.getElementsByClassName('deleteArmy_range')[0].value+' (0 очков)';
		}
	}
}

// function updateStates(){
// 	let states = document.getElementsByTagName('a');
// 	let enemyplayer;

// 	if(player == 1) { enemyplayer = 2; } else { enemyplayer = 1; }

// 	for(let i = 0; i < my_states_arr.length; i++){
// 		for(let s = 0; s < states.length; s++){
// 			if(states[s].id == 'state_'+my_states_arr[i].state.toLowerCase()){
// 				states[s].setAttribute("class",'state_player'+player);
// 				//states[s].style.opacity = '1';
// 			}
// 		}
// 		document.getElementById('label_icon_state_'+my_states_arr[i].state.toLowerCase()).textContent = ''+my_states_arr[i].army;
// 	}

// 	for(let i = 0; i < enemy_states_arr.length; i++){
// 		for(let s = 0; s < states.length; s++){
// 			if(states[s].id == 'state_'+enemy_states_arr[i].state.toLowerCase()){
// 				states[s].setAttribute("class",'state_player'+enemyplayer);
// 				//states[s].style.opacity = '0.3';
// 			}
// 		}
// 		document.getElementById('label_icon_state_'+enemy_states_arr[i].state.toLowerCase()).textContent = ''+enemy_states_arr[i].army;
// 	}

// 	let terrs_text = null;
// 	if(my_states_arr.length == 1) terrs_text = 'территория';
// 	if(my_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория';
// 	if(my_states_arr.length == 4) terrs_text = 'территории';
// 	if(my_states_arr.length >= 5) terrs_text = 'территорий'; 
// 	document.getElementsByClassName('state_name')[0].innerHTML = my_states_arr.length+' '+terrs_text;
// }

function newArmy(){
	if(!selected_state) return;

	if(pointers < 20) return;

	for(let i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state){
			let value;

			if(player_tehs[1].activated == false){
				value = document.getElementsByClassName('getArmy_range')[0].value;
			} else {
				let value1 = document.getElementsByClassName('getArmy_range')[0].value;
				value = ''+Math.round(value1/1.5);
			}

			money = money - value*1;
			pointers = pointers - 20;
			document.getElementById('gov_money').innerHTML = 'Казна: '+numberWithSpaces(money);
			document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);
			my_states_arr[i].army = my_states_arr[i].army*1 + value*1;

			socket.emit('game',{
				command: "GS001",
				key: game_key,
				newstates: my_states_arr,
				enemynewstates: enemy_states_arr,
				byplayer: this_player
			});

			move_cancel();
		}
	}
}

function deleteArmy(){
	if(!selected_state) return;

	for(let i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state){
			let value = document.getElementsByClassName('deleteArmy_range')[0].value;

			money = money + value*1;
			document.getElementById('gov_money').innerHTML = 'Казна: '+numberWithSpaces(money);
			document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);
			my_states_arr[i].army = my_states_arr[i].army*1 - value*1;

			move_cancel();

			socket.emit('game',{
				command: "GS001",
				key: game_key,
				newstates: my_states_arr,
				enemynewstates: enemy_states_arr,
				byplayer: this_player
			});
		}
	}
}

function move_ok(){
	let movefrom_army = document.getElementsByClassName('moveBlock_range')[0].value, moveto_army;
	let moveto_mystate = false;

	if(pointers < 30) return;

	for(var i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state_move.toUpperCase()){
			moveto_mystate = true;
			moveto_army = my_states_arr[i].army;
		}
	}

	if(moveto_mystate == false){
		for(var i = 0; i < enemy_states_arr.length; i++){
			if(enemy_states_arr[i].state == selected_state_move.toUpperCase()){
				moveto_army = enemy_states_arr[i].army;
			}
		}
	}

	if(moveto_mystate == true){
		for(var i = 0; i < my_states_arr.length; i++){
			if(my_states_arr[i].state == selected_state_move.toUpperCase()){
				my_states_arr[i].army = my_states_arr[i].army*1 + movefrom_army*1;

				pointers = pointers*1 - 30;
				document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);

				socket.emit('game',{
					command: "GS001",
					key: game_key,
					newstates: my_states_arr,
					enemynewstates: enemy_states_arr,
					byplayer: this_player
				});
			}
			if(my_states_arr[i].state == selected_state_movefrom.toUpperCase()){
				my_states_arr[i].army = my_states_arr[i].army*1 - movefrom_army*1;

				pointers = pointers*1 - 30;
				document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);

				document.getElementsByClassName('moveBlock_range')[0].min = "0";
				document.getElementsByClassName('moveBlock_range')[0].max = ""+my_states_arr[i].army;
				document.getElementsByClassName('moveBlock_range')[0].value = ""+my_states_arr[i].army/2;
				document.getElementById('moveBlock_text').innerHTML = document.getElementsByClassName('moveBlock_range')[0].value+' (-30 очков)';

				socket.emit('game',{
					command: "GS001",
					key: game_key,
					newstates: my_states_arr,
					enemynewstates: enemy_states_arr,
					byplayer: this_player
				});
			}
		}
	} else if(moveto_mystate == false){
		for(var i = 0; i < my_states_arr.length; i++){
			if(my_states_arr[i].state == selected_state_movefrom.toUpperCase()){
				my_states_arr[i].army = my_states_arr[i].army*1 - movefrom_army*1;

				pointers = pointers*1 - 30;
				document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);

				document.getElementsByClassName('moveBlock_range')[0].min = "0";
				document.getElementsByClassName('moveBlock_range')[0].max = ""+my_states_arr[i].army;
				document.getElementsByClassName('moveBlock_range')[0].value = ""+my_states_arr[i].army/2;
				document.getElementById('moveBlock_text').innerHTML = document.getElementsByClassName('moveBlock_range')[0].value+' (-30 очков)';

				socket.emit('game',{
					command: "GS001",
					key: game_key,
					newstates: my_states_arr,
					enemynewstates: enemy_states_arr,
					byplayer: this_player
				});
			}
		}
		for(var i = 0; i < enemy_states_arr.length; i++){
			if(enemy_states_arr[i].state == selected_state_move.toUpperCase()){
				if(enemy_states_arr[i].army < movefrom_army){
					movefrom_army = movefrom_army - enemy_states_arr[i].army;
					enemy_states_arr[i].army = movefrom_army;

					my_states_arr.push(enemy_states_arr[i]);
					enemy_states_arr.splice(i, 1);

					socket.emit('game',{
						command: "GS001",
						key: game_key,
						newstates: my_states_arr,
						enemynewstates: enemy_states_arr,
						byplayer: this_player
					});

					let states = document.getElementsByTagName('a');
					for(var x = 0; x < states.length; x++){
						if(states[x].id == 'state_'+selected_state_move){
							socket.emit('game', {
								command: "GS002",
								key: game_key,
								state: x
							});
							if(states[x].className == 'state_player2'){
								states[x].setAttribute("class","state_player1");
							} else {
								states[x].setAttribute("class","state_player2");
							}
						}
					}

					move_cancel();
					selected_state_move = null;
				} else {
					enemy_states_arr[i].army = enemy_states_arr[i].army - movefrom_army;

					socket.emit('game',{
						command: "GS001",
						key: game_key,
						newstates: my_states_arr,
						enemynewstates: enemy_states_arr,
						byplayer: this_player
					});
				}
			}
		}
	}

	move_cancel();
}

function move_cancel(){
	$('.bottom_menu').css('display','none');
	$('.getArmy').css('display','none');
	$('.deleteArmy').css('display','none');
	$('.move').css('display','none');
	$('.right-panel').css('display','none');
	$('.right-panel .buttons').css('display','none');

	let states = document.getElementsByTagName('polygon');

	for(let i = 0; i <states.length; i++){
		states[i].style.opacity = '0.3';
	}

	let my_states;
	if(player == 1){ my_states = document.getElementsByClassName('model-green'); } else { my_states = document.getElementsByClassName('model-red'); }
	for(let i = 0; i < my_states.length; i++){
		my_states[i].style.opacity = '1';
	}

	move = false;
	selected_state = null;
	selected_state_move = null;
	selected_state_movefrom = null;
}

let chat = false;
function chat_button() {
	if(chat == false){
		$('.chat').css('bottom','0');
		$('.chat-global').css('display','inline-block');
		$('.chat-game').css('display','inline-block');
		$('#chat-button-img').attr('src','assets/img/arrow-down.png');
		$('.chat-button').css('background-color','#222');

		chat = true;
	} else if(chat == true){
		$('.chat-global').css('display','none');
		$('.chat-game').css('display','none');
		$('.chat').css('bottom','-200px');
		$('#chat-button-img').attr('src','assets/img/arrow-up.png');
		$('.chat-button').css('background-color','#222');

		chat = false;
	}
}

function sendMessage() {
	var message_text = $('.chat-input').val();

	if(message_text == ' ') return;
	if(message_text == '') return;
	if(!game_key) return;
	if(!player) return;

	if(message_text == '/server_stats') {
		socket.emit('stats', {
			game_key: game_key
		});
	} else if(message_text){
		socket.emit('chat',{
			command: "CC001",
			key: game_key,
			message: message_text,
			player: player,
			player_name: player_params.first_name
		});
	}

	$('.chat-input').val('');
}

$('#chat-input').on('keydown', function(e) {
    var that = this;

    if (e.keyCode == 13) { sendMessage(); }

    setTimeout(function() {
        var res = /[^а-яА-Яa-zA-Z!?: 1-9,.ёЁ<>=+-;()0_]/g.exec(that.value);
        that.value = that.value.replace(res, '');
    }, 0);
});

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

setInterval(function(){
	money = money + my_states_arr.length;
	pointers = pointers + Math.floor(my_states_arr.length/7)*1;

	document.getElementById('gov_money').innerHTML = 'Казна: '+numberWithSpaces(money);
	document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);
}, 3000);

function changeColor(type){
	let states = document.getElementsByTagName('a');

	if(type == 'peace'){
		for(var x = 0; x < states.length; x++){
			$('#'+states[x].id+' .shape').css('fill','#6cb361');
		}
	} else if(type == 'war'){
		for(let i = 0; i < my_states_arr.length; i++){
			for(let s = 0; s < states.length; s++){
				if(states[s].id == 'state_'+my_states_arr[i].state.toLowerCase()){
					$('#'+states[s].id+' .shape').css('fill','#6cb361');
				}
			}
		}

		for(let i = 0; i < enemy_states_arr.length; i++){
			for(let s = 0; s < states.length; s++){
				if(states[s].id == 'state_'+enemy_states_arr[i].state.toLowerCase()){
					$('#'+states[s].id+' .shape').css('fill','tomato');
				}
			}
		}
	} else if(type == 'notype'){
		for(var x = 0; x < states.length; x++){
			$('#'+states[x].id+' .shape').css('fill','#518ad1');
		}
	}
}

//changeColor('notype');

// let up = false,
// 	right = false,
// 	down = false,
// 	left = false,
// 	x = window.innerWidth/2-20,
// 	y = window.innerHeight/2-210;

// document.addEventListener('keydown',press);
// function press(e){
// 	if(chat == false){
// 		if (e.keyCode === 38 /* up */){
// 			down = true;
// 		}
// 		if (e.keyCode === 39 /* right */){
// 			left = true;
// 		}
// 		if (e.keyCode === 40 /* down */){
// 			up = true;
// 		}
// 		if (e.keyCode === 37 /* left */){
// 			right = true;
// 		}
// 	}
// }

// document.addEventListener('keyup',release);
// function release(e){
// 	if(chat == false){
// 		if (e.keyCode === 38 /* up */){
// 			down = false;
// 		}
// 		if (e.keyCode === 39 /* right */){
// 			left = false;
// 		}
// 		if (e.keyCode === 40 /* down */){
// 			up = false;
// 		}
// 		if (e.keyCode === 37 /* left */){
// 			right = false;
// 		}
// 	}
// }

// function gameLoop(){
// 	var div = document.getElementById('map');
// 	if (up){
// 		y = y - 20;
// 	}
// 	if (right){
// 		x = x + 20;
// 	}
// 	if (down){
// 		y = y + 20;
// 	}
// 	if (left){
// 		x = x - 20;
// 	}

// 	div.style.left = x+'px'
// 	div.style.top = y+'px'
// 	window.requestAnimationFrame(gameLoop);
// }
// window.requestAnimationFrame(gameLoop);

var antiCheatSystem_lastMoney = money;
var antiCheatSystem_lastPointers = pointers;
var antiCheatSystem_lastBalanceUpdate = 5;
function antiCheatSystem(){
	if(money > antiCheatSystem_lastMoney+58){
		socket.emit('anticheat', {
			command: 'CA001',
			user: player_params,
			key: game_key,
			type: 1,
			last_money: antiCheatSystem_lastMoney,
			money: money
		});
	}

	if(pointers > antiCheatSystem_lastPointers+50){
		socket.emit('anticheat', {
			command: 'CA001',
			user: player_params,
			key: game_key,
			type: 2,
			last_pointers: antiCheatSystem_lastPointers,
			pointers: pointers
		});
	}

	antiCheatSystem_lastMoney = money;
	antiCheatSystem_lastPointers = pointers;
}
// setInterval(antiCheatSystem, 3000);

function windows_open(w){
	if(w == 1){
		$('#tehs-window').css('display','block');
	}
}

function windows_close(w){
	if(w == 1){
		$('#tehs-window').css('display','none');
	}
}

function tehs_buy(item){
	if(item == 2){
		if(pointers < 1000) return;
		if(player_tehs[item-1].activated == true) return;

		pointers = pointers-1000;
		document.getElementById('gov_pointers').innerHTML = 'Очки: '+numberWithSpaces(pointers);
	
		player_tehs[item-1].activated = true;

		document.getElementById('teh-item-'+item).className = 'teh-item-active';
	}
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

let randomY = randomInteger(1,200);
	randomY1 = randomInteger(-450,-100);

document.getElementById('clouds').innerHTML = `
	<div class="cloud" style="top:`+randomY+`px;">
		<img src="assets/img/cloud_2.png">
	</div>
	<div class="cloud1" style="top:`+randomY1+`px;">
		<img src="assets/img/cloud_2.png">
	</div>`;

setInterval(function(){
	let randomY = randomInteger(1,200);
		randomY1 = randomInteger(-450,-100);

	document.getElementById('clouds').innerHTML = `
		<div class="cloud" style="top:`+randomY+`px;">
			<img src="assets/img/cloud_2.png">
		</div>
		<div class="cloud1" style="top:`+randomY1+`px;">
			<img src="assets/img/cloud_2.png">
		</div>`;
}, 120000);

function createserver(){
	document.getElementById('createserverbutton').innerHTML = '<b class="text-primary" style="font-size:26px;">Ожидание игрока</b>';

	socket.emit('data', {
		command: 'CD004'
	});
}

function to_createserver(){
	$('#game').css('display','none');
	$('#menu').css('display','none');
	$('#startgame').css('display','block');
	$('#serverlist').css('display','none');
}

function to_serverlist(){
	$('#game').css('display','none');
	$('#menu').css('display','none');
	$('#startgame').css('display','none');
	$('#serverlist').css('display','block');

	socket.emit('server-list', {
		command: 'CS002'
	});
}

function to_menu(){
	$('#game').css('display','none');
	$('#menu').css('display','block');
	$('#startgame').css('display','none');
	$('#serverlist').css('display','none');
}

function randomserver(){
	socket.emit('data', {
		command: 'CD005'
	});
}

function serverlist_connect(id){
	socket.emit('server-list', {
		command: 'CS001',
		id: id
	});
}

function serverlist_connect_closed(id){
	let password = prompt('Пожалуйста, введите пароль от закрытого сервера');

	socket.emit('server-list', {
		command: 'CS003',
		id: id,
		password: password
	});
}

socket.on('error', function(data){
	if(data.command == 'E001'){
		if(player_params.first_name+' '+player_params.last_name == data.user){
			alert(data.text);
		}
	}
});

socket.on('server-list', function(data){
	if(data.command == 'SC001' && data.games.length){
		var serverlist_div = document.getElementById('server-list');
		var html = '';
		var games = data.games;

		for(var i = 0; i < games.length; i++){
			if(games[i].closed == false){
				if(data.games[i].players == 1){
					html = html + '<div class="row bg-white p-1"><div class="col-md-01 px-1"><div class="circle-o border-success"></div></div><div class="col-md-1 px-2 text-success" style="font-size:12px;padding-top:2px;"><b>Открытый</b></div><div class="col-md-5 px-2 text-center">'+data.games[i].creator.first_name+' '+data.games[i].creator.last_name+'</div><div class="col-md-01 px-2"><img src="assets/img/classes/tank.png" width="16" height="16"></div><div class="col-md-3 text-success" style="font-size:12px;padding-top:2px;"><b>Лёгкая сложность</b></div><div class="col-md-1 text-center text-primary" style="font-size:12px;padding-top:2px;"><b>1/2</b></div><div class="col-md-1 text-right" style="font-size:12px;padding-top:2px;"><button class="btn btn-sm btn-outline-dark" style="font-size:8px;padding:3px 5px;" onclick="serverlist_connect('+i+');"><b>Подключиться</b></button></div></div>';
				} else {
					html = html + '<div class="row bg-white p-1"><div class="col-md-01 px-1"><div class="circle bg-success"></div></div><div class="col-md-1 px-2 text-success" style="font-size:12px;padding-top:2px;"><b>Открытый</b></div><div class="col-md-5 px-2 text-center">'+data.games[i].creator.first_name+' '+data.games[i].creator.last_name+'</div><div class="col-md-01 px-2"><img src="assets/img/classes/tank.png" width="16" height="16"></div><div class="col-md-3 text-success" style="font-size:12px;padding-top:2px;"><b>Лёгкая сложность</b></div><div class="col-md-1 text-center text-primary" style="font-size:12px;padding-top:2px;"><b>2/2</b></div><div class="col-md-1 text-right" style="font-size:12px;padding-top:2px;"></div></div>';
				}
			} else {
				if(data.games[i].players == 1){
					html = html + '<div class="row bg-white p-1"><div class="col-md-01 px-1"><div class="circle-o border-danger"></div></div><div class="col-md-1 px-2 text-danger" style="font-size:12px;padding-top:2px;"><b>Закрытый</b></div><div class="col-md-5 px-2 text-center">'+data.games[i].creator.first_name+' '+data.games[i].creator.last_name+'</div><div class="col-md-01 px-2"><img src="assets/img/classes/bomb.png" width="16" height="16"></div><div class="col-md-3 text-danger" style="font-size:12px;padding-top:2px;"><b>Невозможная сложность</b></div><div class="col-md-1 text-center text-primary" style="font-size:12px;padding-top:2px;"><b>1/2</b></div><div class="col-md-1 text-right" style="font-size:12px;padding-top:2px;"><button class="btn btn-sm btn-outline-dark" style="font-size:8px;padding:3px 5px;" onclick="serverlist_connect_closed('+i+');"><b>Подключиться</b></button></div></div>';
				} else {
					html = html + '<div class="row bg-white p-1"><div class="col-md-01 px-1"><div class="circle bg-danger"></div></div><div class="col-md-1 px-2 text-danger" style="font-size:12px;padding-top:2px;"><b>Закрытый</b></div><div class="col-md-5 px-2 text-center">'+data.games[i].creator.first_name+' '+data.games[i].creator.last_name+'</div><div class="col-md-01 px-2"><img src="assets/img/classes/bomb.png" width="16" height="16"></div><div class="col-md-3 text-danger" style="font-size:12px;padding-top:2px;"><b>Невозможная сложность</b></div><div class="col-md-1 text-center text-primary" style="font-size:12px;padding-top:2px;"><b>2/2</b></div><div class="col-md-1 text-right" style="font-size:12px;padding-top:2px;"></div></div>';
				}
			}
		}

		serverlist_div.innerHTML = html;
	}
});
