import express, { Request, Response} from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log('Servidor rodendo em http://localhost:${port}');
});

let users: { id: number, name: string }[] = [];

app.post('/users', (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('O nome é obrigatório');
    }

    const newItem = {
        id: users.length + 1,
        name
    };

    users.push(newItem);
    res.status(201).json(newItem);
});

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

app.get('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const item = users.find(i => i.id === parseInt(id));

    if (!item) {
        return res.status(404).send('Usuário não encontrado');
    }

    res.json(item);
});

app.put('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const itemIndex = users.findIndex(i => i.id === parseInt(id));

    if (itemIndex === -1) {
        return res.status(404).send('Usuário não encontrado');
    }

    if (!name) {
        return res.status(400).send('O nome é obrigatório');
    }

    users[itemIndex].name = name;
    res.json(users[itemIndex]);
});

app.delete('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const itemIndex = users.findIndex(i => i.id === parseInt(id));

    if (itemIndex === -1) {
        return res.status(404).send('Usuário não encontrado');
    }

    const deletedItem = users.splice(itemIndex, 1);
    res.json(deletedItem[0]);
});
