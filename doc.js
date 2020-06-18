export const swaggerDocument = {
    swagger: '2.0',
    info: {
        title: 'Grades Control',
        description: `Esta API serve para para controlar notas de alunos em matérias de um curso. Feito em NodeJS com Express e gravação de logs com Winston. \n\nFoi construida durante o curso Bootcamp Full Stack do IGTI (Instituto de Gestão e Tecnologia da Informação)`,
        version: '1.0.0',
    },
    host: 'localhost:3000',
    tags: [
        {
            name: 'grades',
            description: 'Operações sobre notas',
        },
    ],
    paths: {
        '/grades': {
            post: {
                tags: ['grades'],
                summary: 'Publicar nova nota',
                description: 'Publica uma nova nota para um aluno',
                operationId: 'postGrade',
                consumes: ['application/json'],
                parameters: [
                    {
                        in: 'body',
                        name: 'body',
                        description: 'Informar os dados da nota',
                        required: true,
                        schema: {
                            $ref: '#/definitions/NewGrade',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Operação bem-sucedida',
                        schema: {
                            $ref: '#/definitions/Success',
                        },
                    },
                    '400': {
                        description: 'Bad Request',
                        schema: {
                            $ref: '#/definitions/Error',
                        },
                    },
                },
            },
            put: {
                tags: ['grades'],
                summary: 'Atualizar nota',
                description: 'Atualiza uma nova nota de um aluno',
                operationId: 'updateGrade',
                consumes: ['application/json'],
                parameters: [
                    {
                        in: 'body',
                        name: 'body',
                        description: 'Informar os dados da nota, caso não informe algum dado da nota (exceto id), manterá os dados já existentes.',
                        required: true,
                        schema: {
                            $ref: '#/definitions/UpdateGrade',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Operação bem-sucedida',
                        schema: {
                            $ref: '#/definitions/Success',
                        },
                    },
                    '400': {
                        description: 'Bad Request',
                        schema: {
                            $ref: '#/definitions/Error',
                        },
                    },
                },
            },
        },
        '/grades/{id}': {
            get: {
                tags: ['grades'],
                summary: 'Buscar nota',
                description: 'Busca nota de um aluno a partir do ID',
                operationId: 'findGrade',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        description: 'Id do aluno a retornar',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Operação bem-sucedida',
                        schema: {
                            $ref: '#/definitions/Success',
                        },
                    },
                    '400': {
                        description: 'Bad Request',
                        schema: {
                            $ref: '#/definitions/Error',
                        },
                    },
                },
            },
            delete: {
                tags: ['grades'],
                summary: 'Apagar nota',
                description: 'Apaga nota de um aluno a partir do ID',
                operationId: 'deleteGrade',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        description: 'Id do aluno a apagar',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Operação bem-sucedida',
                        schema: {
                            type: 'object',
                            properties: {
                                success: {
                                    type: 'string',
                                    example: 'Id 1 excluido com sucesso!',
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Bad Request',
                        schema: {
                            $ref: '#/definitions/Error',
                        },
                    },
                },
            },
        },
        '/grades/sumGrades': {
            post: {
                tags: ['grades'],
                summary: 'Nota total de um aluno em uma disciplina',
                description: 'Retorna a soma das notas de um dado aluno numa dada disciplina',
                operationId: 'sumGrades',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'body',
                        name: 'request',
                        description: 'Informe o "student" e o "subject"',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                student: {
                                    type: 'string',
                                    example: 'Roberto Achar',
                                },
                                subject: {
                                    type: 'string',
                                    example: '03 - React',
                                },
                            },
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Operação bem-sucedida',
                        schema: {
                            $ref: '#/definitions/SuccessValue',
                        },
                    },
                    '400': {
                        description: 'Bad Request',
                        schema: {
                            $ref: '#/definitions/Error',
                        },
                    },
                },
            },
        },
        '/grades/averageGrades': {
            post: {
                tags: ['grades'],
                summary: 'Média aritmética de um tipo de tarefa em uma disciplina',
                description: 'Retorna a média aritmética das notas de um tipo de tarefa numa dada disciplina',
                operationId: 'averageGrades',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'body',
                        name: 'request',
                        description: 'Informe o "type" e o "subject"',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                type: {
                                    type: 'string',
                                    example: 'Fórum',
                                },
                                subject: {
                                    type: 'string',
                                    example: '03 - React',
                                },
                            },
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Operação bem-sucedida',
                        schema: {
                            $ref: '#/definitions/SuccessValue',
                        },
                    },
                    '400': {
                        description: 'Bad Request',
                        schema: {
                            $ref: '#/definitions/Error',
                        },
                    },
                },
            },
        },
        '/grades/topGrades': {
            post: {
                tags: ['grades'],
                summary: 'Top 3 alunos conforme tarefa e disciplina',
                description: 'Retorna os 3 melhores alunos com melhores notas em um tipo de tarefa numa dada disciplina',
                operationId: 'topGrades',
                produces: ['application/json'],
                parameters: [
                    {
                        in: 'body',
                        name: 'request',
                        description: 'Informe o "type" e o "subject"',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                type: {
                                    type: 'string',
                                    example: 'Trabalho Prático',
                                },
                                subject: {
                                    type: 'string',
                                    example: '03 - React',
                                },
                            },
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Operação bem-sucedida',
                        schema: {
                            $ref: '#/definitions/SuccessTops',
                        },
                    },
                    '400': {
                        description: 'Bad Request',
                        schema: {
                            $ref: '#/definitions/Error',
                        },
                    },
                },
            },
        },
    },
    definitions: {
        GradeId: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    example: 20,
                },
            },
        },
        NewGrade: {
            type: 'object',
            properties: {
                student: {
                    type: 'string',
                    example: 'Rafael Luis',
                },
                subject: {
                    type: 'string',
                    example: '02 - Node',
                },
                type: {
                    type: 'string',
                    example: 'Trabalho Prático',
                },
                value: {
                    type: 'integer',
                    example: 20,
                },
            },
        },
        UpdateGrade: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    example: 20,
                },
                student: {
                    type: 'string',
                    example: 'Rafael Luis',
                },
                subject: {
                    type: 'string',
                    example: '02 - Node',
                },
                type: {
                    type: 'string',
                    example: 'Trabalho Prático',
                },
                value: {
                    type: 'integer',
                    example: 20,
                },
            },
        },
        Success: {
            type: 'object',
            properties: {
                success: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 20,
                        },
                        student: {
                            type: 'string',
                            example: 'Rafael Luis',
                        },
                        subject: {
                            type: 'string',
                            example: '02 - Node',
                        },
                        type: {
                            type: 'string',
                            example: 'Trabalho Prático',
                        },
                        value: {
                            type: 'integer',
                            example: 20,
                        },
                        timestamp: {
                            type: 'Date',
                            example: '2020-06-17T05:25:03.942Z',
                        },
                    },
                },
            },
        },
        SuccessValue: {
            type: 'object',
            properties: {
                success: {
                    type: 'integer',
                    example: 26,
                },
            },
        },
        SuccessTops: {
            type: 'object',
            properties: {
                success: {
                    type: 'array',
                    items: {
                        type: 'object',
                    },
                    example: [
                        {
                            id: 31,
                            student: 'Roberto Achar',
                            subject: '03 - React',
                            type: 'Trabalho Prático',
                            value: 27,
                            timestamp: '2020-05-19T18:21:25.171Z',
                        },
                        {
                            id: 19,
                            student: 'Roberta Arcoverde',
                            subject: '03 - React',
                            type: 'Trabalho Prático',
                            value: 7,
                            timestamp: '2020-05-19T18:21:25.072Z',
                        },
                        {
                            id: 43,
                            student: 'Rodrigo Branas',
                            subject: '03 - React',
                            type: 'Trabalho Prático',
                            value: 6,
                            timestamp: '2020-05-19T18:21:25.253Z',
                        },
                    ],
                },
            },
        },
        Error: {
            type: 'object',
            properties: {
                error: {
                    type: 'string',
                    example: 'Id não encontrado!',
                },
            },
        },
    },
};
