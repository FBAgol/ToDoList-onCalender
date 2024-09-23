interface StatusTask{
    text:string,
    completed:boolean
}
export interface TodoBody {
    done: string[],
    notDone: string[]
}

export interface TaskRequestBody {
    token: string | undefined
    todo: TodoBody
  }