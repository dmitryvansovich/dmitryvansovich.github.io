// let socket = io.connect('https://arialtest.herokuapp.com/',{'forceNew':false});

// socket.on('connect', function(socket){
// 	console.log('Socket is connected!');
// });

// socket.on('data', function(data){
// 	console.log(data);
// });

// function auth(login_input, password_input, who_input) {
// 	let login = $('#'+login_input).val();
// 	let password = $('#'+password_input).val();
// 	let who = $('#'+who_input).val(); // Как администратор или как менеджер

// 	socket.emit('data', {
// 		data: {
// 			login: login,
// 			password: password
// 		},
// 		command: 'MS0001'
// 	});
// }