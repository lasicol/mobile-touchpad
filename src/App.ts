import { createServer, Server } from 'http';
import express from 'express';
import socketIo from 'socket.io';
import { InputController } from 'addon-input-ctrl';

export class App {
  public static readonly PORT:number = 3000;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private inputCtrl: InputController;

  constructor() {
    this.inputCtrl = new InputController();
    this.port = process.env.PORT || App.PORT;
    this.setupAapp();
  }

  private setupAapp(): void {
    this.createApp();
    this.setPublicDir();
    this.createServer();
    this.initSockets();
    this.registerSocketEvents();
    this.startApp();
  }

  private createApp(): void {
      this.app = express();
  }

  private setPublicDir (): void {
    this.app.use(express.static(__dirname + '/../public'));
  }

  private createServer(): void {
      this.server = createServer(this.app);
  }

  private initSockets(): void {
      this.io = socketIo(this.server);
  }

  private registerSocketEvents(): void {
    this.io.on('connection', (socket) =>{
      console.log('a user connected');
    
      socket.on('move', ({x, y}) => {
        this.inputCtrl.moveCursor(x, y);
      });
      socket.on('btn', ({buttonNum, press}) =>{
        this.inputCtrl.mouseButton(buttonNum, press);
      });
    });
  }

  private startApp(): void {
      this.server.listen(this.port, () => {
          console.log('Running server on port %s', this.port);
      });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
