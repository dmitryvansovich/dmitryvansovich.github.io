let socket = io.connect('https://ancientwarserver.herokuapp.com/',{'forceNew':false});
//let socket = io.connect();
let money, pointers, player1, player2, this_player, game_key, player, player_country;
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
	VK.init(function(){
		VK.api('users.get', {fields: "photo_50"}, function(data){
			player_params.first_name = data.response[0].first_name;
			player_params.last_name = data.response[0].last_name;

			socket.emit('data', {
				command: 'CD003',
				player_params: player_params 
			});
		});
	},'5.80');

	// socket.emit('data', {
	// 	command: 'CD003',
	// 	player_params: player_params 
	// });
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
	}
});

socket.on('game', function(data){
	if(data.command == 'SG001' && !game_key){
		if(data.player1 != this_player && data.player2 != this_player) return;

		game_key = data.key;
		if(data.player1 == this_player){
			player = 1;

			let my_states = document.getElementsByClassName('state_player2');
			for(let i = 0; i < my_states.length; i++){
				my_states[i].style.opacity = '0.3';
			}

			my_states_arr = [{
				state: 'AC',
				army: 0
			},{
				state: 'AM',
				army: 0
			},{
				state: 'RR',
				army: 0
			},{
				state: 'RO',
				army: 0
			},{
				state: 'MT',
				army: 0
			},{
				state: 'PA',
				army: 0
			},{
				state: 'AP',
				army: 0
			},{
				state: 'TO',
				army: 0
			},{
				state: 'MA',
				army: 0
			}];

			enemy_states_arr = [{
				state: 'MS',
				army: 0
			},{
				state: 'GO',
				army: 0
			},{
				state: 'BA',
				army: 0
			},{
				state: 'PI',
				army: 0
			},{
				state: 'MG',
				army: 0
			},{
				state: 'SP',
				army: 0
			},{
				state: 'PR',
				army: 0
			},{
				state: 'SC',
				army: 0
			},{
				state: 'RS',
				army: 0
			}];
		}

		if(data.player2 == this_player){
			player = 2;

			let my_states = document.getElementsByClassName('state_player1');
			for(let i = 0; i < my_states.length; i++){
				my_states[i].style.opacity = '0.3';
			}

			enemy_states_arr = [{
				state: 'AC',
				army: 0
			},{
				state: 'AM',
				army: 0
			},{
				state: 'RR',
				army: 0
			},{
				state: 'RO',
				army: 0
			},{
				state: 'MT',
				army: 0
			},{
				state: 'PA',
				army: 0
			},{
				state: 'AP',
				army: 0
			},{
				state: 'TO',
				army: 0
			},{
				state: 'MA',
				army: 0
			}];

			my_states_arr = [{
				state: 'MS',
				army: 0
			},{
				state: 'GO',
				army: 0
			},{
				state: 'BA',
				army: 0
			},{
				state: 'PI',
				army: 0
			},{
				state: 'MG',
				army: 0
			},{
				state: 'SP',
				army: 0
			},{
				state: 'PR',
				army: 0
			},{
				state: 'SC',
				army: 0
			},{
				state: 'RS',
				army: 0
			}];
		}

		if(player == 2){
			$('#player_country').text('Германия');
			player_country = 'Германия';
			$('#player_country_flag').attr('src','assets/img/germany.png');
		} else if(player == 1){
			$('#player_country').text('Америка');
			player_country = 'Америка';
			$('#player_country_flag').attr('src','assets/img/united-states.png');
		}

		updateStates();
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

				console.log(enemy_states_arr);
				console.log(my_states_arr);
			} else {
				my_states_arr = data.newstates;
				enemy_states_arr = data.enemynewstates;
				updateStates();

				console.log(enemy_states_arr);
				console.log(my_states_arr);
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
				message = '<div class="message"><label style="color:tomato;">[Германия]</label> <b><ins>'+data.player_name+'</ins></b>: '+data.message+'</div>';
			} else if(data.player == 1){
				message = '<div class="message"><label style="color:#6cb361;">[Америка]</label> <b><ins>'+data.player_name+'</ins></b>: '+data.message+'</div>';
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
	if(selected_state != state.toUpperCase()){
		if(move == false){
			let states = document.getElementsByTagName('a');
			for(let i = 0; i < states.length; i++){
				states[i].style.opacity = '0.3';
			}

			selected_state = state.toUpperCase();

			document.getElementById('state_'+state).style.opacity = '1';
			document.getElementById('state_'+state).style.fill = '#2d68b2';

			$('.bottom_menu').css('display','none');
			$('.getArmy').css('display','none');
			$('.deleteArmy').css('display','none');

			$('.right-panel').css('display','block');
			$('.right-panel .buttons').css('display','none');

			$('#state_terr').text(state.toUpperCase());
			if(player_country == 'Америка'){
				$('#terr_player_country').text('Германия');
				$('#terr_player_country_flag').attr('src','assets/img/germany.png');

				let terrs_text = null;
				if(enemy_states_arr.length == 1) terrs_text = 'территория'
				if(enemy_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория'
				if(enemy_states_arr.length >= 5) terrs_text = 'территорий' 
				document.getElementById('terr_state_name').innerHTML = enemy_states_arr.length+' '+terrs_text;	
			} else {
				$('#terr_player_country').text('Америка');
				$('#terr_player_country_flag').attr('src','assets/img/united-states.png');

				let terrs_text = null;
				if(enemy_states_arr.length == 1) terrs_text = 'территория'
				if(enemy_states_arr.length >= 2 && enemy_states_arr <= 4) terrs_text = 'территория'
				if(enemy_states_arr.length >= 5) terrs_text = 'территорий' 
				document.getElementById('terr_state_name').innerHTML = enemy_states_arr.length+' '+terrs_text;
			}

			if(player_country == 'Германия'){
				$('#terr_owner').text('Территория Америки');
			} else {
				$('#terr_owner').text('Территория Германии');
			}

			for(let i = 0; i < my_states_arr.length; i++){
				if(my_states_arr[i].state == state.toUpperCase()){
					$('#state_army').text(numberWithSpaces(my_states_arr[i].army));
					$('#state_popular').text(numberWithSpaces(my_states_arr[i].army*70));
				}
			}

			for(let i = 0; i < enemy_states_arr.length; i++){
				if(enemy_states_arr[i].state == state.toUpperCase()){
					$('#state_army').text(numberWithSpaces(enemy_states_arr[i].army));
					$('#state_popular').text(numberWithSpaces(my_states_arr[i].army*70));
				}
			}

			$('#state_money').text('?');
			$('#state_pointers').text('?');

			for(let i = 0; i < my_states_arr.length; i++){
				if(my_states_arr[i].state == state.toUpperCase()){
					$('.right-panel .buttons').css('display','flex');

					$('#state_money').text(money);
					$('#state_pointers').text(pointers);

					if(player_country == 'Германия'){
						$('#terr_owner').text('Территория Германии');
					} else {
						$('#terr_owner').text('Территория Америки');
					}

					if(player_country == 'Америка'){
						$('#terr_player_country').text('Америка');
						$('#terr_player_country_flag').attr('src','assets/img/united-states.png');

						let terrs_text = null;
						if(my_states_arr.length == 1) terrs_text = 'территория'
						if(my_states_arr.length >= 2 && my_states_arr <= 4) terrs_text = 'территория'
						if(my_states_arr.length >= 5) terrs_text = 'территорий' 
						document.getElementById('terr_state_name').innerHTML = my_states_arr.length+' '+terrs_text;
					} else {
						$('#terr_player_country').text('Германия');
						$('#terr_player_country_flag').attr('src','assets/img/germany.png');

						let terrs_text = null;
						if(my_states_arr.length == 1) terrs_text = 'территория'
						if(my_states_arr.length >= 2 && my_states_arr <= 4) terrs_text = 'территория'
						if(my_states_arr.length >= 5) terrs_text = 'территорий' 
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

function updateStates(){
	let states = document.getElementsByTagName('a');
	let enemyplayer;

	if(player == 1) { enemyplayer = 2; } else { enemyplayer = 1; }

	for(let i = 0; i < my_states_arr.length; i++){
		for(let s = 0; s < states.length; s++){
			if(states[s].id == 'state_'+my_states_arr[i].state.toLowerCase()){
				states[s].setAttribute("class",'state_player'+player);
				states[s].style.opacity = '1';
			}
		}
		document.getElementById('label_icon_state_'+my_states_arr[i].state.toLowerCase()).textContent = ''+my_states_arr[i].army;
	}

	for(let i = 0; i < enemy_states_arr.length; i++){
		for(let s = 0; s < states.length; s++){
			if(states[s].id == 'state_'+enemy_states_arr[i].state.toLowerCase()){
				states[s].setAttribute("class",'state_player'+enemyplayer);
				states[s].style.opacity = '0.3';
			}
		}
		document.getElementById('label_icon_state_'+enemy_states_arr[i].state.toLowerCase()).textContent = ''+enemy_states_arr[i].army;
	}

	let terrs_text = null;
	if(my_states_arr.length == 1) terrs_text = 'территория'
	if(my_states_arr.length >= 2 && my_states_arr <= 4) terrs_text = 'территория'
	if(my_states_arr.length >= 5) terrs_text = 'территорий' 
	document.getElementsByClassName('state_name')[0].innerHTML = my_states_arr.length+' '+terrs_text;
}

function newArmy(){
	if(!selected_state) return;

	if(pointers < 20) return;

	for(let i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state){
			let value = document.getElementsByClassName('getArmy_range')[0].value;

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

	let states = document.getElementsByTagName('a');

	for(let i = 0; i <states.length; i++){
		states[i].style.opacity = '0.3';
	}

	let my_states = document.getElementsByClassName('state_player'+player);
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

	if(message_text){
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
        var res = /[^а-яА-Я!?: 1-9,.ёЁ<>=+-;()0]/g.exec(that.value);
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
// 		if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */){
// 			down = true;
// 		}
// 		if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
// 			left = true;
// 		}
// 		if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
// 			up = true;
// 		}
// 		if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
// 			right = true;
// 		}
// 	}
// }

// document.addEventListener('keyup',release);
// function release(e){
// 	if(chat == false){
// 		if (e.keyCode === 38 /* up */ || e.keyCode === 87 /* w */ || e.keyCode === 90 /* z */){
// 			down = false;
// 		}
// 		if (e.keyCode === 39 /* right */ || e.keyCode === 68 /* d */){
// 			left = false;
// 		}
// 		if (e.keyCode === 40 /* down */ || e.keyCode === 83 /* s */){
// 			up = false;
// 		}
// 		if (e.keyCode === 37 /* left */ || e.keyCode === 65 /* a */ || e.keyCode === 81 /* q */){
// 			right = false;
// 		}
// 	}
// }

var antiCheatSystem_lastMoney = money;
var antiCheatSystem_lastPointers = pointers;
var antiCheatSystem_lastBalanceUpdate = 5;
function antiCheatSystem(){
	if(money > antiCheatSystem_lastMoney+418){
		socket.emit('anticheat', {
			command: 'CA001',
			user: player_params,
			key: game_key,
			type: 1,
			last_money: antiCheatSystem_lastMoney,
			money: money
		});
	}

	if(pointers > antiCheatSystem_lastPointers+85){
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
setInterval(antiCheatSystem, 3000);

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
