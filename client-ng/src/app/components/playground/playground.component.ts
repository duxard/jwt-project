import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


/////////////////////////////////////////////////////////
type UserName = string;
interface FuncArgs {
  length: number;
}

function fun<T>(args: T): T {
  return args;
}

const result1 = fun<UserName>('Hello World');
const result2 = fun<number>(200);

console.log(result1);
console.log(result2);
/////////////////////////////////////////////////////////

type Config = {
  env: string;
  serverHost: number;
};

type AdditionalConfig = Config & {
  url: boolean;
};

/////////////////////////////////////////////////////////
type P = keyof AdditionalConfig;

const obj: AdditionalConfig = {
  env: '',
  serverHost: 1,
  url: true
};

const obj1: P = 'env';
const obj2: P = 'serverHost';
const obj3: P = 'url';

/////////////////////////////////////////////////////////
function delay(milliseconds: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

async function dramaticWelcome<T>(): Promise<void> {
  console.log('Hello');
  for (let i = 0; i < 3; i++) {
    await delay(500);
    console.log('.');
  }
  console.log('World!');
}

dramaticWelcome<unknown>();
