const express = require('express');
    const app = express();
    const PORT = 3000;
    const db = require('./models');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Sync database & start server
    db.sequelize.sync()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server berjalan di port ${PORT}`);
            });
        })
        .catch((err) => {
            console.log(err);
        });

    // CREATE - Tambah produk baru
    app.post("/produk", async(req, res) => {
        const data = req.body;
        try {
            const produk = await db.Produk.create(data);
            res.send(produk);
        } catch(err) {
            res.status(500).send(err);
        }
    });

    // READ - Ambil semua produk
    app.get("/produk", async(req, res) => {
        try {
            const produk = await db.Produk.findAll();
            res.send(produk);
        } catch(err) {
            res.status(500).send(err);
        }
    });

