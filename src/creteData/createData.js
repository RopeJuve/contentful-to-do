import { createClient } from 'contentful-management';


const client = createClient({
    accessToken: import.meta.env.VITE_CMS_ACCESS_TOKEN
})

export const addTaskToColumn = async (boardId, columnId, taskData) => {
    try {
        const space = await client.getSpace(import.meta.env.VITE_SPACE_ID);
        const environment = await space.getEnvironment('master');
        const uuid = Math.floor(Math.random() * 1000000);
        // Step 1: Fetch the Board
        const board = await environment.getEntry(boardId);
        console.log('Fetched board:', board);

        // Step 2: Fetch the Specific Column
        const column = await environment.getEntry(columnId);
        console.log('Fetched column:', column);

        // Step 3: Create a New Task
        const newTask = await environment.createEntry('tasks', {
            fields: {
                id: { 'en-US': uuid },
                title: {
                    'en-US': taskData.title
                },
                taskDescription: {
                    'en-US': taskData.taskDescription
                },
                ioCompleted: {
                    'en-US': taskData.isCompleted
                }
            }
        });
        const publishedTask = await newTask.publish();
        console.log('Created and published new task:', publishedTask);
        if (!column.fields.tasks) {
            column.fields.tasks = { 'en-US': [] };
        }

        // Step 4: Update the Column with the New Task
        column.fields.tasks['en-US'].push({
            sys: {
                type: 'Link',
                linkType: 'Entry',
                id: publishedTask.sys.id
            }
        });
        const updatedColumn = await column.update();
        await updatedColumn.publish();
        console.log('Updated and published column:', updatedColumn);

        // Step 5: Update the Board (if necessary)
        // If the board entry needs to reflect any changes directly, update it here
        const updatedBoard = await board.update();
        await updatedBoard.publish();
        console.log('Updated and published board:', updatedBoard);

    } catch (error) {
        console.error('Error updating board with new task:', error.message);
        console.error(error);
    }
};

export const createBoard = async (formData) => {
    try {
        const space = await client.getSpace(import.meta.env.VITE_SPACE_ID);
        const environment = await space.getEnvironment('master');
        const uuid = Math.floor(Math.random() * 1000000);


        const columnsPromises = formData.columns.map(async column => {
            try {
                const createdColumn = await environment.createEntry('columns', {
                    fields: {
                        title: {
                            'en-US': column.title
                        },
                        tasks: {
                            'en-US': []
                        }
                    }
                });
                console.log('Created column:', createdColumn);
                const publishedColumn = await createdColumn.publish();
                console.log('Published column:', publishedColumn);
                return publishedColumn;
            } catch (columnError) {
                console.error('Error creating or publishing column:', columnError.message);
                throw columnError;
            }
        });

        const publishedColumns = await Promise.all(columnsPromises);
        console.log('All published columns:', publishedColumns);


        const columnReferences = publishedColumns.map(column => ({
            sys: {
                type: 'Link',
                linkType: 'Entry',
                id: column.sys.id
            }
        }));


        try {
            const board = await environment.createEntry('toDoBoard', {
                fields: {
                    id: {
                        'en-US': uuid
                    },
                    title: {
                        'en-US': formData.title
                    },
                    columns: {
                        'en-US': columnReferences
                    }
                }
            });
            console.log('Created board:', board);


            const publishedBoard = await board.publish();
            console.log('Published board:', publishedBoard);
        } catch (boardError) {
            console.error('Error creating or publishing board:', boardError.message);
            throw boardError;
        }
    } catch (error) {
        console.error('Error creating board:', error.message);
        console.error(error);
    }
};
