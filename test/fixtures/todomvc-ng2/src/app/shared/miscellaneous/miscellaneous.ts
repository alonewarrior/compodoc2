/**
 * PI constant
 * See {@link Todo} for service using it
 */


export const PI: number = 3.14;

export let PIT = 4;

/**
 * A foo bar function. Test link for other class {@link ListComponent}
 *
 * @param {string} status A status
 */
export function foo(status: string): string {
    console.log('bar');
    return 'yo';
}

export class StringIndexedItems<T> {
    [index: string]: T;
}

export interface TOTsdosds<T> {
    [yala: string]: T;
}

/**
 * Directions of the app
 */
export enum Direction {
    Up,
    Down,
    Left,
    Right
}

/*
export type Something = number | string;

export type Flags = {
    option1: boolean;
    option2: boolean;
}

export let yo:{ [index:string] : {message: string} } = {};
*/

export type ChartChange = 'creating' | 'created' | 'updating' | 'updated';

export type TableColumnTarget = number | string | (number | string)[];

export type TableSyncRenderer = Type<TableCellRendererBase> | TemplateRef<any>;

import { IInterface3, IInterface4, MyClass3, MyClass4 } from '../interfaces/other-type.interface';
import { Todo } from '../models/todo.model';

export type LinearDomain = [Number, Number];

export type LinearTodo = [Todo, Todo];

export type TypeOrTypeArray = string | symbol | Array<string | symbol>;

export type RouterAdapterOptions = Pick<NavigationExtras, 'replaceUrl'>;

export interface IInterface1 {
    myType: 'myType1'
}

export interface IInterface2 {
    myType: 'myType2'
}

export class MyClass1 {
    myType: 'myType5'
}

export class MyClass2 {
    myType: 'myType6'
}

export type MyOtherType = IInterface1;

export type MyOtherType2 = IInterface3;

export type MyNewType = IInterface1 | IInterface2;

export type MyNewType2 = IInterface3 | IInterface4;

export type MyNewType3 = MyClass1 | MyClass2;

export type MyNewType4 = MyClass3 | MyClass4;

export type MyNewType5 = [MyClass1, MyClass2];

export type MyNewType6 = [MyClass3, MyClass4];

export type MyNewType7 = [IInterface1, IInterface2];

export type MyNewType8 = [IInterface3, IInterface4];

export type MyNewType9 = [MyClass1, MyClass2];

export type MyNewType10 = [MyClass3, MyClass4];

export type MyNewType11 = [MyClass1, MyClass1];

export type MyNewType12 = [MyClass3, MyClass3];

export type MyNewType13 = [IInterface1, IInterface1];

export type MyNewType14 = [IInterface3, IInterface3];


