let socket = io.connect('localhost:8080',{'forceNew':false});
let money, pointers, player1, player2, this_player, game_key, player;
let my_states_arr = [], enemy_states_arr = [];
let move = false;
let selected_state_movefrom;

socket.on('connect', function(socket){
});

socket.on('data', function(data){
	if(data.command == 'SC001'){
		money = data.money-2;
		pointers = data.pointers-2;
		this_player = data.user_socket;

		clicker(1);
		clicker(2);
	}
});

socket.on('game', function(data){
	if(data.command == 'SG001'){
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
				army: 500
			},{
				state: 'AM',
				army: 500
			},{
				state: 'RR',
				army: 500
			},{
				state: 'RO',
				army: 500
			},{
				state: 'MT',
				army: 500
			},{
				state: 'PA',
				army: 500
			},{
				state: 'AP',
				army: 500
			},{
				state: 'TO',
				army: 500
			},{
				state: 'MA',
				army: 500
			}];

			enemy_states_arr = [{
				state: 'MS',
				army: 500
			},{
				state: 'GO',
				army: 500
			},{
				state: 'BA',
				army: 500
			},{
				state: 'PI',
				army: 500
			},{
				state: 'MG',
				army: 500
			},{
				state: 'SP',
				army: 500
			},{
				state: 'PR',
				army: 500
			},{
				state: 'SC',
				army: 500
			},{
				state: 'RS',
				army: 500
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
				army: 500
			},{
				state: 'AM',
				army: 500
			},{
				state: 'RR',
				army: 500
			},{
				state: 'RO',
				army: 500
			},{
				state: 'MT',
				army: 500
			},{
				state: 'PA',
				army: 500
			},{
				state: 'AP',
				army: 500
			},{
				state: 'TO',
				army: 500
			},{
				state: 'MA',
				army: 500
			}];

			my_states_arr = [{
				state: 'MS',
				army: 500
			},{
				state: 'GO',
				army: 500
			},{
				state: 'BA',
				army: 500
			},{
				state: 'PI',
				army: 500
			},{
				state: 'MG',
				army: 500
			},{
				state: 'SP',
				army: 500
			},{
				state: 'PR',
				army: 500
			},{
				state: 'SC',
				army: 500
			},{
				state: 'RS',
				army: 500
			}];
		}
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
			// let states = document.getElementsByTagName('a');

			// if(this_player == player1){
			// 	states[data.state].setAttribute("class","state_player2");
			// 	states[data.state].style.opacity = '0.3';
			// } else {
			// 	states[data.state].setAttribute("class","state_player1");
			// 	states[data.state].style.opacity = '0.3';
			// }

			// for(let i = 0; i <states.length; i++){
			// 	states[i].style.opacity = '0.3';
			// }

			// let my_states = document.getElementsByClassName('state_player'+player);
			// for(let i = 0; i < my_states.length; i++){
			// 	my_states[i].style.opacity = '1';
			// }

			// move = false;
			// selected_state = null;
			// selected_state_move = null;
			// selected_state_movefrom = null;

			updateStates();
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

			for(let i = 0; i < my_states_arr.length; i++){
				if(my_states_arr[i].state == state.toUpperCase()){
					$('.bottom_menu').css('display','block');
					$('.getArmy').css('display','none');
					$('.deleteArmy').css('display','none');
				}
			}
		} else if(!selected_state_move) {
			let states = document.getElementsByTagName('a');
			let thisstate = document.getElementById('state_'+state);	

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
		document.getElementById('gov_money').innerHTML = 'Казна: '+money+' <i onclick="clicker(1);" class="far fa-fw fa-plus-square" style="font-size: 14px;margin-left:1em;"></i>';
	} else if(item == 2) {
		pointers = pointers + 2;
		document.getElementById('gov_pointers').innerHTML = 'Очки: '+pointers+' <i onclick="clicker(2);" class="far fa-fw fa-plus-square" style="font-size: 14px;margin-left:1em;"></i>';
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
	document.getElementsByClassName('getArmy_range')[0].max = ""+money;
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

	document.getElementsByClassName('state_name')[0].innerHTML = 'Территорий: '+my_states_arr.length;
}

function newArmy(){
	if(!selected_state) return;

	if(pointers < 20) return;

	for(let i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state){
			let value = document.getElementsByClassName('getArmy_range')[0].value;

			money = money - value*1;
			pointers = pointers - 20;
			document.getElementById('gov_money').innerHTML = 'Казна: '+money+' <i onclick="clicker(1);" class="far fa-fw fa-plus-square" style="font-size: 14px;margin-left:1em;"></i>';
			document.getElementById('gov_pointers').innerHTML = 'Очки: '+pointers+' <i onclick="clicker(2);" class="far fa-fw fa-plus-square" style="font-size: 14px;margin-left:1em;"></i>';
			my_states_arr[i].army = my_states_arr[i].army*1 + value*1;

			socket.emit('game',{
				command: "GS001",
				key: game_key,
				newstates: my_states_arr,
				enemynewstates: enemy_states_arr,
				byplayer: this_player
			});

			show_getArmy();
		}
	}
}

function deleteArmy(){
	if(!selected_state) return;

	for(let i = 0; i < my_states_arr.length; i++){
		if(my_states_arr[i].state == selected_state){
			let value = document.getElementsByClassName('deleteArmy_range')[0].value;

			money = money + value*1;
			document.getElementById('gov_money').innerHTML = 'Казна: '+money+' <i onclick="clicker(1);" class="far fa-fw fa-plus-square" style="font-size: 14px;margin-left:1em;"></i>';
			document.getElementById('gov_pointers').innerHTML = 'Очки: '+pointers+' <i onclick="clicker(2);" class="far fa-fw fa-plus-square" style="font-size: 14px;margin-left:1em;"></i>';
			my_states_arr[i].army = my_states_arr[i].army*1 - value*1;

			socket.emit('game',{
				command: "GS001",
				key: game_key,
				newstates: my_states_arr,
				byplayer: this_player
			});

			show_deleteArmy();
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
				document.getElementById('gov_pointers').innerHTML = 'Очки: '+pointers+' <i onclick="clicker(2);" class="far fa-fw fa-plus-square" style="font-size: 14px;margin-left:1em;"></i>';

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
				document.getElementById('gov_pointers').innerHTML = 'Очки: '+pointers+' <i onclick="clicker(2);" class="far fa-fw fa-plus-square" style="font-size: 14px;margin-left:1em;"></i>';

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
}

function move_cancel(){
	$('.bottom_menu').css('display','none');
	$('.getArmy').css('display','none');
	$('.deleteArmy').css('display','none');
	$('.move').css('display','none');

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