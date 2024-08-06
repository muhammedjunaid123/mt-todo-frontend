import { ITodo } from "./todo.interface";
export interface IProject {
    _id: string;
    userId:string;
    Title: String;
    ListTodos: ITodo[] | string[];
    createdDate: Date;

}