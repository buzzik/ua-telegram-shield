import readline from 'readline';
import util from 'util';

class ApiService {
  apiId: number;

  apiHash: string;

  reporterPauseDelay: number;

  reporterPeerDelay: number;

  configFileData: any;

  #apiInput: any;

  constructor(configFile: any) {
    this.apiId = configFile.apiId;
    this.apiHash = configFile.apiHash;
    this.reporterPauseDelay = configFile.reporterPauseDelay;
    this.reporterPeerDelay = configFile.reporterPeerDelay;
    this.#apiInput = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
  }

  async init() {
    const question: any = util.promisify(this.#apiInput.question).bind(this.#apiInput);

    if (!this.apiId) this.apiId = await question('Enter Api ID (numerical): ', (answer:any) => answer);
    console.log(this.apiId);
    if (!this.apiHash) this.apiHash = await question('Enter pause delay in seconds (default 10800000 if no answer): ', (answer:any) => answer);
    console.log(this.apiHash);
    this.reporterPauseDelay = await question('Enter pause delay in seconds (default 10800000 if no answer): ', (answer:number) => +answer);
    this.reporterPeerDelay = await question('Enter peer delay in seconds (default 3000 if no answer): ', (answer:number) => +answer);
    return {
      apiId: this.apiId,
      apiHash: this.apiHash,
      reporterPauseDelay: this.reporterPauseDelay,
      reporterPeerDelay: this.reporterPeerDelay,
    };
  }
}

export default ApiService;
