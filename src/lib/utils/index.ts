export const randomize = (max:number) :number => Math.floor(Math.random() * max);
export const splitByLines = (text:string) :Array<string> => text.split(/\r?\n/);
