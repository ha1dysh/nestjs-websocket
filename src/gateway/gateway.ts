import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
@WebSocketGateway({
	cors: {},
})
export class MyGateway {
	@WebSocketServer()
	server: Server;

	@SubscribeMessage('newMessage')
	async onNewMessage(@MessageBody() { msg, author }) {
		const message = { id: uuidv4(), msg, author };

		this.server.emit('onMessage', message);
	}
}
