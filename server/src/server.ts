import express from 'express';

const app = express();

app.get('/', (req: any, res: any) => {
  return res.json([
    { id: 1, name: 'Teste 1' },
    { id: 2, name: 'Teste 2' },
    { id: 3, name: 'Teste 3' },
  ]);
});

app.listen(3333);
