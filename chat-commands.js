/**
 * This file defines console command logic.
 */
module.exports = function(io, session) {
var commands = {
	// Handles changing nick
	"nick": {
		numArgs: 1,
		handler: function(args, io, chatSession, user) {
			user.nick = args[0];
			session.users[user.uuid] = user;
			io.sockets.emit('nickname', user.nick);
		}
	},
	"clear": {
		numArgs: 0,
		handler: function(args, io, session, user) {
			session.log = "";
			user.socket.emit('clear');
		}
	},
	"help": {
		numArgs: 0,
		handler: function(args, io, session, user) {
			user.socket.emit('message', '/nick <nickname> - change your username\n /clear - clear your chat log.');
		}
	},

	// // FINISH
	// "join channel": {
	// 	numArgs: 1,
	// 	handler: function(args, io, session, user) {
	// 		if(args[1] in session.channels)
	// 	  {
	// 		    user.currentChannel = numArgs[0];
	// 				user.socket.emit('clear');
	//
	// 				//user.socket.emit('loadMessages');
	// 	  }
	// 		else {
	// 			//
	// 			//user.socket.emit('invalidMessage');
	// 		}
	//
	// 	}
	// },
	// // FINISH

	"join": {
		numArgs: 2,
		handler: function(args, io, chatSession, user)
		{
			console.log(args);
		}
	},
}


var isCommand = function(msg) {
	return (msg.substring(0, 1) == "/");
}

/**
 * Runs a given command.
 * Parses a command into a name and a series of arg tokens.
 * @param  {Object}
 * @param  {String}
 */
var run = function(user, msg) {
	var cmd = msg.substring(1, msg.length);
	var args = cmd.match(/[A-z][a-z]*/g);
	var fun = args.shift();

	// Try catch in order to handle unknown/erroneous commands
  try{
		commands[fun].handler(args, io, session, user);
  }
	catch (err)
	{
		user.socket.emit('commandError');
	}

}

	return {
		run: run,
		isCommand: isCommand
	}
}
