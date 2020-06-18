import express from 'express';
import { promises } from 'fs';
import { isNumber } from 'util';

const router = express.Router();
const readFile = promises.readFile;
const writeFile = promises.writeFile;

router
    .route('/')
    .post(async (req, res) => {
        try {
            let json = JSON.parse(await readFile(global.fileName));
            const { student, subject, type, value } = req.body;

            let newGrade = { id: json.nextId, student, subject, type, value, timestamp: new Date() };
            json.grades.push(newGrade);
            json.nextId++;
            await writeFile(global.fileName, JSON.stringify(json), 'utf8');
            logger.info(`POST /grades - ${JSON.stringify(newGrade)}`);
            res.send({ success: newGrade });
        } catch (err) {
            logger.error(`POST /grades - ${err.message}
            Request Body: ${JSON.stringify(req.body)}`);
            res.status(400).send({ error: err.message });
        }
    })
    .put(async (req, res) => {
        try {
            let id = req.body.id;
            let json = JSON.parse(await readFile(global.fileName));

            let indexFound = json.grades.findIndex((grade) => {
                return grade.id === parseInt(id);
            });
            if (indexFound < 0) throw new Error('Id não encontrado!');

            let { student, subject, type, value } = req.body;
            student = student || json.grades[indexFound].student;
            subject = subject || json.grades[indexFound].subject;
            type = type || json.grades[indexFound].type;
            value = value || json.grades[indexFound].value;

            json.grades[indexFound] = { id: parseInt(id), student, subject, type, value, timestamp: new Date() };

            await writeFile(global.fileName, JSON.stringify(json), 'utf8');
            logger.info(`PUT /grades - ${JSON.stringify(json.grades[indexFound])}`);
            res.send({ success: json.grades[indexFound] });
        } catch (err) {
            logger.error(`PUT /grades - ${err.message}
            Request Body: ${JSON.stringify(req.body)}`);
            res.status(400).send({ error: err.message });
        }
    });

router
    .route('/:id')
    .get(async (req, res, next) => {
        try {
            if (!isNumber(parseInt(req.params.id))) next();
            else {
                let id = req.params.id;
                let allGrades = JSON.parse(await readFile(global.fileName)).grades;
                let gradeFound = allGrades.find((grade) => {
                    return grade.id === parseInt(id);
                });
                if (!gradeFound) throw new Error('Id não encontrado!');
                logger.info(`GET /grades - ${JSON.stringify(gradeFound)}`);
                res.send({ success: gradeFound });
            }
        } catch (err) {
            logger.error(`GET /grades - ${err.message}
        Request Body: ${JSON.stringify(req.body)}`);
            res.status(400).send({ error: err.message });
        }
    })
    .delete(async (req, res) => {
        try {
            let id = req.params.id;
            let json = JSON.parse(await readFile(global.fileName));
            let indexFound = json.grades.findIndex((grade) => {
                return grade.id === parseInt(id);
            });
            if (indexFound < 0) throw new Error('Id não encontrado!');
            json.grades.splice(indexFound, 1);
            await writeFile(global.fileName, JSON.stringify(json), 'utf8');
            logger.info(`DELETE /grades - ${JSON.stringify(id)}`);
            res.send({ success: `Id ${id} excluido com sucesso!` });
        } catch (err) {
            logger.error(`DELETE /grades - ${err.message}
        Request Body: ${JSON.stringify(req.body)}`);
            res.status(400).send({ error: err.message });
        }
    });

router.post('/sumGrades', async (req, res) => {
    try {
        let json = JSON.parse(await readFile(global.fileName));
        let { student, subject } = req.body;

        let filteredGrades = json.grades.filter((grade) => {
            return grade.student === student && grade.subject === subject;
        });

        let sumGrades = filteredGrades.reduce((total, curr) => {
            return total + curr.value;
        }, 0);
        logger.info(`GET /sumGrades - ${JSON.stringify(filteredGrades)}`);
        res.send({ success: sumGrades });
    } catch (err) {
        logger.error(`GET /sumGrades - ${err.message}
        Request Body: ${JSON.stringify(req.body)}`);
        res.status(400).send({ error: err.message });
    }
});

router.post('/averageGrades', async (req, res) => {
    try {
        let json = JSON.parse(await readFile(global.fileName));
        const { subject, type } = req.body;

        let filteredGrades = json.grades.filter((grade) => {
            return grade.subject === subject && grade.type === type;
        });

        let average =
            filteredGrades.reduce((total, curr) => {
                return total + curr.value;
            }, 0) / filteredGrades.length;
        logger.info(`GET /averageGrades - ${JSON.stringify(filteredGrades)}`);
        res.send({ success: average });
    } catch (err) {
        logger.error(`GET /averageGrades - ${err.message}
        Request Body: ${JSON.stringify(req.body)}`);
        res.status(400).send({ error: err.message });
    }
});

router.post('/topGrades', async (req, res) => {
    try {
        let json = JSON.parse(await readFile(global.fileName));
        const { subject, type } = req.body;
        let top3 = json.grades
            .filter((grade) => {
                return grade.subject === subject && grade.type === type;
            })
            .sort((a, b) => {
                return b.value - a.value;
            });
        logger.info(`GET /topGrades - ${JSON.stringify(top3.slice(0, 3))}`);
        res.send({ success: top3.slice(0, 3) });
    } catch (err) {
        logger.error(`GET /topGrades - ${err.message}
        Request Body: ${JSON.stringify(req.body)}`);
        res.status(400).send({ error: err.message });
    }
});

export default router;
