import express from 'express';

class App {
  public app: any;

  constructor () {
    this.app = express();
    this.setPublicDir();
  }

  private setPublicDir (): void {
    this.app.use(express.static(__dirname + '/../public'));
  }
}

export default new App().app;
