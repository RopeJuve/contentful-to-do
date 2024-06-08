export const cleanUpBoardData = (data) => {
    const boards = data?.map(board => {
        const boardId = board.sys.id;
        const boardTitle = board.fields.title;
        if (!board.fields.columns) {
            return { id: boardId, title: boardTitle, columns: [] };
        } else {
            const columns = board.fields.columns.map(column => {
                const columnId = column.sys.id;
                const columnTitle = column.fields.title;
                if (!column.fields.tasks) {
                    return { id: columnId, title: columnTitle, tasks: [] };
                }
                const tasks = column.fields.tasks.map(task => {
                    const taskId = task.id;
                    const taskTitle = task.title;
                    const taskDescription = task.taskDescription;
                    const isCompleted = task.ioCompleted;
                    return { id: taskId, title: taskTitle, taskDescription, isCompleted };
                });
                return { id: columnId, title: columnTitle, tasks: tasks };
            });
            return { id: boardId, title: boardTitle, columns: columns };
        }
    })
    console.log(boards)
    return boards
}