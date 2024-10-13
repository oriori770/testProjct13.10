import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
const PORT = process.env.PORT || 7700;



const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
      components: {
        schemas: 
        {
            User: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                    },
                    username: {
                        type: 'string',
                    },
                    password: {
                        type: 'string',
                    },
                    role: {
                        type: 'string',
                        enum: ['employee', 'manager'],
                        description: 'התפקיד של המשתמש',
                        default: 'employee'
                    }
                },
                required: ['username', 'password'], // תוסיף את השדות הנדרשים כאן
                additionalProperties: false // אם אתה רוצה למנוע שדות נוספים
                }
            }
    },
      servers:[{
        url: `http://localhost:${PORT}`,
        }
      ]
    },
    apis: ['./src/routing/*.ts'], // files containing annotations as above
  };
  
const openapiSpecification = swaggerJsDoc(options);

export default (app:any) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};
