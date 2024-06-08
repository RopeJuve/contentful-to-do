import { createClient } from 'contentful-management';


const client = createClient({
    accessToken: import.meta.env.VITE_CMS_ACCESS_TOKEN
})

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
