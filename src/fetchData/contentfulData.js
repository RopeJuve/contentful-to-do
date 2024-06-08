import { createClient } from 'contentful';


const client = createClient({
    space: import.meta.env.VITE_SPACE_ID,
    environment: 'master',
    accessToken: import.meta.env.VITE_ACCESS_TOKEN
})


const fetchTasksByIds = async (taskIds) => {
    const entries = await client.getEntries({
        'sys.id[in]': taskIds.join(','),
        content_type: 'tasks'
    });


    const tasksMap = {};
    entries.items.forEach(task => {
        tasksMap[task.sys.id] = task.fields;
    });
    return tasksMap;
};


export const fetchBoardWithTasks = async () => {
    try {
        const boardResponse = await client.getEntries({
            content_type: 'toDoBoard'
        });

        if (boardResponse.items.length === 0) {
            console.log('No to-do boards found.');
            return;
        }
        const boards = boardResponse.items
        console.log(boards)
        const taskIds = [];
        boards.forEach(board => {
            if (board.fields.columns) {
                board.fields.columns.forEach(column => {
                    if (column.fields.tasks) {
                        column.fields.tasks.forEach(task => {
                            taskIds.push(task.sys.id);
                        });
                    }
                });
            }

        })
        const tasksMap = await fetchTasksByIds(taskIds);

        boards.forEach(board => {
            if (board.fields.columns) {
                board.fields.columns.forEach(column => {
                    if (column.fields.tasks) {
                        column.fields.tasks = column.fields.tasks.map(task => tasksMap[task.sys.id]);
                    }
                });
            }
        });
        console.log(boards)
        return boards;
    } catch (error) {
        console.error('Error fetching board or tasks:', error);
    }
};
